import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import logo from "../assets/logo/hastan_main_logo.png";

import "../assets/css/components/Navigation.css";

import { useCart } from "../contexts/CartContext";
import { logoutUser } from "../services/auth.services";

import "../../src/assets/css/logout.css";

export default function Navigation() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const { totalItems } = useCart();

  const logoTitle = "هستان | آنسوی ادراکی سالم و روانی منحصر به فرد";

  const style = {
    alignRTL: "RTL",
    alignLTR: "LTR",
    surface: "surface",
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
    } finally {
      setAccountOpen(false);
      navigate("/login");
    }
  };

  return (
    <>
      {/* TOP HEADER */}{" "}
      <header className="padding">
        {" "}
        <nav className={style.surface} dir={style.alignRTL}>
          {/* RIGHT SIDE */}{" "}
          <div className="row">
            {/* MENU */}
            <button
              type="button"
              className="circle large transparent"
              onClick={() => setOpen(true)}
              aria-label="منو"
            >
              {" "}
              <i className="large">apps</i>{" "}
            </button>

            {/* CART */}
            <div className="relative">
              <NavLink
                to="/cart"
                className="circle transparent large"
                aria-label="سبد خرید"
              >
                <i className="large circle">local_mall</i>

                {totalItems > 0 && <span className="badge">{totalItems}</span>}
              </NavLink>
            </div>

            {/* ACCOUNT */}
            <div className="account-menu-container">
              <button
                type="button"
                className="circle transparent large"
                onClick={() => setAccountOpen((value) => !value)}
                aria-label="حساب کاربری"
              >
                <i className="large circle">supervisor_account</i>
              </button>

              {accountOpen && (
                <menu className="account-dropdown" dir="rtl">
                  <li>
                    <NavLink
                      to="/profile"
                      onClick={() => setAccountOpen(false)}
                    >
                      <i>person</i>
                      پروفایل
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/orders" onClick={() => setAccountOpen(false)}>
                      <i>receipt_long</i>
                      سفارش‌ها
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/payments"
                      onClick={() => setAccountOpen(false)}
                    >
                      <i>payments</i>
                      پرداخت‌ها
                    </NavLink>
                  </li>

                  <li role="separator" aria-hidden="true">
                    <hr />
                  </li>

                  <li>
                    <button
                      type="button"
                      className="logout-button"
                      onClick={handleLogout}
                    >
                      <i>logout</i> <span>ورود / خروج</span>{" "}
                    </button>
                  </li>
                </menu>
              )}
            </div>
          </div>
          {/* PUSH LOGO TO LEFT */}
          <div className="max" />
          {/* LEFT SIDE LOGO */}
          <NavLink to="/" title={logoTitle} aria-label="صفحه اصلی">
            <img
              className="responsive tiny circle"
              alt="هستان"
              src="/src/assets/logo/hastan_logo.png"
            />
          </NavLink>
        </nav>
      </header>
      {/* LEFT DRAWER */}
      <dialog className="left" open={open}>
        <header>
          <nav>
            <NavLink to="/" title={logoTitle} onClick={() => setOpen(false)}>
              <img src={logo} className="responsive tiny" alt="logo" />
            </NavLink>

            <h6 className="max small">
              زندگی نو <sup className="bold"> هستان </sup>
            </h6>

            <button
              type="button"
              className="transparent circle large"
              onClick={() => setOpen(false)}
              aria-label="بستن منو"
            >
              <i>close</i>
            </button>
          </nav>
        </header>

        <div className="space" />

        <ul className="list">
          <li
            className="wave round"
            dir={style.alignRTL}
            onClick={() => setOpen(false)}
          >
            <NavLink to="/">
              <i>home</i>
              <span className="max">خانه</span>
            </NavLink>
          </li>

          <li
            className="wave round"
            dir={style.alignRTL}
            onClick={() => setOpen(false)}
          >
            <NavLink to="/academy">
              <i>school</i>
              <span>آکادمی</span>
            </NavLink>
          </li>

          <li
            className="wave round"
            dir={style.alignRTL}
            onClick={() => setOpen(false)}
          >
            <NavLink to="/consulting">
              <i>psychology</i>
              <span>مشاوره روانشناسی</span>
            </NavLink>
          </li>

          <li
            className="wave round"
            dir={style.alignRTL}
            onClick={() => setOpen(false)}
          >
            <NavLink to="/products">
              <i>storefront</i>
              <span>محصول ها</span>
            </NavLink>
          </li>

          <div className="space" />

          <hr className="max spav" />

          <div className="space" />

          <li
            className="wave round"
            dir={style.alignRTL}
            onClick={() => setOpen(false)}
          >
            <NavLink to="/about">
              <i>info</i>
              <span>درباره ما</span>
            </NavLink>
          </li>

          <li
            className="wave round"
            dir={style.alignRTL}
            onClick={() => setOpen(false)}
          >
            <NavLink to="/callus">
              <i>call</i>
              <span>تماس با ما</span>
            </NavLink>
          </li>

          <div className="space" />
          <div className="space" />

          <li className="fixed bottom right-align">
            <div className="fixed bottom">
              <h5 className="small right grey-text">گروه نرم افزاری آی دِو</h5>

              <p className="right grey-text" dir="RTL">
                نسخه 0.0.1-β20263107
              </p>
            </div>
          </li>
        </ul>
      </dialog>
    </>
  );
}
