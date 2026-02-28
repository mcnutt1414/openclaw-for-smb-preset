import { html, nothing } from "lit";
import type { TemplateResult } from "lit";
import type { WizardStep } from "../controllers/wizard.ts";

export type WizardStepSubmitFn = (stepId: string, value: unknown) => void;

// Track local state for multiselect toggles via a module-level map.
// Reset when the step changes (keyed by step id).
const multiselectState = new Map<string, Set<string>>();

function getMultiselectSet(step: WizardStep): Set<string> {
  if (!multiselectState.has(step.id)) {
    const initial = Array.isArray(step.initialValue) ? step.initialValue.map(String) : [];
    multiselectState.set(step.id, new Set(initial));
  }
  return multiselectState.get(step.id)!;
}

export function renderWizardStep(
  step: WizardStep,
  onSubmit: WizardStepSubmitFn,
  loading: boolean,
): TemplateResult {
  switch (step.type) {
    case "note":
      return renderNote(step, onSubmit, loading);
    case "select":
      return renderSelect(step, onSubmit, loading);
    case "text":
      return renderText(step, onSubmit, loading);
    case "confirm":
      return renderConfirm(step, onSubmit, loading);
    case "multiselect":
      return renderMultiselect(step, onSubmit, loading);
    case "progress":
    case "action":
      return renderProgress(step, onSubmit);
    default:
      return renderNote(step, onSubmit, loading);
  }
}

function renderNote(
  step: WizardStep,
  onSubmit: WizardStepSubmitFn,
  loading: boolean,
): TemplateResult {
  return html`
    <div class="wizard__step-content">
      ${step.title ? html`<h2 class="wizard__step-title">${step.title}</h2>` : nothing}
      ${step.message ? html`<p class="wizard__step-message">${step.message}</p>` : nothing}
      <div class="wizard__actions">
        <button
          class="btn btn--primary wizard__btn-next"
          ?disabled=${loading}
          @click=${() => onSubmit(step.id, true)}
        >Continue</button>
      </div>
    </div>
  `;
}

function renderSelect(
  step: WizardStep,
  onSubmit: WizardStepSubmitFn,
  loading: boolean,
): TemplateResult {
  const options = step.options ?? [];
  return html`
    <div class="wizard__step-content">
      ${step.message ? html`<h2 class="wizard__step-title">${step.message}</h2>` : nothing}
      <div class="wizard__options">
        ${options.map(
          (opt) => html`
            <button
              class="wizard__card"
              ?disabled=${loading}
              @click=${() => onSubmit(step.id, opt.value)}
            >
              <span class="wizard__card-label">${opt.label}</span>
              ${opt.hint ? html`<span class="wizard__card-hint">${opt.hint}</span>` : nothing}
            </button>
          `,
        )}
      </div>
    </div>
  `;
}

function renderText(
  step: WizardStep,
  onSubmit: WizardStepSubmitFn,
  loading: boolean,
): TemplateResult {
  const inputType = step.sensitive ? "password" : "text";
  const initialValue = typeof step.initialValue === "string" ? step.initialValue : "";

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector("input") as HTMLInputElement;
    onSubmit(step.id, input.value);
  };

  return html`
    <div class="wizard__step-content">
      ${step.message ? html`<h2 class="wizard__step-title">${step.message}</h2>` : nothing}
      <form class="wizard__text-form" @submit=${handleSubmit}>
        <input
          class="wizard__input"
          type=${inputType}
          .value=${initialValue}
          placeholder=${step.placeholder ?? ""}
          ?disabled=${loading}
          autofocus
        />
        <div class="wizard__actions">
          <button
            class="btn btn--primary wizard__btn-next"
            type="submit"
            ?disabled=${loading}
          >Continue</button>
        </div>
      </form>
    </div>
  `;
}

function renderConfirm(
  step: WizardStep,
  onSubmit: WizardStepSubmitFn,
  loading: boolean,
): TemplateResult {
  return html`
    <div class="wizard__step-content">
      ${step.message ? html`<h2 class="wizard__step-title">${step.message}</h2>` : nothing}
      <div class="wizard__actions wizard__actions--confirm">
        <button
          class="btn btn--primary wizard__btn-next"
          ?disabled=${loading}
          @click=${() => onSubmit(step.id, true)}
        >Yes</button>
        <button
          class="btn wizard__btn-secondary"
          ?disabled=${loading}
          @click=${() => onSubmit(step.id, false)}
        >No</button>
      </div>
    </div>
  `;
}

function renderMultiselect(
  step: WizardStep,
  onSubmit: WizardStepSubmitFn,
  loading: boolean,
): TemplateResult {
  const options = step.options ?? [];
  const selected = getMultiselectSet(step);

  const toggle = (val: string) => {
    if (selected.has(val)) {
      selected.delete(val);
    } else {
      selected.add(val);
    }
    // Force a re-render by dispatching a custom event on the container.
    // The parent Lit element will handle reactivity through its state updates.
    const container = document.querySelector(".wizard__options--multi");
    if (container) {
      container.dispatchEvent(new Event("change", { bubbles: true }));
    }
  };

  const handleConfirm = () => {
    const values = Array.from(selected);
    multiselectState.delete(step.id);
    onSubmit(step.id, values);
  };

  return html`
    <div class="wizard__step-content">
      ${step.message ? html`<h2 class="wizard__step-title">${step.message}</h2>` : nothing}
      <div class="wizard__options wizard__options--multi" @change=${() => {}}>
        ${options.map((opt) => {
          const val = String(opt.value);
          const isSelected = selected.has(val);
          return html`
            <button
              class="wizard__card ${isSelected ? "wizard__card--selected" : ""}"
              ?disabled=${loading}
              @click=${() => toggle(val)}
            >
              <span class="wizard__card-check">${isSelected ? "\u2713" : ""}</span>
              <span class="wizard__card-label">${opt.label}</span>
              ${opt.hint ? html`<span class="wizard__card-hint">${opt.hint}</span>` : nothing}
            </button>
          `;
        })}
      </div>
      <div class="wizard__actions">
        <button
          class="btn btn--primary wizard__btn-next"
          ?disabled=${loading}
          @click=${handleConfirm}
        >Continue</button>
      </div>
    </div>
  `;
}

function renderProgress(step: WizardStep, onSubmit: WizardStepSubmitFn): TemplateResult {
  // Auto-submit for progress/action steps after a brief delay.
  setTimeout(() => onSubmit(step.id, true), 300);

  return html`
    <div class="wizard__step-content wizard__step-content--progress">
      <div class="wizard__spinner"></div>
      ${step.message ? html`<p class="wizard__step-message">${step.message}</p>` : nothing}
    </div>
  `;
}
