"use strict";
// forgot_password.ts - Forgot password functionality
const FORGOT_PASSWORD_API_BASE_URL = window.location.hostname.includes("pythonanywhere.com")
    ? "https://igorl1.pythonanywhere.com"
    : "http://127.0.0.1:8000";
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("forgot-password-form");
    const errorDiv = document.getElementById("error-message");
    const successDiv = document.getElementById("success-message");
    form.addEventListener("submit", async (e) => {
        var _a;
        e.preventDefault();
        const email = document.getElementById("email").value;
        try {
            const formData = new FormData();
            formData.append("email", email);
            const response = await fetch(`${FORGOT_PASSWORD_API_BASE_URL}/api/password_reset/`, {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                successDiv.textContent = "Password reset email sent (check console)";
                successDiv.style.display = "block";
                errorDiv.style.display = "none";
            }
            else {
                const data = await response.json();
                const errorMsg = data.detail || ((_a = data.email) === null || _a === void 0 ? void 0 : _a[0]) || "Failed to send reset email";
                errorDiv.textContent = errorMsg;
                errorDiv.style.display = "block";
                successDiv.style.display = "none";
            }
        }
        catch (error) {
            errorDiv.textContent = "Network error";
            errorDiv.style.display = "block";
            successDiv.style.display = "none";
        }
    });
});
