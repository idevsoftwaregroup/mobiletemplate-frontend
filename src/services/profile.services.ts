const API_URL = import.meta.env.VITE_API_URL;

export interface Profile {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
  avatarUrl: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  role: string;
}

interface ApiMessage {
  message: string;
}

function getToken(): string | null {
  return localStorage.getItem("accessToken");
}

export async function getUserProfile(): Promise<Profile> {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    throw new Error("اطلاعات کاربر پیدا نشد. لطفاً دوباره وارد شوید.");
  }

  try {
    const user = JSON.parse(storedUser) as Profile;

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName ?? null,
      email: user.email,
      avatarUrl: user.avatarUrl ?? null,
      status: user.status ?? "active",
      createdAt: user.createdAt ?? "",
      updatedAt: user.updatedAt ?? "",
      role: user.role ?? "user",
    };
  } catch {
    throw new Error("اطلاعات ذخیره‌شده کاربر نامعتبر است.");
  }
}

export async function updateUserProfile(
  id: string,
  formData: FormData,
): Promise<Profile> {
  const token = getToken();

  if (!token) {
    throw new Error("ابتدا باید وارد حساب کاربری شوید.");
  }

  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to update User Profile.");
  }

  const updatedProfile: Profile = data.user ?? data;

  localStorage.setItem("user", JSON.stringify(updatedProfile));

  return updatedProfile;
}

export async function deleteUserProfile(id: string): Promise<ApiMessage> {
  const token = getToken();

  if (!token) {
    throw new Error("ابتدا باید وارد حساب کاربری شوید.");
  }

  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to delete User Profile.");
  }

  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");

  return data;
}
