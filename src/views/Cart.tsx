import { useNavigate } from "react-router-dom";

import "../assets/css/dialog.css";
import "../assets/css/cart.css";

import imgUrl from "../assets/img/product-placeholder.jpg";

import { useCart } from "../contexts/CartContext";

export default function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    totalItems,
    totalPrice,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const openUrlServer = import.meta.env.VITE_SERVER_URL;

  const getProductImage = (imageUrl?: string | null) => {
    if (!imageUrl) {
      return imgUrl;
    }

    if (imageUrl.startsWith("http")) {
      return imageUrl;
    }

    return `${openUrlServer}${imageUrl}`;
  };

  return (
    <section dir="rtl" className="cart-page">
      {/* Header */}
      <header className="blur tertiary white-text right-shadow round cart-header">
        <nav className="row middle-align" dir="rtl">
          <div className="max left-align">
            <h4 className="no-margin white-text">سبد خرید</h4>
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

      {/* Empty Cart */}
      {cartItems.length === 0 ? (
        <div className="center-align padding cart-empty">
          <i className="extra large-text">shopping_cart</i>

          <h5 className="margin">سبد خرید شما خالی است</h5>

          <p>هنوز محصولی به سبد خرید اضافه نکرده‌اید.</p>

          <button
            type="button"
            className="button primary"
            onClick={() => navigate("/products")}
          >
            <i>storefront</i>
            مشاهده محصولات
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="grid cart-items">
            {cartItems.map((item) => (
              <article
                key={item.product.id}
                className="
                  s12
                  surface-container
                  round
                  border
                  padding
                  margin-bottom
                  cart-item
                "
              >
                <div className="row cart-item-row">
                  {/* Product Image */}
                  <div className="s12 m3 cart-image-wrapper">
                    <img
                      src={getProductImage(item.product.imageUrl)}
                      alt={item.product.name}
                      className="responsive round cart-image"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="s12 m9 padding cart-info" dir="rtl">
                    <h5 className="cart-product-name">{item.product.name}</h5>

                    {item.product.category && (
                      <p className="secondary-text">{item.product.category}</p>
                    )}

                    <p className="cart-description">
                      {item.product.description ||
                        "توضیحی برای این محصول ثبت نشده است."}
                    </p>

                    <h6 className="primary-text cart-price">
                      {Number(item.product.price).toLocaleString("fa-IR")} تومان
                    </h6>

                    {/* Quantity + Remove */}
                    <div className="cart-actions">
                      <div className="cart-quantity">
                        <button
                          type="button"
                          className="circle"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          aria-label="کاهش تعداد"
                        >
                          <i>remove</i>
                        </button>

                        <span className="cart-quantity-value">
                          {item.quantity.toLocaleString("fa-IR")}
                        </span>

                        <button
                          type="button"
                          className="circle"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          aria-label="افزایش تعداد"
                        >
                          <i>add</i>
                        </button>
                      </div>

                      <button
                        type="button"
                        className="button error cart-remove"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <i>delete</i>
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="large-space" />

          {/* Cart Summary */}
          <div
            className="
              surface-container
              round
              border
              padding
              cart-summary
            "
            dir="rtl"
          >
            <h5>خلاصه سبد خرید</h5>

            <div className="row cart-summary-row">
              <div className="max">تعداد محصولات</div>

              <strong>{totalItems.toLocaleString("fa-IR")}</strong>
            </div>

            <div className="row cart-summary-row">
              <div className="max">مبلغ کل</div>

              <strong className="primary-text">
                {totalPrice.toLocaleString("fa-IR")} تومان
              </strong>
            </div>

            <div className="space" />

            <div className="cart-summary-actions">
              <button
                type="button"
                className="button primary"
                onClick={() => navigate("/checkout")}
              >
                <i>shopping_cart_checkout</i>
                پرداخت
              </button>

              <button
                type="button"
                className="button error"
                onClick={clearCart}
              >
                <i>delete_sweep</i>
                خالی کردن سبد
              </button>

              <button
                type="button"
                className="button black"
                onClick={() => navigate("/products")}
              >
                <i>add</i>
                افزودن محصول
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
