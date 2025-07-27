
const themeItemKey = "data-theme";

export function loadThemeFromLocalStorage() {
  const string = localStorage.getItem(themeItemKey) ?? "default";
  return string;
}

export function writeThemeToLocalStorage(theme: string) {
  localStorage.setItem(themeItemKey, theme);
}

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

export function writeThemeFromCookies(theme: string): void {
  document.cookie = `${themeItemKey}=${encodeURIComponent(theme)}; path=/; max-age=31536000`; // 1 year
}