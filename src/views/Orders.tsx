import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginLayout from "../../src/components/LoginLayout";

import {
  getOrders,
  type Order,
  type OrderStatus,
  type PaymentStatus,
} from "../services/orders.services";

function formatPrice(value: string | number): string {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "0";
  }

  return amount.toLocaleString("fa-IR");
}

function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString("fa-IR");
}

function getOrderStatusLabel(status: OrderStatus): string {
  const labels: Record<OrderStatus, string> = {
    PENDING: "در انتظار بررسی",
    CONFIRMED: "تأیید شده",
    PROCESSING: "در حال پردازش",
    SHIPPED: "ارسال شده",
    DELIVERED: "تحویل شده",
    CANCELLED: "لغو شده",
  };

  return labels[status];
}

function getPaymentStatusLabel(status: PaymentStatus): string {
  const labels: Record<PaymentStatus, string> = {
    UNPAID: "پرداخت نشده",
    PENDING: "در انتظار بررسی",
    PAID: "پرداخت موفق",
    FAILED: "ناموفق",
    REFUNDED: "بازگشت وجه",
  };

  return labels[status];
}

export default function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const loadOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getOrders();

        setOrders(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "خطا در دریافت سفارش‌ها.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [token]);

  // User is not logged in
  if (!token) {
    return <LoginLayout />;
  }

  if (loading) {
    return (
      <main className="responsive max" dir="rtl">
        {" "}
        <div className="padding center-align">
          {" "}
          <progress className="circle" />{" "}
          <p>در حال بارگذاری سفارش‌ها...</p>{" "}
        </div>{" "}
      </main>
    );
  }

  if (error) {
    return (
      <main className="responsive max" dir="rtl">
        {" "}
        <div className="padding">
          {" "}
          <article className="error-container round">
            {" "}
            <div className="padding">
              {" "}
              <div className="row middle-align">
                {" "}
                <i>error</i> <span>{error}</span>{" "}
              </div>
              <div className="space" />
              <div className="row">
                <button
                  type="button"
                  className="primary"
                  onClick={() => navigate("/")}
                >
                  <i>arrow_back</i>
                  <span>بازگشت</span>
                </button>

                <button
                  type="button"
                  className="secondary"
                  onClick={() => window.location.reload()}
                >
                  <i>refresh</i>
                  <span>تلاش مجدد</span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </main>
    );
  }

  return (
    <main className="responsive max" dir="rtl">
      {" "}
      <section className="no-padding">
        {" "}
        <header className="blur tertiary white-text round checkout-header">
          {" "}
          <nav className="row middle-align">
            {" "}
            <div className="max">
              {" "}
              <h5 className="no-margin white-text">سفارش ها </h5>{" "}
            </div>
            <button
              type="button"
              className="circle transparent white-text"
              onClick={() => navigate("/")}
              aria-label="بازگشت"
            >
              <i>arrow_back</i>
            </button>
          </nav>
        </header>
        <div className="space" />
        {orders.length === 0 ? (
          <article className="round medium-elevate">
            <div className="padding center-align">
              <i
                style={{
                  fontSize: "64px",
                }}
              >
                shopping_bag
              </i>

              <div className="space" />

              <h5>هنوز سفارشی ندارید</h5>

              <p>
                پس از ثبت سفارش، سفارش‌های شما در این بخش نمایش داده می‌شوند.
              </p>

              <div className="space" />

              <button
                type="button"
                className="primary"
                onClick={() => navigate("/")}
              >
                <i>storefront</i>
                <span>مشاهده محصولات</span>
              </button>
            </div>
          </article>
        ) : (
          <div className="grid">
            {orders.map((order) => (
              <div className="s12" key={order.id}>
                <article className="round medium-elevate">
                  <div className="padding">
                    {/* ORDER HEADER */}
                    <div className="row middle-align">
                      <div className="max">
                        <h6 className="no-margin">
                          سفارش #{order.id.slice(0, 8)}
                        </h6>

                        <small>{formatDate(order.createdAt)}</small>
                      </div>

                      <button
                        type="button"
                        className="circle transparent"
                        onClick={() => navigate(`/orders/${order.id}`)}
                        title="مشاهده سفارش"
                        aria-label="مشاهده سفارش"
                      >
                        <i>chevron_left</i>
                      </button>
                    </div>

                    <div className="space" />

                    {/* ORDER INFORMATION */}
                    <div className="grid">
                      <div className="s12 m6">
                        <div className="padding">
                          <small>وضعیت سفارش</small>

                          <p className="no-margin">
                            {getOrderStatusLabel(order.status)}
                          </p>
                        </div>
                      </div>

                      <div className="s12 m6">
                        <div className="padding">
                          <small>وضعیت پرداخت</small>

                          <p className="no-margin">
                            {getPaymentStatusLabel(order.paymentStatus)}
                          </p>
                        </div>
                      </div>

                      <div className="s12 m6">
                        <div className="padding">
                          <small>تعداد اقلام</small>

                          <p className="no-margin">
                            {order.items.reduce(
                              (total, item) => total + item.quantity,
                              0,
                            )}{" "}
                            عدد
                          </p>
                        </div>
                      </div>

                      <div className="s12 m6">
                        <div className="padding">
                          <small>مبلغ نهایی</small>

                          <p className="no-margin">
                            {formatPrice(order.totalAmount)} تومان
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="divider" />

                    {/* PRODUCTS */}
                    <h6>محصولات</h6>

                    {order.items.map((item) => (
                      <div
                        className="row middle-align"
                        key={item.id}
                        style={{
                          padding: "8px 0",
                        }}
                      >
                        {item.product?.imageUrl ? (
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            style={{
                              width: "48px",
                              height: "48px",
                              borderRadius: "8px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <i>inventory_2</i>
                        )}

                        <div className="max padding">
                          <strong>{item.product?.name || "محصول"}</strong>

                          <div>
                            <small>
                              تعداد: {item.quantity} × {formatPrice(item.price)}{" "}
                              تومان
                            </small>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* PAYMENTS */}
                    {order.payments && order.payments.length > 0 && (
                      <>
                        <div className="divider" />

                        <h6>پرداخت</h6>

                        {order.payments.map((payment) => (
                          <div className="row middle-align" key={payment.id}>
                            <i>payments</i>

                            <div className="max padding">
                              <small>
                                وضعیت: {getPaymentStatusLabel(payment.status)}
                              </small>

                              {payment.trackingCode && (
                                <div>
                                  <small>
                                    کد پیگیری: {payment.trackingCode}
                                  </small>
                                </div>
                              )}
                            </div>

                            <strong>{formatPrice(payment.amount)} تومان</strong>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
