"use strict";
// login.ts - Login functionality
const LOGIN_API_BASE_URL = "http://127.0.0.1:8000"; // Adjust for production
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const errorDiv = document.getElementById("error-message");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = document.getElementById("username")
            .value;
        const password = document.getElementById("password")
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
            }
            else {
                errorDiv.textContent = data.detail || "Login failed";
                errorDiv.style.display = "block";
            }
        }
        catch (error) {
            errorDiv.textContent = "Network error";
            errorDiv.style.display = "block";
        }
    });
});
