import { useEffect, useState } from "react";

import { getProducts, type Product } from "../services/products.services";

import { useCart } from "../contexts/CartContext";

import imgUrl from "../../src/assets/img/product-placeholder.jpg";

const SERVER_URL = "http://localhost:3000";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);

        const data = await getProducts();

        // فقط 4 محصول برای صفحه اصلی
        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error("Failed to load featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const getProductImage = (imageUrl?: string | null) => {
    if (!imageUrl) {
      return imgUrl;
    }

    if (imageUrl.startsWith("http")) {
      return imageUrl;
    }

    return `${SERVER_URL}${imageUrl}`;
  };

  if (loading) {
    return <div className="center-align padding">در حال دریافت محصولات...</div>;
  }

  if (products.length === 0) {
    return (
      <div className="center-align padding">محصولی برای نمایش وجود ندارد.</div>
    );
  }

  return (
    <div className="grid" dir="rtl">
      {products.map((product) => (
        <article key={product.id} className="s12 m6 l3">
          <div className="surface-container round">
            {/* PRODUCT IMAGE */}
            <img
              src={getProductImage(product.imageUrl)}
              alt={product.name}
              className="responsive round"
            />

            {/* PRODUCT CONTENT */}
            <div className="padding">
              <h5>{product.name}</h5>

              <p>
                {product.description || "توضیحی برای این محصول ثبت نشده است."}
              </p>

              {/* PRICE */}
              <h6 className="primary-text">
                {Number(product.price).toLocaleString("fa-IR")} تومان
              </h6>

              {/* ADD TO CART */}
              <button
                type="button"
                className="button primary"
                onClick={() => addToCart(product)}
              >
                <i>shopping_cart</i>
                افزودن به سبد خرید
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
