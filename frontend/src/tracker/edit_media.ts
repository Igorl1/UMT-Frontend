// edit_media.ts - Edit media functionality
const EDIT_MEDIA_API_BASE_URL = "http://127.0.0.1:8000/tracker"; // Adjust for production

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

interface MediaItem {
  id: number;
  title: string;
  status: string | null;
  rating: number | null;
  type: string | null;
  description: string | null;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("edit-media-form") as HTMLFormElement;
  const errorDiv = document.getElementById("error-message") as HTMLDivElement;
  const titleH1 = document.getElementById("edit-title") as HTMLHeadingElement;

  const pathParts = window.location.pathname.split("/");
  const id = pathParts[pathParts.length - 2]; // e.g., /tracker/edit/1/ -> '1'

  if (!id) {
    window.location.href = "/tracker/";
    return;
  }

  loadMedia(parseInt(id));

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const status = (document.getElementById("status") as HTMLSelectElement)
      .value;
    const rating = (document.getElementById("rating") as HTMLSelectElement)
      .value;
    const type = (document.getElementById("type") as HTMLSelectElement).value;
    const description = (
      document.getElementById("description") as HTMLTextAreaElement
    ).value;

    const data = {
      title,
      status: status || null,
      rating: rating ? parseInt(rating) : null,
      type: type || null,
      description: description || null,
    };

    try {
      const token = getCsrfTokenEditMedia();
      const headers: any = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["X-CSRFToken"] = token;
      }
      const response = await fetch(
        `${EDIT_MEDIA_API_BASE_URL}/api/media/${id}/`,
        {
          method: "PUT",
          headers,
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        window.location.href = "/tracker/";
      } else {
        const err = await response.json();
        errorDiv.textContent = err.detail || "Failed to update media";
        errorDiv.style.display = "block";
      }
    } catch (error) {
      errorDiv.textContent = "Network error";
      errorDiv.style.display = "block";
    }
  });

  async function loadMedia(id: number) {
    try {
      const response = await fetch(
        `${EDIT_MEDIA_API_BASE_URL}/api/media/${id}/`,
        {
          credentials: "include",
        }
      );

      if (response.status === 401) {
        window.location.href = "/registration/login/";
        return;
      }

      const item: MediaItem = await response.json();

      if (response.ok) {
        (document.getElementById("title") as HTMLInputElement).value =
          item.title;
        (document.getElementById("status") as HTMLSelectElement).value =
          item.status || "";
        (document.getElementById("rating") as HTMLSelectElement).value =
          item.rating ? item.rating.toString() : "";
        (document.getElementById("type") as HTMLSelectElement).value =
          item.type || "";
        (document.getElementById("description") as HTMLTextAreaElement).value =
          item.description || "";
        titleH1.textContent = `Editing "${item.title}"`;
      } else {
        errorDiv.textContent = "Failed to load media";
        errorDiv.style.display = "block";
      }
    } catch (error) {
      errorDiv.textContent = "Network error";
      errorDiv.style.display = "block";
    }
  }
});
