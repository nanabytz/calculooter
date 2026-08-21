const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const value = event.target.textContent.trim();

    if (value === "AC") {
      display.value = "";
    } else if (value === "\u232B") {
      display.value = display.value.slice(0, -1);
    } else if (value === "=") {
      try {
        const expression = display.value
          .replaceAll("\u00D7", "*")
          .replaceAll("\u00F7", "/");

        display.value = eval(expression);
      } catch {
        display.value = "Error";
      }
    } else {
      display.value += value;
    }
  });
});