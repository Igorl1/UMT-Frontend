// change_password.ts - Change password functionality
const CHANGE_PASSWORD_API_BASE_URL = window.location.hostname.includes(
  "pythonanywhere.com"
)
  ? "https://igorl1.pythonanywhere.com"
  : "http://127.0.0.1:8000";

function getCsrfTokenChangePassword() {
  const name = "csrftoken";
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById(
    "change-password-form"
  ) as HTMLFormElement;
  const errorDiv = document.getElementById("error-message") as HTMLDivElement;
  const successDiv = document.getElementById(
    "success-message"
  ) as HTMLDivElement;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const oldPassword = (
      document.getElementById("old_password") as HTMLInputElement
    ).value;
    const newPassword = (
      document.getElementById("new_password") as HTMLInputElement
    ).value;
    const confirmNewPassword = (
      document.getElementById("confirm_new_password") as HTMLInputElement
    ).value;

    if (newPassword !== confirmNewPassword) {
      errorDiv.textContent = "New passwords do not match";
      errorDiv.style.display = "block";
      successDiv.style.display = "none";
      return;
    }

    try {
      const token = getCsrfTokenChangePassword();
      const headers: any = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["X-CSRFToken"] = token;
      }
      const response = await fetch(
        `${CHANGE_PASSWORD_API_BASE_URL}/api/change_password/`,
        {
          method: "POST",
          headers,
          credentials: "include",
          body: JSON.stringify({
            old_password: oldPassword,
            new_password: newPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        successDiv.textContent = data.detail;
        successDiv.style.display = "block";
        errorDiv.style.display = "none";
        form.reset();
      } else {
        errorDiv.textContent = data.detail || "Failed to change password";
        errorDiv.style.display = "block";
        successDiv.style.display = "none";
      }
    } catch (error) {
      errorDiv.textContent = "Network error";
      errorDiv.style.display = "block";
      successDiv.style.display = "none";
    }
  });
});
