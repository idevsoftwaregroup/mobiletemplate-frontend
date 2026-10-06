import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/dialog.css";

import {
  getProducts,
  getProductById,
  type Product,
} from "../services/products.services";

import imgUrl from "../assets/img/product-placeholder.jpg";

import { useCart } from "../contexts/CartContext";

export default function Products() {
  const openUrlServer = "http://0.0.0.0:3000";

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts();

      setProducts(data.filter((product) => product.status === "active"));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  const openProduct = async (id: string) => {
    try {
      const product = await getProductById(id);

      setSelectedProduct(product);

      // Beer CSS modal
      const dialog = document.getElementById(
        "product-dialog",
      ) as HTMLDialogElement;

      dialog.showModal();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading)
    return (
      <div className="padding" dir="rtl">
        در حال بارگذاری ...
      </div>
    );

  if (error)
    return (
      <div className="padding error" dir="rtl">
        {error}
      </div>
    );

  return (
    <section className="padding" dir="rtl">
      <header
        className="
blur 
tertiary 
white-text 
right-shadow 
round
"
      >
        <nav className="row middle-align">
          <div className="max left left-align">
            <h4 className="no-margin white-text">محصولات</h4>
          </div>

          <button
            className="circle transparent white-text"
            onClick={() => navigate("/")}
          >
            <i>arrow_back</i>
          </button>
        </nav>
      </header>
      <div className="space" />
      <div className="grid">
        {products.map((product) => (
          <div className="s12 m6 l4" key={product.id}>
            <article
              className="white 
card 
border 
round 
shadow
"
            >
              <img
                className="responsive"
                src={product.imageUrl || imgUrl}
                alt={product.name}
              />

              <div className="padding">
                <h5 className="justify-text">{product.name}</h5>

                <div className="small-space" />

                <h6 className="tertiary-text bold">
                  {Number(product.price).toLocaleString("fa-IR") + " "}
                  تومان
                </h6>

                <div className="space"></div>

                <div className="row right right-align">
                  <button
                    className="
                              tertiary
                              left-shadow left left-align
                              "
                    onClick={() => openProduct(product.id)}
                  >
                    <i>visibility</i>
                    مشاهده محصول
                  </button>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
      {/* BEGIN:::PRODUCT MODAL */}
      <dialog id="product-dialog" className="round product-dialog" dir="rtl">
        <div className="padding">
          {selectedProduct && (
            <div className="product-dialog-content">
              {/* Product Image - LEFT */}
              <div className="product-dialog-image">
                <img
                  className="responsive round"
                  src={
                    selectedProduct.imageUrl
                      ? `${openUrlServer}${selectedProduct.imageUrl}`
                      : imgUrl
                  }
                  alt={selectedProduct.name}
                />
              </div>

              {/* Product Information - RIGHT */}
              <div className="product-dialog-info">
                <h4>{selectedProduct.name}</h4>

                <p>{selectedProduct.description}</p>

                <div className="row wrap">
                  <span className="chip">
                    <i>category</i>
                    {selectedProduct.category}
                  </span>

                  <span className="chip">
                    <i>inventory</i>
                    {selectedProduct.stock}
                  </span>
                </div>

                <h5 className="primary-text">
                  {Number(selectedProduct.price).toLocaleString("fa-IR")} تومان
                </h5>

                <button
                  className="primary"
                  onClick={() => {
                    if (!selectedProduct) return;

                    addToCart(selectedProduct);
                  }}
                >
                  <i>add</i>
                  افزودن به سبد خرید
                </button>
              </div>
            </div>
          )}
        </div>

        <form method="dialog">
          <button className="secondary">بستن</button>
        </form>
      </dialog>
      {/* END */}
    </section>
  );
}
