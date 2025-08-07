
const themeItemKey = "data-theme";
/**
 * @deprecated
 * @returns The current theme from localStorage, or "default" if not set
 */
export function loadThemeFromLocalStorage() {
  const string = localStorage.getItem(themeItemKey) ?? "default";
  return string;
}

/**
 * @deprecated
 * @param theme The theme to set in localStorage
 */
export function writeThemeToLocalStorage(theme: string) {
  localStorage.setItem(themeItemKey, theme);
}


/**
 * Load the theme from cookies, falling back to "default" if not set.
 * @returns The current theme from cookies or "default"
 */
export function loadThemeFromCookies(): string {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === themeItemKey) {
      return decodeURIComponent(value);
    }
  }
  return "default";
}

/**
 * Write the theme to cookies with a 1-year expiration.
 * @param theme The theme to set in cookies
 */
export function writeThemeFromCookies(theme: string): void {
  document.cookie = `${themeItemKey}=${encodeURIComponent(theme)}; path=/; max-age=${365 * 24 * 60 * 60}`; // 1 year
}