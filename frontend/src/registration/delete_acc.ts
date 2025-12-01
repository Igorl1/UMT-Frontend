// delete_acc.ts - Delete account functionality
const DELETE_ACC_API_BASE_URL = window.location.hostname.includes(
  "pythonanywhere.com"
)
  ? "https://igorl1.pythonanywhere.com"
  : "http://127.0.0.1:8000";

function getCsrfTokenDeleteAcc() {
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
  const deleteBtn = document.getElementById(
    "delete-account-btn"
  ) as HTMLButtonElement;
  const errorDiv = document.getElementById("error-message") as HTMLDivElement;
  const successDiv = document.getElementById(
    "success-message"
  ) as HTMLDivElement;

  deleteBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    if (
      !confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const token = getCsrfTokenDeleteAcc();
      const headers: any = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["X-CSRFToken"] = token;
      }
      const response = await fetch(
        `${DELETE_ACC_API_BASE_URL}/api/delete_account/`,
        {
          method: "POST",
          headers,
          credentials: "include",
          body: JSON.stringify({}),
        }
      );

      const data = await response.json();

      if (response.ok) {
        successDiv.textContent = data.detail;
        successDiv.style.display = "block";
        errorDiv.style.display = "none";
        // Redirect to login page immediately after successful deletion
        window.location.href = "/registration/login/";
      } else {
        errorDiv.textContent = data.detail || "Failed to delete account";
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
