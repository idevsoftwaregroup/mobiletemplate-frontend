import { useNavigate } from "react-router-dom";

export default function LoginLayout() {
  const navigate = useNavigate();

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
                برای مشاهده اطلاعات پروفایل، ابتدا وارد حساب کاربری خود شوید.
              </p>

              <p className="small-text">
                پس از ورود، می‌توانید اطلاعات حساب و تنظیمات پروفایل خود را
                مشاهده کنید.
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
