// Set the initial theme based on localStorage or browser preference
const browserTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const theme = localStorage.getItem("theme") || browserTheme;
console.log("Current theme:", theme);
document.documentElement.setAttribute("data-theme", theme);
// Add event listener to the theme toggle button
const themeToggle = document.getElementById("theme-toggle");
themeToggle.innerHTML = theme === "dark" ? "<i class=\"bi bi-sun-fill\"></i>" : "<i class=\"bi bi-moon-stars-fill\"></i>";
const byuiLogo = document.getElementById("logo");
byuiLogo.src = theme === "dark" ? "img/byui-logo_white.png" : "img/byui-logo_blue.webp";
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  byuiLogo.src = newTheme === "dark" ? "img/byui-logo_white.png" : "img/byui-logo_blue.webp";
  byuiLogo.alt = newTheme === "dark" ? "BYU-Idaho Logo White" : "BYU-Idaho Logo Blue";
  themeToggle.innerHTML = newTheme === "dark" ? "<i class=\"bi bi-sun-fill\"></i>" : "<i class=\"bi bi-moon-stars-fill\"></i>";
}
);