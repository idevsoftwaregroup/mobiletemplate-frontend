const API_URL = import.meta.env.VITE_API_URL;

export async function logoutUser(): Promise<void> {
  const token = localStorage.getItem("accessToken");

  try {
    if (token) {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.warn("Logout request failed:", response.status);
      }
    }
  } catch (error) {
    console.error("LOGOUT ERROR:", error);
  } finally {
    // Always remove local authentication data
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  }
}
