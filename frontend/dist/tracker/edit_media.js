"use strict";
// edit_media.ts - Edit media functionality
const EDIT_MEDIA_API_BASE_URL = window.location.hostname.includes("pythonanywhere.com")
    ? "https://igorl1.pythonanywhere.com/tracker"
    : "http://127.0.0.1:8000/tracker";
function getCsrfTokenEditMedia() {
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
    const form = document.getElementById("edit-media-form");
    const errorDiv = document.getElementById("error-message");
    const titleH1 = document.getElementById("edit-title");
    const pathParts = window.location.pathname.split("/");
    const id = pathParts[pathParts.length - 2]; // e.g., /tracker/edit/1/ -> '1'
    if (!id) {
        window.location.href = "/tracker/";
        return;
    }
    loadMedia(parseInt(id));
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
            const token = getCsrfTokenEditMedia();
            const headers = {
                "Content-Type": "application/json",
            };
            if (token) {
                headers["X-CSRFToken"] = token;
            }
            const response = await fetch(`${EDIT_MEDIA_API_BASE_URL}/api/media/${id}/`, {
                method: "PUT",
                headers,
                credentials: "include",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                window.location.href = "/tracker/";
            }
            else {
                const err = await response.json();
                errorDiv.textContent = err.detail || "Failed to update media";
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
            const response = await fetch(`${EDIT_MEDIA_API_BASE_URL}/api/media/${id}/`, {
                credentials: "include",
            });
            if (response.status === 401) {
                window.location.href = "/registration/login/";
                return;
            }
            const item = await response.json();
            if (response.ok) {
                document.getElementById("title").value =
                    item.title;
                document.getElementById("status").value =
                    item.status || "";
                document.getElementById("rating").value =
                    item.rating ? item.rating.toString() : "";
                document.getElementById("type").value =
                    item.type || "";
                document.getElementById("description").value =
                    item.description || "";
                titleH1.textContent = `Editing "${item.title}"`;
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
