const themeItemKey = "data-theme";

function loadTheme() {
  const string = localStorage.getItem(themeItemKey) ?? "default";
  return string;
}
function writeTheme(theme: string) {
  localStorage.setItem(themeItemKey, theme);
}

export { loadTheme, writeTheme };
