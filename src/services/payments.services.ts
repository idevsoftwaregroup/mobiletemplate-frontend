import {
  getOrders,
  type Order,
  type OrderPayment,
  type PaymentStatus,
} from "./orders.services";

export interface Payment extends OrderPayment {
  order: Order;
}

export type { PaymentStatus };

export async function getPayments(): Promise<Payment[]> {
  const orders = await getOrders();

  return orders
    .flatMap((order) =>
      order.payments.map((payment) => ({
        ...payment,
        order,
      })),
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export async function getPaymentById(id: string): Promise<Payment | null> {
  const payments = await getPayments();

  return payments.find((payment) => payment.id === id) ?? null;
}
