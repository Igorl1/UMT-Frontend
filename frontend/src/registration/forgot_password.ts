// forgot_password.ts - Forgot password functionality
const FORGOT_PASSWORD_API_BASE_URL = "http://127.0.0.1:8000"; // Adjust for production

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById(
    "forgot-password-form"
  ) as HTMLFormElement;
  const errorDiv = document.getElementById("error-message") as HTMLDivElement;
  const successDiv = document.getElementById(
    "success-message"
  ) as HTMLDivElement;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = (document.getElementById("email") as HTMLInputElement).value;

    try {
      const formData = new FormData();
      formData.append("email", email);
      const response = await fetch(
        `${FORGOT_PASSWORD_API_BASE_URL}/api/password_reset/`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        successDiv.textContent = "Password reset email sent (check console)";
        successDiv.style.display = "block";
        errorDiv.style.display = "none";
      } else {
        const data = await response.json();
        const errorMsg =
          data.detail || data.email?.[0] || "Failed to send reset email";
        errorDiv.textContent = errorMsg;
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
