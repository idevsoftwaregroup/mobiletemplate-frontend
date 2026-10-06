import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginLayout from "../../src/components/LoginLayout";

import {
  getPayments,
  type Payment,
  type PaymentStatus,
} from "../services/payments.services";

const SERVER_URL = "http://localhost:3000";

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

function getPaymentMethodLabel(method: string): string {
  const methods: Record<string, string> = {
    manual: "پرداخت دستی",
    online: "پرداخت آنلاین",
  };

  return methods[method] || method;
}

function getReceiptUrl(receiptImage: string | null): string | null {
  if (!receiptImage) {
    return null;
  }

  /*

* If Backend already returns a complete URL,
* use it directly.
  */
  if (
    receiptImage.startsWith("http://") ||
    receiptImage.startsWith("https://")
  ) {
    return receiptImage;
  }

  /*

* receiptImage belongs to Backend filesystem.
*
* Example:
*
* D:\Projects\Templates\back-end\uploads\receipts\abc.png
*
* The Frontend must NOT use that filesystem path.
* We only extract the filename.
  */

  const backslash = String.fromCharCode(92);

  const normalizedPath = receiptImage.split(backslash).join("/");

  const pathParts = normalizedPath.split("/");

  const fileName = pathParts[pathParts.length - 1];

  if (!fileName) {
    return null;
  }

  /*

* Backend serves:
*
* /uploads/receipts/<filename>
  */

  return `${SERVER_URL}/uploads/receipts/${encodeURIComponent(fileName)}`;
}

export default function Payments() {
  const navigate = useNavigate();

  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const loadPayments = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getPayments();

        setPayments(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "خطا در دریافت پرداخت‌ها.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, [token]);

  /*

* User is not logged in.
  */
  if (!token) {
    return <LoginLayout />;
  }

  /*

* Loading
  */
  if (loading) {
    return (
      <main className="responsive max" dir="rtl">
        <div className="padding center-align">
          <progress className="circle" />

          <p>در حال بارگذاری پرداخت‌ها...</p>
        </div>
      </main>
    );
  }

  /*

* Error
  */
  if (error) {
    return (
      <main className="responsive max" dir="rtl">
        <div className="padding">
          <article className="error-container round">
            <div className="padding">
              <div className="row middle-align">
                <i>error</i>

                <span>{error}</span>
              </div>

              <div className="space" />

              <div className="row">
                <button
                  type="button"
                  className="primary"
                  onClick={() => window.location.reload()}
                >
                  <i>refresh</i>
                  <span>تلاش مجدد</span>
                </button>

                <button
                  type="button"
                  className="secondary"
                  onClick={() => navigate("/")}
                >
                  <i>arrow_back</i>
                  <span>بازگشت</span>
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
        {/* HEADER */}
        <header className="blur tertiary white-text round checkout-header">
          <nav className="row middle-align">
            <div className="max">
              <h5 className="no-margin white-text">پرداخت‌ها</h5>
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

        {/* EMPTY STATE */}
        {payments.length === 0 ? (
          <article className="round medium-elevate">
            <div className="padding center-align">
              <i
                style={{
                  fontSize: "64px",
                }}
              >
                payments
              </i>

              <div className="space" />

              <h5>هنوز پرداختی ندارید</h5>

              <p>اطلاعات پرداخت سفارش‌های شما در این بخش نمایش داده می‌شود.</p>

              <div className="space" />

              <button
                type="button"
                className="primary"
                onClick={() => navigate("/orders")}
              >
                <i>receipt_long</i>
                <span>مشاهده سفارش‌ها</span>
              </button>
            </div>
          </article>
        ) : (
          /* PAYMENTS */
          <div className="grid">
            {payments.map((payment) => {
              const receiptUrl = getReceiptUrl(payment.receiptImage);

              return (
                <div className="s12" key={payment.id}>
                  <article className="round medium-elevate">
                    <div className="padding">
                      {/* PAYMENT HEADER */}
                      <div className="row middle-align">
                        <div className="max">
                          <h6 className="no-margin">
                            پرداخت #{payment.id.slice(0, 8)}
                          </h6>

                          <small>{formatDate(payment.createdAt)}</small>
                        </div>

                        <button
                          type="button"
                          className="circle transparent"
                          onClick={() => navigate(`/orders/${payment.orderId}`)}
                          title="مشاهده سفارش"
                          aria-label="مشاهده سفارش"
                        >
                          <i>receipt_long</i>
                        </button>
                      </div>

                      <div className="space" />

                      {/* PAYMENT INFORMATION */}
                      <div className="grid">
                        {/* AMOUNT */}
                        <div className="s12 m6">
                          <div className="padding">
                            <small>مبلغ</small>

                            <h6 className="no-margin">
                              {formatPrice(payment.amount)} تومان
                            </h6>
                          </div>
                        </div>

                        {/* STATUS */}
                        <div className="s12 m6">
                          <div className="padding">
                            <small>وضعیت</small>

                            <p className="no-margin">
                              {getPaymentStatusLabel(payment.status)}
                            </p>
                          </div>
                        </div>

                        {/* METHOD */}
                        <div className="s12 m6">
                          <div className="padding">
                            <small>روش پرداخت</small>

                            <p className="no-margin">
                              {getPaymentMethodLabel(payment.paymentMethod)}
                            </p>
                          </div>
                        </div>

                        {/* TRACKING CODE */}
                        <div className="s12 m6">
                          <div className="padding">
                            <small>کد پیگیری</small>

                            <p className="no-margin">
                              {payment.trackingCode || "-"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* ADMIN NOTE */}
                      {payment.adminNote && (
                        <>
                          <div className="divider" />

                          <small>توضیحات</small>

                          <p>{payment.adminNote}</p>
                        </>
                      )}

                      {/* RECEIPT */}
                      {receiptUrl && (
                        <>
                          <div className="divider" />

                          <div className="space" />

                          <a
                            href={receiptUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="button secondary responsive small"
                          >
                            <i>image</i>

                            <span>مشاهده رسید پرداخت</span>
                          </a>
                        </>
                      )}
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
