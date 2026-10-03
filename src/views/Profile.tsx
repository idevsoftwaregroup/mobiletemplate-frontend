import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Profile {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
  avatarUrl: string | null;
  role: string;
  status?: string;
}

export default function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return;
    }

    try {
      const user = JSON.parse(storedUser) as Profile;
      setProfile(user);
    } catch (error) {
      console.error("PROFILE PARSE ERROR:", error);
    }
  }, []);

  if (!profile) {
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

  return (
    <main className="responsive max" dir="rtl">
      {" "}
      <div className="no-padding">
        {" "}
        <header className="blur tertiary white-text round checkout-header">
          <nav className="row middle-align">
            <div className="max">
              <h5 className="no-margin white-text">پروفایل کاربری</h5>
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
          {" "}
          <div className="space" />
          <div className="center-align">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt="Profile"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <i
                style={{
                  fontSize: "120px",
                }}
              >
                account_circle
              </i>
            )}

            <h5>
              {profile.firstName} {profile.lastName || ""}
            </h5>

            <p>{profile.email}</p>
          </div>
          <div className="space" />
          <div className="grid">
            <div className="s12 m6">
              <article className="round surface-variant">
                <div className="no-padding">
                  <small>نام</small>
                  <h6>{profile.firstName || "-"}</h6>
                </div>
              </article>
            </div>

            <div className="s12 m6">
              <article className="round surface-variant">
                <div className="no-padding">
                  <small>نام خانوادگی</small>
                  <h6>{profile.lastName || "-"}</h6>
                </div>
              </article>
            </div>

            <div className="s12">
              <article className="round surface-variant">
                <div className="no-padding">
                  <small>ایمیل</small>
                  <h6>{profile.email || "-"}</h6>
                </div>
              </article>
            </div>

            <div className="s12 m6">
              <article className="round surface-variant">
                <div className="no-padding">
                  <small>نقش</small>
                  <h6>{profile.role || "کاربر"}</h6>
                </div>
              </article>
            </div>

            <div className="s12 m6">
              <article className="round surface-variant">
                <div className="no-padding">
                  <small>وضعیت حساب</small>
                  <h6>{profile.status || "فعال"}</h6>
                </div>
              </article>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
