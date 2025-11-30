"use strict";
// reset_password.ts - Reset password functionality
const RESET_PASSWORD_API_BASE_URL = "http://127.0.0.1:8000"; // Adjust for production
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("reset-password-form");
    const errorDiv = document.getElementById("error-message");
    const successDiv = document.getElementById("success-message");
    // Get token from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (!token) {
        errorDiv.textContent = "Invalid reset link. No token provided.";
        errorDiv.style.display = "block";
        form.style.display = "none";
        return;
    }
    form.addEventListener("submit", async (e) => {
        var _a;
        e.preventDefault();
        const password = document.getElementById("password")
            .value;
        const confirmPassword = document.getElementById("confirm-password").value;
        if (password !== confirmPassword) {
            errorDiv.textContent = "Passwords do not match.";
            errorDiv.style.display = "block";
            successDiv.style.display = "none";
            return;
        }
        try {
            const formData = new FormData();
            formData.append("token", token);
            formData.append("password", password);
            const response = await fetch(`${RESET_PASSWORD_API_BASE_URL}/api/password_reset/confirm/`, {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                successDiv.textContent =
                    "Password reset successfully! You can now log in with your new password.";
                successDiv.style.display = "block";
                errorDiv.style.display = "none";
                form.style.display = "none";
            }
            else {
                const data = await response.json();
                const errorMsg = data.detail || ((_a = data.password) === null || _a === void 0 ? void 0 : _a[0]) || "Failed to reset password";
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
