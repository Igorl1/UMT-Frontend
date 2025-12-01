"use strict";
// add_media.ts - Add media functionality
const ADD_MEDIA_API_BASE_URL = window.location.hostname.includes("pythonanywhere.com")
    ? "https://igorl1.pythonanywhere.com/tracker"
    : "http://127.0.0.1:8000/tracker";
function getCsrfTokenAddMedia() {
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
    const form = document.getElementById("add-media-form");
    const errorDiv = document.getElementById("error-message");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const status = document.getElementById("status")
            .value;
        const rating = document.getElementById("rating")
            .value;
        const type = document.getElementById("type").value;
        const description = document.getElementById("description").value;
        const data = {
            title,
            status: status || null,
            rating: rating ? parseInt(rating) : null,
            type: type || null,
            description: description || null,
        };
        try {
            const token = getCsrfTokenAddMedia();
            const headers = {
                "Content-Type": "application/json",
            };
            if (token) {
                headers["X-CSRFToken"] = token;
            }
            const response = await fetch(`${ADD_MEDIA_API_BASE_URL}/api/media/`, {
                method: "POST",
                headers,
                credentials: "include",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                window.location.href = "/tracker/";
            }
            else {
                const err = await response.json();
                errorDiv.textContent = err.detail || "Failed to add media";
                errorDiv.style.display = "block";
            }
        }
        catch (error) {
            errorDiv.textContent = "Network error";
            errorDiv.style.display = "block";
        }
    });
});
