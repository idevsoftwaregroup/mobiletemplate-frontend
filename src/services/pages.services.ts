const API_URL = import.meta.env.VITE_API_URL;

export interface Page {
  id: string;
  title: string;
  typeOfPage: string;
  slug: string;
  content: string;
  imageUrl?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export async function getPublicPage(slug: string): Promise<Page> {
  const response = await fetch(
    `${API_URL}/pages/slug/${encodeURIComponent(slug)}`,
    {
      method: "GET",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to fetch page");
  }

  return data;
}
