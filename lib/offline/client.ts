import type { OfflineState } from "./status";

export async function getServiceWorker() {
  if (!("serviceWorker" in navigator)) throw new Error("Offline access is not supported by this browser.");
  const registration = await navigator.serviceWorker.ready;
  return navigator.serviceWorker.controller ?? registration.active;
}

export async function sendOfflineMessage<T = { type: string; state?: OfflineState }>(
  message: { type: string }
): Promise<T> {
  const worker = await getServiceWorker();
  if (!worker) throw new Error("The offline service is not ready. Reload the app and try again.");
  return new Promise<T>((resolve, reject) => {
    const channel = new MessageChannel();
    const timeout = window.setTimeout(() => reject(new Error("The offline service did not respond.")), 30_000);
    channel.port1.onmessage = (event) => {
      window.clearTimeout(timeout);
      resolve(event.data as T);
    };
    worker.postMessage(message, [channel.port2]);
  });
}

export function formatBytes(value?: number | null) {
  if (!value || value < 1) return "Unknown";
  const units = ["B", "KB", "MB", "GB"];
  const exponent = Math.min(Math.floor(Math.log(value) / Math.log(1024)), units.length - 1);
  return `${(value / 1024 ** exponent).toFixed(exponent > 1 ? 1 : 0)} ${units[exponent]}`;
}
