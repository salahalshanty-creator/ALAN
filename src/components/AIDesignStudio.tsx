import React from 'react';
import {
  ArrowRight,
  Image as ImageIcon,
  LayoutTemplate,
  Palette,
  Sparkles,
  Type,
  WandSparkles,
} from 'lucide-react';

const TOOLS = [
  { label: 'Templates', icon: LayoutTemplate },
  { label: 'Text', icon: Type },
  { label: 'Images', icon: ImageIcon },
  { label: 'Colors', icon: Palette },
  { label: 'AI Magic', icon: WandSparkles, featured: true },
] as const;

export const AIDesignStudio: React.FC = () => {
  return (
    <section id="ai-design" className="ai-studio" aria-labelledby="ai-studio-title">
      <div className="ai-studio__ambient" aria-hidden="true" />
      <div className="ai-studio__inner">
        <div className="ai-studio__copy">
          <div className="ai-studio__eyebrow">
            <span className="ai-studio__spark"><Sparkles aria-hidden="true" /></span>
            AI Design Studio
            <span className="ai-studio__coming">Preview</span>
          </div>

          <h2 id="ai-studio-title" className="ai-studio__title">
            From Idea<br />
            <span>to Print in Seconds</span>
          </h2>
          <p className="ai-studio__description">
            Turn your ideas into stunning print-ready designs with the power of AI.
          </p>

          <div className="ai-studio__actions">
            <a className="ai-studio__primary" href="#ai-studio-preview">
              Start Designing <ArrowRight aria-hidden="true" />
            </a>
            <a className="ai-studio__secondary" href="#ai-studio-preview">See How It Works</a>
          </div>

          <p className="ai-studio__note">
            <span aria-hidden="true" /> AI-assisted design tools are coming soon.
          </p>
        </div>

        <div id="ai-studio-preview" className="ai-studio__workspace-wrap" tabIndex={-1}>
          <div className="ai-studio__workspace" aria-label="Preview of the future AI design workspace">
            <div className="ai-studio__workspace-bar">
              <div className="ai-studio__brand-mark" aria-hidden="true">A</div>
              <div>
                <p>Untitled print design</p>
                <span>Business card · 90 × 50 mm</span>
              </div>
              <span className="ai-studio__status"><i /> Print ready</span>
            </div>

            <div className="ai-studio__editor">
              <nav className="ai-studio__toolbar" aria-label="Design tools preview">
                {TOOLS.map(({ label, icon: Icon }) => (
                  <button className={label === 'AI Magic' ? 'is-featured' : ''} type="button" key={label} tabIndex={-1} aria-hidden="true">
                    <Icon />
                    <span>{label}</span>
                  </button>
                ))}
              </nav>

              <div className="ai-studio__stage">
                <div className="ai-studio__stage-meta">
                  <span>Front</span>
                  <span>100%</span>
                </div>
                <div className="ai-studio__canvas" aria-hidden="true">
                  <span className="ai-studio__canvas-label">Your design</span>
                  <div className="ai-studio__canvas-lines"><i /><i /><i /></div>
                  <div className="ai-studio__registration"><i /><i /><i /><i /></div>
                </div>
                <div className="ai-studio__templates" aria-hidden="true">
                  {[0, 1, 2, 3].map((item) => <span key={item}><i /></span>)}
                  <span className="ai-studio__add-template">+</span>
                </div>
              </div>

              <aside className="ai-studio__prompt" aria-label="AI prompt preview">
                <div className="ai-studio__prompt-title"><WandSparkles aria-hidden="true" /> AI Magic</div>
                <p>Describe your design</p>
                <div className="ai-studio__prompt-field">A refined, modern identity for…</div>
                <div className="ai-studio__chips"><span>Minimal</span><span>Premium</span></div>
                <button type="button" disabled>Generate <ArrowRight aria-hidden="true" /></button>
                <small>Preview interface · Generation is not active</small>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
