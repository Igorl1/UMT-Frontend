"use strict";
// delete_media.ts - Delete media functionality
const DELETE_MEDIA_API_BASE_URL = window.location.hostname.includes("pythonanywhere.com")
    ? "https://igorl1.pythonanywhere.com/tracker"
    : "http://127.0.0.1:8000/tracker";
function getCsrfTokenDeleteMedia() {
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
    const cancelBtn = document.getElementById("cancel-btn");
    const deleteBtn = document.getElementById("delete-btn");
    const errorDiv = document.getElementById("error-message");
    const titleH1 = document.getElementById("delete-title");
    const pathParts = window.location.pathname.split("/");
    const id = pathParts[pathParts.length - 2]; // e.g., /tracker/delete/1/ -> '1'
    if (!id) {
        window.location.href = "/tracker/";
        return;
    }
    loadMedia(parseInt(id));
    cancelBtn.addEventListener("click", () => {
        window.location.href = "/tracker/";
    });
    deleteBtn.addEventListener("click", async () => {
        try {
            const token = getCsrfTokenDeleteMedia();
            const headers = {};
            if (token) {
                headers["X-CSRFToken"] = token;
            }
            const response = await fetch(`${DELETE_MEDIA_API_BASE_URL}/api/media/${id}/`, {
                method: "DELETE",
                headers,
                credentials: "include",
            });
            if (response.ok) {
                window.location.href = "/tracker/";
            }
            else {
                errorDiv.textContent = "Failed to delete";
                errorDiv.style.display = "block";
            }
        }
        catch (error) {
            errorDiv.textContent = "Network error";
            errorDiv.style.display = "block";
        }
    });
    async function loadMedia(id) {
        try {
            const response = await fetch(`${DELETE_MEDIA_API_BASE_URL}/api/media/${id}/`, {
                credentials: "include",
            });
            if (response.status === 401) {
                window.location.href = "/registration/login/";
                return;
            }
            const item = await response.json();
            if (response.ok) {
                titleH1.textContent = `Are you sure you want to delete "${item.title}"?`;
            }
            else {
                errorDiv.textContent = "Failed to load media";
                errorDiv.style.display = "block";
            }
        }
        catch (error) {
            errorDiv.textContent = "Network error";
            errorDiv.style.display = "block";
        }
    }
});
