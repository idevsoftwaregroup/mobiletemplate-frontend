import { FormEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SERVER_URL = "http://localhost:3000";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${SERVER_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "ورود ناموفق بود");
      }

      // Backend returns: { user, token }
      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const redirect = searchParams.get("redirect") || "/";

      navigate(redirect);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "خطا در ورود به حساب کاربری",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="responsive max" dir="RTL">
      <div className="padding">
        <article className="round medium-elevate">
          <div className="padding">
            <h5>ورود به حساب کاربری</h5>

            {error && (
              <div className="error">
                <i>error</i>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="field label border round">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label>ایمیل</label>
              </div>

              <div className="field label border round">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label>رمز عبور</label>
              </div>
              <div className="space" />
              <button
                type="submit"
                className="responsive primary"
                disabled={loading}
              >
                {loading ? "در حال ورود..." : "ورود"}
              </button>
            </form>
          </div>
        </article>
      </div>
    </main>
  );
}
