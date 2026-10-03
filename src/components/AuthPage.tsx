import { useEffect, useRef, useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import authPrintingBackground from '../assets/auth/auth-printing-background.png';
import './AuthPage.css';

type Mode = 'signIn' | 'signUp';
type Errors = Record<string, string>;

export function AuthPage({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mode, setMode] = useState<Mode>('signIn');
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState('alan-auth--to-signup');
  const transitionTimers = useRef<number[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => () => transitionTimers.current.forEach(window.clearTimeout), []);

  if (!isOpen) return null;
  const changeMode = (next: Mode) => {
    if (next === mode || isTransitioning) return;
    setIsTransitioning(true);
    setIsEntering(false);
    setTransitionDirection(next === 'signUp' ? 'alan-auth--to-signup' : 'alan-auth--to-signin');
    setErrors({});
    setMessage('');
    transitionTimers.current = [
      window.setTimeout(() => { setMode(next); setIsEntering(true); }, 190),
      window.setTimeout(() => { setIsTransitioning(false); setIsEntering(false); transitionTimers.current = []; }, 780),
    ];
  };
  const errorFor = (name: string) => errors[name] ? 'alan-auth__bad' : '';

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get('email') ?? '').trim();
    const password = String(data.get('password') ?? '');
    const next: Errors = {};
    if (!email) next.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Enter a valid email address.';
    if (!password) next.password = 'Password is required.';
    if (mode === 'signUp') {
      const fullName = String(data.get('fullName') ?? '').trim();
      const phone = String(data.get('phone') ?? '').trim();
      const confirm = String(data.get('confirmPassword') ?? '');
      if (!fullName) next.fullName = 'Full name is required.';
      if (!phone) next.phone = 'Phone is required.';
      if (password.length < 8) next.password = 'Use at least 8 characters.';
      if (!confirm) next.confirmPassword = 'Please confirm your password.';
      else if (confirm !== password) next.confirmPassword = 'Passwords do not match.';
    }
    setErrors(next); setMessage('');
    if (Object.keys(next).length) return;
    setBusy(true);
    try {
      if (mode === 'signIn') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) { setIsSuccess(false); setMessage(error.message); } else onClose();
        return;
      }
      const fullName = String(data.get('fullName')).trim();
      const phone = String(data.get('phone')).trim();
      const { data: result, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName, phone } } });
      if (error) { setIsSuccess(false); setMessage(error.message); return; }
      if (result.session && result.user) {
        const { error: profileError } = await supabase.from('profiles').upsert({ id: result.user.id, full_name: fullName, phone });
        if (profileError) { setIsSuccess(false); setMessage('Your account was created, but we could not save your profile details.'); return; }
        onClose();
      } else { setIsSuccess(true); setMessage('Check your inbox to verify your email, then return to sign in.'); }
    } catch {
      setIsSuccess(false);
      setMessage('We could not complete that request. Please check your connection and try again.');
    } finally { setBusy(false); }
  };

  return createPortal(<div className={`alan-auth${mode === 'signUp' ? ' alan-auth--signup' : ''}${isTransitioning ? ` alan-auth--transition ${transitionDirection}${isEntering ? ' alan-auth--entering' : ''}` : ''}`} role="dialog" aria-modal="true" aria-labelledby="alan-auth-title">
    <button className="alan-auth__close" type="button" onClick={onClose} aria-label="Return to website"><X /></button>
    <section className="alan-auth__shell">
      <div className="alan-auth__canvas" aria-hidden="true"><img className="alan-auth__background" src={authPrintingBackground} alt="" /><div className="alan-auth__overlay" /><div className="alan-auth__light" /><div className="alan-auth__brand"><strong>ALAN</strong>Advertisement & Printing</div><div className="alan-auth__copy alan-auth__copy--in"><p>Make a lasting impression</p><h1 id="alan-auth-title">Welcome<br />back.</h1><span>Your next great print starts here.</span></div><div className="alan-auth__copy alan-auth__copy--up"><p>Bring your ideas to life</p><h1>Join<br />ALAN.</h1><span>Create, print, and make every detail count.</span></div></div>
      <div className="alan-auth__panel"><form key={mode} className={`alan-auth__form${isTransitioning ? isEntering ? ' alan-auth__form--entering' : ' alan-auth__form--leaving' : ''}`} onSubmit={submit} noValidate><p className="alan-auth__eyebrow">{mode === 'signIn' ? 'Welcome back' : 'Start something brilliant'}</p><h2>{mode === 'signIn' ? 'Sign in to ALAN' : 'Create your account'}</h2><p className="alan-auth__intro">{mode === 'signIn' ? 'Access your printing projects in one place.' : 'Save details and keep every print project close.'}</p>
        {mode === 'signUp' && <><label className="alan-auth__field"><span>Full name</span><input className={errorFor('fullName')} name="fullName" autoComplete="name" />{errors.fullName && <p className="alan-auth__error">{errors.fullName}</p>}</label><label className="alan-auth__field"><span>Phone</span><input className={errorFor('phone')} name="phone" type="tel" autoComplete="tel" />{errors.phone && <p className="alan-auth__error">{errors.phone}</p>}</label></>}
        <label className="alan-auth__field"><span>Email</span><input className={errorFor('email')} name="email" type="email" autoComplete="email" />{errors.email && <p className="alan-auth__error">{errors.email}</p>}</label><label className="alan-auth__field"><span>Password</span><input className={errorFor('password')} name="password" type="password" autoComplete={mode === 'signIn' ? 'current-password' : 'new-password'} />{errors.password && <p className="alan-auth__error">{errors.password}</p>}</label>
        {mode === 'signUp' && <label className="alan-auth__field"><span>Confirm password</span><input className={errorFor('confirmPassword')} name="confirmPassword" type="password" autoComplete="new-password" />{errors.confirmPassword && <p className="alan-auth__error">{errors.confirmPassword}</p>}</label>}
        {mode === 'signIn' && <button className="alan-auth__forgot" type="button">Forgot password?</button>}{message && <p className={`alan-auth__message ${isSuccess ? 'alan-auth__message--success' : 'alan-auth__message--error'}`} role="status">{message}</p>}<button className="alan-auth__submit" disabled={busy}>{busy ? 'Please wait' : mode === 'signIn' ? 'Sign in' : 'Create account'}</button><p className="alan-auth__switch">{mode === 'signIn' ? 'New to ALAN?' : 'Already have an account?'} <button type="button" onClick={() => changeMode(mode === 'signIn' ? 'signUp' : 'signIn')}>{mode === 'signIn' ? 'Create one' : 'Sign in'}</button></p>
      </form></div>
    </section>
  </div>, document.body);
}
