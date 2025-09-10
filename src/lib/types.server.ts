import "server-only";

/**
 * Delays the execution for a specified number of seconds.
 * @param seconds Number of seconds to delay
 * @description Returns a promise that resolves after the specified number of seconds.
 */
export const delay = (seconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};
