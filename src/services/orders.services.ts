const API_URL = import.meta.env.VITE_API_URL;

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentStatus =
  | "UNPAID"
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "REFUNDED";

export interface OrderUser {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
  avatarUrl: string | null;
  role: string;
}

export interface OrderProduct {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price: string | number;
  imageUrl: string | null;
  category: string | null;
  stock: number;
  status: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: string | number;
  product: OrderProduct;
}

export interface OrderPayment {
  id: string;
  orderId: string;
  amount: string | number;
  createdAt: string;
  updatedAt: string;
  adminNote: string | null;
  paymentMethod: string;
  receiptImage: string | null;
  reviewedAt: string | null;
  reviewedBy: string | null;
  trackingCode: string | null;
  status: PaymentStatus;
}

export interface Order {
  id: string;
  userId: string;
  totalAmount: string | number;
  createdAt: string;
  updatedAt: string;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  items: OrderItem[];
  user?: OrderUser;
  payments: OrderPayment[];
}

function getToken(): string | null {
  return localStorage.getItem("accessToken");
}

function getCurrentUserId(): string | null {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    return null;
  }

  try {
    const user = JSON.parse(storedUser);

    return user?.id ?? null;
  } catch {
    return null;
  }
}

export async function getOrders(): Promise<Order[]> {
  const token = getToken();

  if (!token) {
    throw new Error("AUTH_REQUIRED");
  }

  const userId = getCurrentUserId();

  if (!userId) {
    throw new Error("اطلاعات کاربر پیدا نشد.");
  }

  const response = await fetch(`${API_URL}/orders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Failed to fetch orders.");
  }

  const orders: Order[] = Array.isArray(data)
    ? data
    : Array.isArray(data?.orders)
      ? data.orders
      : [];

  return orders.filter((order) => order.userId === userId);
}

export async function getOrderById(id: string): Promise<Order> {
  const token = getToken();

  if (!token) {
    throw new Error("AUTH_REQUIRED");
  }

  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Failed to fetch order.");
  }

  return data;
}
