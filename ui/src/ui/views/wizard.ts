import { html, nothing } from "lit";
import type { TemplateResult } from "lit";
import type { WizardStep } from "../controllers/wizard.ts";
import { renderWizardStep } from "./wizard-steps.ts";

const ESTIMATED_TOTAL_STEPS = 15;

export type WizardViewProps = {
  step: WizardStep | null;
  status: string;
  error: string | null;
  loading: boolean;
  stepIndex: number;
  connected: boolean;
  onSubmit: (stepId: string, value: unknown) => void;
  onCancel: () => void;
};

export function renderWizard(props: WizardViewProps): TemplateResult {
  const progressPercent = Math.min(
    100,
    Math.round(((props.stepIndex + 1) / ESTIMATED_TOTAL_STEPS) * 100),
  );

  return html`
    <div class="wizard">
      <div class="wizard__container">
        <div class="wizard__header">
          <div class="wizard__brand">
            <span class="wizard__brand-name">Clark</span>
            <span class="wizard__brand-sub">Setup</span>
          </div>
          <div class="wizard__progress">
            <div class="wizard__progress-bar">
              <div
                class="wizard__progress-fill"
                style="width: ${progressPercent}%"
              ></div>
            </div>
            <span class="wizard__progress-label">Step ${props.stepIndex + 1}</span>
          </div>
        </div>

        <div class="wizard__body">
          ${props.error ? html`<div class="wizard__error">${props.error}</div>` : nothing}

          ${
            props.step
              ? renderWizardStep(props.step, props.onSubmit, props.loading)
              : props.loading
                ? html`
                    <div class="wizard__step-content wizard__step-content--progress">
                      <div class="wizard__spinner"></div>
                      <p class="wizard__step-message">Loading...</p>
                    </div>
                  `
                : nothing
          }
        </div>

        ${
          props.loading
            ? html`
                <div class="wizard__loading-overlay"></div>
              `
            : nothing
        }
      </div>
    </div>
  `;
}
