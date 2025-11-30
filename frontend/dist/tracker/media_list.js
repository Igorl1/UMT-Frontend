"use strict";
// media_list.ts - Media list functionality
const MEDIA_LIST_API_BASE_URL = "http://127.0.0.1:8000/tracker"; // Adjust for production
function getCsrfTokenMediaList() {
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
    const tbody = document.getElementById("media-tbody");
    const errorDiv = document.getElementById("error-message");
    const addBtn = document.getElementById("add-media-btn");
    addBtn.addEventListener("click", () => {
        window.location.href = "/tracker/add/";
    });
    loadMedia();
    async function loadMedia() {
        try {
            const response = await fetch(`${MEDIA_LIST_API_BASE_URL}/api/media/`, {
                credentials: "include",
            });
            if (response.status === 401) {
                window.location.href = "/registration/login/";
                return;
            }
            const data = await response.json();
            if (response.ok) {
                renderMedia(data);
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
    function renderMedia(media) {
        tbody.innerHTML = "";
        if (media.length === 0) {
            const row = tbody.insertRow();
            row.innerHTML =
                '<td colspan="6" style="text-align: center;">No entries found. <a href="/tracker/add/">Add Media</a></td>';
            return;
        }
        media.forEach((item) => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${item.title}</td>
                <td>${item.status || "No status"}</td>
                <td>${item.rating ? item.rating : "No rating"}</td>
                <td>${item.type || "No type"}</td>
                <td>${item.description || "No description"}</td>
                <td>
                    <button onclick="editMedia(${item.id})">Edit</button>
                    <button onclick="deleteMedia(${item.id})">Delete</button>
                </td>
            `;
        });
    }
    window.editMedia = (id) => {
        window.location.href = `/tracker/edit/${id}/`;
    };
    window.deleteMedia = async (id) => {
        if (confirm("Are you sure you want to delete this item?")) {
            try {
                const token = getCsrfTokenMediaList();
                const headers = {};
                if (token) {
                    headers["X-CSRFToken"] = token;
                }
                const response = await fetch(`${MEDIA_LIST_API_BASE_URL}/api/media/${id}/`, {
                    method: "DELETE",
                    headers,
                    credentials: "include",
                });
                if (response.ok) {
                    loadMedia();
                }
                else {
                    alert("Failed to delete");
                }
            }
            catch (error) {
                alert("Network error");
            }
        }
    };
});
