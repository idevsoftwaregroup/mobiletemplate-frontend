import { useState } from "react";
import logo from "../assets/mainlogo.png";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const style = {
    dirRTL: "RTL",
    dirLTR: "LTr",
    bottom: "bottom",
    large: "large",
  };

  return (
    <>
      <header className="fixed medium-padding">
        <nav>
          <h6 className="max">
            <a href="/">
              <img src={logo} className="large" />
            </a>
          </h6>

          <button className="circle transparent large">
            <i className={`${style.large}`}>account_circle</i>
          </button>
          <menu className="gray-container">
            <li>دوره ها</li>
            <li>پروژه ها</li>
            <li>درباره ما</li>
          </menu>

          <a href="tel:+989024276771" className="circle transparent large">
            <i className={`${style.large}`}>call</i>
          </a>
        </nav>
      </header>

      <nav className={`${style.bottom}`} dir={style.dirRTL}>
        <a
          className={active === "home" ? "active" : ""}
          onClick={() => setActive("home")}
        >
          <i>home</i>
          <span>خانه</span>
        </a>

        <a
          className={active === "users" ? "active" : ""}
          onClick={() => setActive("users")}
        >
          <i>groups</i>
          <span>آکادمی</span>
        </a>

        <a
          className={active === "forms" ? "active" : ""}
          onClick={() => setActive("forms")}
        >
          <i>description</i>
          <span>مشاوره</span>
        </a>

        <a
          className={active === "settings" ? "active" : ""}
          onClick={() => setActive("settings")}
        >
          <i>settings</i>
          <span>پروژه ها</span>
        </a>
      </nav>
    </>
  );
}
