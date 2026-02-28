import type {
  WizardStep,
  WizardSessionStatus,
  WizardNextResult,
} from "../../../../src/wizard/session.js";
import type { GatewayBrowserClient } from "../gateway.ts";

export type { WizardStep, WizardSessionStatus, WizardNextResult };

export type WizardHost = {
  client: GatewayBrowserClient | null;
  onboarding: boolean;
  wizardSessionId: string | null;
  wizardStep: WizardStep | null;
  wizardStatus: WizardSessionStatus | "idle";
  wizardError: string | null;
  wizardLoading: boolean;
  wizardStepIndex: number;
  wizardComplete: boolean;
};

type WizardStartResponse = {
  sessionId: string;
  done: boolean;
  step?: WizardStep;
  status: WizardSessionStatus;
  error?: string;
};

export async function startWizard(host: WizardHost): Promise<void> {
  if (!host.client) {
    host.wizardError = "Not connected to gateway";
    return;
  }
  host.wizardLoading = true;
  host.wizardError = null;
  try {
    const result = await host.client.request<WizardStartResponse>("wizard.start", {
      mode: "local",
    });
    host.wizardSessionId = result.sessionId;
    host.wizardStatus = result.status;
    if (result.done) {
      host.wizardStatus = "done";
      host.wizardStep = null;
    } else if (result.step) {
      host.wizardStep = result.step;
      host.wizardStepIndex = 0;
    }
  } catch (err) {
    host.wizardError = `Failed to start wizard: ${String(err)}`;
    host.wizardStatus = "error";
  } finally {
    host.wizardLoading = false;
  }
}

export async function submitWizardStep(
  host: WizardHost,
  stepId: string,
  value: unknown,
): Promise<void> {
  if (!host.client || !host.wizardSessionId) {
    return;
  }
  host.wizardLoading = true;
  host.wizardError = null;
  try {
    const result = await host.client.request<WizardNextResult>("wizard.next", {
      sessionId: host.wizardSessionId,
      answer: { stepId, value },
    });
    if (result.done) {
      host.wizardStatus = "done";
      host.wizardStep = null;
    } else if (result.step) {
      host.wizardStep = result.step;
      host.wizardStepIndex += 1;
    }
    if (result.error) {
      host.wizardError = result.error;
    }
  } catch (err) {
    host.wizardError = `Wizard step failed: ${String(err)}`;
  } finally {
    host.wizardLoading = false;
  }
}

export async function cancelWizard(host: WizardHost): Promise<void> {
  if (!host.client || !host.wizardSessionId) {
    return;
  }
  try {
    await host.client.request("wizard.cancel", {
      sessionId: host.wizardSessionId,
    });
  } catch {
    // Ignore cancel errors
  }
  host.wizardStatus = "cancelled";
  host.wizardStep = null;
  host.wizardSessionId = null;
}
