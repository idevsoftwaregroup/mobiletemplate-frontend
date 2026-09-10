export default function OpeningBanner() {
  return (
    <article
      className="
        round
        border
        shadow
        overflow-hidden
      "
      dir="rtl"
      style={{
        background:
          "linear-gradient(135deg,#bc004b 0%,#75565b 45%,#795831 100%)",
        color: "#ffffff",
      }}
    >
      <div
        className="
          padding
          center-align
          middle-align
        "
        style={{
          minHeight: "260px",
        }}
      >
        <div className="responsive">
          <h1
            className="
              bold
            "
            style={{
              fontSize: "clamp(2rem,5vw,3.5rem)",
              marginBottom: "12px",
            }}
          >
            هستان 🌿
          </h1>

          <h5
            style={{
              fontSize: "clamp(1rem,3vw,1.5rem)",
              lineHeight: "1.8",
            }}
          >
            مسیر آرام‌تر زندگی از همین‌جا شروع می‌شود
          </h5>

          <p
            style={{
              opacity: 0.9,
              fontSize: "clamp(.8rem,2vw,1rem)",
              maxWidth: "600px",
              margin: "auto",
            }}
          >
            تجربه‌ای متفاوت در روانشناسی، رشد فردی و شناخت بهتر خود
          </p>

          <div className="medium-space"></div>

          <button
            className="
              round
              medium
            "
            style={{
              background: "#ffd9de",
              color: "#400014",
              border: "none",
              padding: "12px 32px",
              fontWeight: "900",
            }}
          >
            شروع تجربه جدید
          </button>
        </div>
      </div>
    </article>
  );
}
