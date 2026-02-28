import { html, nothing } from "lit";
import type { TemplateResult } from "lit";

export type WizardLandingProps = {
  connected: boolean;
  error: string | null;
  onStart: () => void;
};

export function renderWizardLanding(props: WizardLandingProps): TemplateResult {
  return html`
    <div class="wizard">
      <div class="wizard__landing">
        <div class="wizard__landing-brand">
          <h1 class="wizard__landing-title">Clark</h1>
          <p class="wizard__landing-tagline">Your AI Business Assistant</p>
        </div>

        <div class="wizard__landing-features">
          <div class="wizard__landing-feature">
            <span class="wizard__landing-feature-icon">&#9679;</span>
            <span>Manages customer communications across all your channels</span>
          </div>
          <div class="wizard__landing-feature">
            <span class="wizard__landing-feature-icon">&#9679;</span>
            <span>Handles scheduling, invoices, and follow-ups automatically</span>
          </div>
          <div class="wizard__landing-feature">
            <span class="wizard__landing-feature-icon">&#9679;</span>
            <span>Learns your business voice and keeps everything on-brand</span>
          </div>
        </div>

        ${props.error ? html`<div class="wizard__error">${props.error}</div>` : nothing}

        <button
          class="btn btn--primary wizard__btn-start"
          ?disabled=${!props.connected}
          @click=${props.onStart}
        >
          ${props.connected ? "Get Started" : "Connecting..."}
        </button>

        ${
          !props.connected
            ? html`
                <p class="wizard__landing-status">Connecting to your gateway...</p>
              `
            : nothing
        }
      </div>
    </div>
  `;
}
