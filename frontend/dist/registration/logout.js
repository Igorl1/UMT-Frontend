"use strict";
// logout.ts - Logout functionality
const LOGOUT_API_BASE_URL = "http://127.0.0.1:8000"; // Adjust for production
document.addEventListener("DOMContentLoaded", () => {
    const cancelBtn = document.getElementById("cancel-btn");
    const logoutBtn = document.getElementById("logout-btn");
    cancelBtn.addEventListener("click", () => {
        window.location.href = "/accounts/home/";
    });
    logoutBtn.addEventListener("click", async () => {
        try {
            const response = await fetch(`${LOGOUT_API_BASE_URL}/logout/`, {
                method: "POST",
                credentials: "include",
            });
            // Regardless, redirect to home
            window.location.href = "/accounts/home/";
        }
        catch (error) {
            window.location.href = "/accounts/home/";
        }
    });
});
