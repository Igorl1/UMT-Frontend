// login.ts - Login functionality
const LOGIN_API_BASE_URL = window.location.hostname.includes(
  "pythonanywhere.com"
)
  ? "https://igorl1.pythonanywhere.com"
  : "http://127.0.0.1:8000";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form") as HTMLFormElement;
  const errorDiv = document.getElementById("error-message") as HTMLDivElement;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = (document.getElementById("username") as HTMLInputElement)
      .value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    try {
      const response = await fetch(`${LOGIN_API_BASE_URL}/api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for session
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Login successful, redirect to tracker
        window.location.href = "/tracker/";
      } else {
        errorDiv.textContent = data.detail || "Login failed";
        errorDiv.style.display = "block";
      }
    } catch (error) {
      errorDiv.textContent = "Network error";
      errorDiv.style.display = "block";
    }
  });
});
