import { animate, spring } from "motion";

const display = document.getElementById("display");
const themeToggle = document.getElementById("theme-toggle");
const buttons = document.querySelectorAll(".button button");

// Calculator function
function calculate() {
  try {
    const expression = display.value
      .replaceAll("×", "*")
      .replaceAll("÷", "/");

    if (!expression.trim()) return;

    display.value = Function(
      `"use strict"; return (${expression})`
    )();

    if (!Number.isFinite(Number(display.value))) {
      display.value = "Error";
    }
  } catch {
    display.value = "Error";
  }
}

// Mouse input
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent.trim();

    if (value === "Boo") {
      display.value = "";
    } else if (value === "⌫") {
      display.value = display.value.slice(0, -1);
    } else if (value === "=") {
      calculate();
    } else {
      display.value += value;
    }
  });
});

// Keyboard input
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (/^[0-9.]$/.test(key)) {
    display.value += key;
  } else if (["+", "-", "*", "/", "%"].includes(key)) {
    display.value += key;
  } else if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    display.value = display.value.slice(0, -1);
  } else if (key === "Escape") {
    display.value = "";
  }
});

// Animated Dark Mode
themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");

  themeToggle.textContent = isDark
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";

 animate(
  themeToggle,
  {
    transform: [
      "scale(1) rotate(0deg)",
      "scale(0.85) rotate(-8deg)",
      "scale(1.1) rotate(8deg)",
      "scale(1) rotate(0deg)"
    ]
  },
  {
    duration: 0.5,
    ease: "easeInOut"
  }
);
});