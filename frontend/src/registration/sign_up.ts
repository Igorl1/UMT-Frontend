// sign_up.ts - Sign up functionality
const SIGN_UP_API_BASE_URL = window.location.hostname.includes(
  "pythonanywhere.com"
)
  ? "https://igorl1.pythonanywhere.com"
  : "http://127.0.0.1:8000";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form") as HTMLFormElement;
  const errorDiv = document.getElementById("error-message") as HTMLDivElement;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = (document.getElementById("username") as HTMLInputElement)
      .value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password1 = (document.getElementById("password1") as HTMLInputElement)
      .value;
    const password2 = (document.getElementById("password2") as HTMLInputElement)
      .value;

    if (password1 !== password2) {
      errorDiv.textContent = "Passwords do not match";
      errorDiv.style.display = "block";
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password1", password1);
    formData.append("password2", password2);

    try {
      const response = await fetch(`${SIGN_UP_API_BASE_URL}/registration/`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        // Registration successful, redirect to login
        window.location.href = "/registration/login/";
      } else {
        errorDiv.textContent =
          JSON.stringify(data.error) || "Registration failed";
        errorDiv.style.display = "block";
      }
    } catch (error) {
      errorDiv.textContent = "Network error";
      errorDiv.style.display = "block";
    }
  });
});
