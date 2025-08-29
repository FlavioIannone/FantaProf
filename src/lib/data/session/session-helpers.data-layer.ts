import { redirect } from "next/navigation";
import { verifySession } from "./session-manager.data-layer";

/**
 * Verifies the session and then returns the function
 *
 *
 * Example:
 *   const securedFn = withSession(async (uid, arg1, arg2) => { ... });
 *   await securedFn(arg1, arg2);
 */
export function withSession<TArgs extends any[], TResult>(
  fn: (uid: string, ...args: TArgs) => Promise<TResult>
) {
  return async (...args: TArgs): Promise<TResult> => {
    const res = await verifySession();

    if (!res.successful) {
      redirect("/auth/login?reason=session-expired");
    }

    return fn(res.session.uid, ...args);
  };
}
