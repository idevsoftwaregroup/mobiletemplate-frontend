import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { getProducts, type Product } from "../services/products.services";
import { useEffect, useState } from "react";

export default function Banner() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts();

      console.log("Products:", data);

      setProducts(data.filter((product) => product.status === "active"));
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to load products",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full">
      <Swiper
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          480: {
            slidesPerView: 2,
          },

          768: {
            slidesPerView: 2,
          },

          1024: {
            slidesPerView: 4,
          },
        }}
        loop={products.length > 4}
        dir="rtl"
      >
        {products.map((product: Product) => (
          <SwiperSlide key={product.id} className="rounded-3xl">
            <article
              className="
                        flex
                        h-full
                        flex-col
                        overflow-hidden
                        round
                        border
                        p-3
                        shadow-sm
                        surface-container
                      "
            >
              {/* Product Image */}
              <div
                className="
w-full
    aspect-square
    overflow-hidden
    round
    bg-gray-50
  "
              >
                <img
                  src={product.imageUrl ?? ""}
                  alt={product.name}
                  loading="lazy"
                  className="
    h-full
    w-full
    object-cover
  "
                  style={{ width: "100%" }}
                />
              </div>

              {/* Product Info */}
              <div
                className="
                  mt-3
                  text-right
                "
                dir="rtl"
              >
                <h6
                  className="
                    truncate
                    text-sm
                    font-semibold
                    sm:text-base
                    margin
                  "
                >
                  {product.name}
                </h6>

                <p
                  className="
                    mt-1
                    text-xs
                    text-gray-500
                    sm:text-sm
                    margin
                  "
                >
                  {product.category}
                </p>

                <p
                  className="
                    mt-2
                    text-sm
                    font-bold
                    text-green-600
                    sm:text-base
                    margin
                  "
                >
                  {Number(product.price).toLocaleString()} تومان
                </p>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
