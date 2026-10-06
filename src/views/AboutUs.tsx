import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getPublicPage, type Page } from "../services/pages.services";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function AboutUs() {
  const navigate = useNavigate();

  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPage = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getPublicPage("about-us");

        setPage(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "خطا در دریافت صفحه درباره ما.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, []);

  if (loading) {
    return (
      <main className="responsive max" dir="rtl">
        {" "}
        <div className="padding center-align">
          {" "}
          <progress className="circle" /> <p>در حال بارگذاری...</p>{" "}
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
          <article className="round medium-elevate">
            {" "}
            <div className="padding center-align">
              {" "}
              <i>error</i> <p>{error}</p>
              <button
                type="button"
                className="primary"
                onClick={() => navigate("/")}
              >
                بازگشت
              </button>
            </div>
          </article>
        </div>
      </main>
    );
  }

  if (!page) {
    return null;
  }

  const imageUrl = page.imageUrl
    ? page.imageUrl.startsWith("http")
      ? page.imageUrl
      : `${SERVER_URL}${page.imageUrl}`
    : null;

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
              <h5 className="no-margin white-text">{page.title} </h5>{" "}
            </div>
            <button
              type="button"
              className="circle transparent white-text"
              onClick={() => navigate("/")}
            >
              <i>arrow_back</i>
            </button>
          </nav>
        </header>
        <div className="space" />
        <article className="round medium-elevate">
          <div className="padding">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={page.title}
                style={{
                  width: "100%",
                  maxHeight: "420px",
                  objectFit: "cover",
                  borderRadius: "16px",
                }}
              />
            )}

            {imageUrl && <div className="space" />}

            {/* <h4>{page.title}</h4> */}

            {/* <div className="divider" /> */}

            <div
              style={{
                lineHeight: 2,
                whiteSpace: "pre-wrap",
              }}
            >
              {page.content}
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
