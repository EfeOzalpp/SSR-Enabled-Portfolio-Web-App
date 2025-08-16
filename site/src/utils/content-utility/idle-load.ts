// src/utils/content-utility/idle-preload.ts
type Cancel = () => void;

const hasWindow = typeof window !== 'undefined';
const hasRIC = hasWindow && 'requestIdleCallback' in (window as any);
const hasCIC = hasWindow && 'cancelIdleCallback' in (window as any);

const ric = (cb: Function, opts?: { timeout?: number }) =>
  hasRIC ? (window as any).requestIdleCallback(cb as any, opts) : setTimeout(cb as any, opts?.timeout ?? 0);
const cic = (id: any) =>
  hasCIC ? (window as any).cancelIdleCallback(id) : clearTimeout(id);

/**
 * Preload a module at idle (once). Returns a cancel function.
 */
export function idlePreload<T>(importer: () => Promise<T>, opts?: { delayMs?: number; timeoutMs?: number }): Cancel {
  if (!hasWindow) return () => {};
  let cancelled = false;
  let timer: any = null;
  let idleToken: any = null;

  const schedule = () => {
    if (cancelled) return;
    idleToken = ric(async () => {
      if (cancelled) return;
      try { await importer(); } catch { /* swallow */ }
    }, { timeout: opts?.timeoutMs ?? 2500 });
  };

  if (opts?.delayMs && opts.delayMs > 0) {
    timer = setTimeout(schedule, opts.delayMs);
  } else {
    schedule();
  }

  return () => {
    cancelled = true;
    if (timer) clearTimeout(timer);
    if (idleToken) cic(idleToken);
  };
}
