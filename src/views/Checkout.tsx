import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../assets/css/checkout.css";

import { useCart } from "../contexts/CartContext";

const SERVER_URL = "http://0.0.0.0:3000";

interface CheckoutForm {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  postalCode: string;
  trackingCode: string;
  description: string;
}

export default function Checkout() {
  const navigate = useNavigate();

  const { cartItems, totalItems, totalPrice, clearCart } = useCart();

  const [form, setForm] = useState<CheckoutForm>({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    postalCode: "",
    trackingCode: "",
    description: "",
  });

  const [receipt, setReceipt] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate(`/login?redirect=${encodeURIComponent("/checkout")}`);
    }
  }, [navigate]);

  const handleChange = (field: keyof CheckoutForm, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleReceiptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setReceipt(null);
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      setError("فرمت رسید باید JPEG یا PNG باشد.");
      setReceipt(null);
      return;
    }

    setError("");
    setReceipt(file);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      /* =========================
         AUTHENTICATION
      ========================== */

      const token = localStorage.getItem("accessToken");

      if (!token) {
        return (
          <main
            className="responsive max"
            dir="rtl"
            style={{
              padding: "24px",
            }}
          >
            {" "}
            <div className="center-align">
              {" "}
              <article className="round medium-elevate">
                <div
                  className="padding"
                  style={{
                    maxWidth: "520px",
                    margin: "0 auto",
                  }}
                >
                  {" "}
                  <div className="center-align">
                    <div
                      className="circle primary"
                      style={{
                        width: "88px",
                        height: "88px",
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <i
                        style={{
                          fontSize: "48px",
                        }}
                      >
                        account_circle{" "}
                      </i>{" "}
                    </div>

                    <div className="space" />

                    <h4 className="no-margin">پروفایل کاربری</h4>

                    <div className="space" />

                    <p className="medium-text">
                      برای مشاهده اطلاعات پروفایل، ابتدا وارد حساب کاربری خود
                      شوید.
                    </p>

                    <p className="small-text">
                      پس از ورود، می‌توانید اطلاعات حساب و تنظیمات پروفایل خود
                      را مشاهده کنید.
                    </p>

                    <div className="space" />

                    <button
                      type="button"
                      className="primary responsive"
                      onClick={() => navigate("/login")}
                    >
                      <i>login</i>
                      <span>ورود به حساب کاربری</span>
                    </button>

                    <div className="space" />

                    <button
                      type="button"
                      className="transparent"
                      onClick={() => navigate("/")}
                    >
                      <i>arrow_back</i>
                      <span>بازگشت به صفحه اصلی</span>
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </main>
        );
      }

      /* =========================
         FORM DATA
      ========================== */

      const formData = new FormData();

      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("phone", form.phone);
      formData.append("address", form.address);
      formData.append("postalCode", form.postalCode);

      formData.append("trackingCode", form.trackingCode);

      formData.append("description", form.description);

      formData.append(
        "items",
        JSON.stringify(
          cartItems.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
        ),
      );

      if (receipt) {
        formData.append("receipt", receipt);
      }

      /* =========================
         CREATE ORDER
      ========================== */

      const response = await fetch(`${SERVER_URL}/api/orders`, {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
        },

        body: formData,
      });

      const data = await response.json().catch(() => null);

      console.log("CREATE ORDER STATUS:", response.status);

      console.log("CREATE ORDER RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            `Failed to create order (${response.status})`,
        );
      }

      console.log("ORDER CREATED:", data);

      clearCart();
      setSuccess(true);
    } catch (error) {
      console.error("CREATE ORDER ERROR:", error);

      setError(error instanceof Error ? error.message : "خطا در ثبت سفارش");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     SUCCESS
  ========================== */

  if (success) {
    return (
      <section className="checkout-page" dir="rtl">
        <div className="checkout-success">
          <i className="extra large-text">check_circle</i>

          <h4>سفارش شما با موفقیت ثبت شد</h4>

          <p>پرداخت شما برای بررسی ارسال شد.</p>

          <p>پس از بررسی رسید پرداخت، وضعیت سفارش شما به‌روزرسانی خواهد شد.</p>

          <button
            type="button"
            className="button primary"
            onClick={() => navigate("/")}
          >
            <i>home</i>
            بازگشت به صفحه اصلی
          </button>
        </div>
      </section>
    );
  }

  /* =========================
     EMPTY CART
  ========================== */

  if (cartItems.length === 0) {
    return (
      <section className="checkout-page" dir="rtl">
        <div className="checkout-empty">
          <i className="extra large-text">shopping_cart</i>

          <h5>سبد خرید شما خالی است</h5>

          <button
            type="button"
            className="button primary"
            onClick={() => navigate("/products")}
          >
            <i>storefront</i>
            مشاهده محصولات
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page" dir="rtl">
      {/* HEADER */}

      <header className="blur tertiary white-text round checkout-header">
        <nav className="row middle-align">
          <div className="max">
            <h4 className="no-margin white-text">تکمیل سفارش و پرداخت</h4>
          </div>

          <button
            type="button"
            className="circle transparent white-text"
            onClick={() => navigate("/cart")}
          >
            <i>arrow_back</i>
          </button>
        </nav>
      </header>

      <div className="space" />

      {/* ERROR */}

      {error && (
        <div className="checkout-error" dir="rtl">
          <i>error</i>
          <span>{error}</span>
        </div>
      )}

      {/* MAIN */}

      <div className="checkout-layout">
        {/* =========================
            CUSTOMER INFORMATION
        ========================== */}

        <div className="checkout-form surface-container round border padding">
          <h5>اطلاعات گیرنده</h5>

          <p className="secondary-text">
            قبل از پرداخت، اطلاعات زیر را تکمیل کنید.
          </p>

          <div className="checkout-fields">
            <div className="field label border round">
              <input
                type="text"
                value={form.firstName}
                onChange={(event) =>
                  handleChange("firstName", event.target.value)
                }
                required
              />

              <label>نام</label>
            </div>

            <div className="field label border round">
              <input
                type="text"
                value={form.lastName}
                onChange={(event) =>
                  handleChange("lastName", event.target.value)
                }
                required
              />

              <label>نام خانوادگی</label>
            </div>

            <div className="field label border round">
              <input
                type="tel"
                value={form.phone}
                onChange={(event) => handleChange("phone", event.target.value)}
                required
              />

              <label>شماره تماس</label>
            </div>

            <div className="field label border round">
              <input
                type="text"
                inputMode="numeric"
                value={form.postalCode}
                onChange={(event) =>
                  handleChange("postalCode", event.target.value)
                }
                required
              />

              <label>کد پستی</label>
            </div>

            <div className="field label border round checkout-full">
              <textarea
                value={form.address}
                onChange={(event) =>
                  handleChange("address", event.target.value)
                }
                rows={4}
                required
              />

              <label>آدرس کامل</label>
            </div>
          </div>

          <div className="large-space" />

          {/* =========================
              PAYMENT INFORMATION
          ========================== */}

          <h5>اطلاعات پرداخت</h5>

          <p className="secondary-text">
            پس از پرداخت، اطلاعات زیر را تکمیل کنید.
          </p>

          <div className="checkout-fields checkout-payment-fields">
            <div className="checkout-upload checkout-full border padding">
              <label>بارگذاری رسید پرداخت</label>

              <input
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleReceiptChange}
              />

              {receipt && (
                <p className="secondary-text">
                  فایل انتخاب شده: {receipt.name}
                </p>
              )}
            </div>

            <div className="field label border round checkout-full">
              <input
                type="text"
                value={form.trackingCode}
                onChange={(event) =>
                  handleChange("trackingCode", event.target.value)
                }
                required
              />

              <label>شماره پیگیری پرداخت</label>
            </div>

            <div className="field label border round checkout-full">
              <textarea
                value={form.description}
                onChange={(event) =>
                  handleChange("description", event.target.value)
                }
                rows={3}
              />

              <label>توضیحات</label>
            </div>
          </div>
        </div>

        {/* =========================
            ORDER SUMMARY
        ========================== */}

        <aside className="checkout-summary surface-container round border padding">
          <h5>خلاصه سفارش</h5>

          <div className="checkout-products">
            {cartItems.map((item) => (
              <div key={item.product.id} className="checkout-product">
                <div className="checkout-product-image">
                  <img
                    src={
                      item.product.imageUrl
                        ? item.product.imageUrl.startsWith("http")
                          ? item.product.imageUrl
                          : `${SERVER_URL}${item.product.imageUrl}`
                        : ""
                    }
                    alt={item.product.name}
                  />
                </div>

                <div className="max">
                  <strong>{item.product.name}</strong>

                  <p>تعداد: {item.quantity.toLocaleString("fa-IR")}</p>
                </div>

                <strong>
                  {(Number(item.product.price) * item.quantity).toLocaleString(
                    "fa-IR",
                  )}{" "}
                  تومان
                </strong>
              </div>
            ))}
          </div>

          <div className="space" />

          <div className="row">
            <span className="max">تعداد محصولات</span>

            <strong>{totalItems.toLocaleString("fa-IR")}</strong>
          </div>

          <div className="row margin-top">
            <span className="max">مبلغ نهایی</span>

            <strong className="primary-text checkout-total">
              {totalPrice.toLocaleString("fa-IR")} تومان
            </strong>
          </div>

          <div className="space" />

          <button
            type="button"
            className="button primary checkout-submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <i>progress_activity</i>
                در حال ثبت سفارش...
              </>
            ) : (
              <>
                <i>payments</i>
                ثبت نهایی سفارش و پرداخت
              </>
            )}
          </button>

          <button
            type="button"
            className="button secondary checkout-back"
            onClick={() => navigate("/cart")}
          >
            <i>arrow_back</i>
            بازگشت به سبد خرید
          </button>
        </aside>
      </div>
    </section>
  );
}
