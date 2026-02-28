import { html } from "lit";
import type { TemplateResult } from "lit";

export type WizardCompleteProps = {
  onComplete: () => void;
};

export function renderWizardComplete(props: WizardCompleteProps): TemplateResult {
  // Auto-transition after 2 seconds.
  setTimeout(() => props.onComplete(), 2000);

  return html`
    <div class="wizard">
      <div class="wizard__complete">
        <div class="wizard__complete-icon">&#10003;</div>
        <h2 class="wizard__complete-title">All set!</h2>
        <p class="wizard__complete-message">Clark is ready to help run your business.</p>
        <button
          class="btn btn--primary wizard__btn-next"
          @click=${props.onComplete}
        >Go to Dashboard</button>
      </div>
    </div>
  `;
}
