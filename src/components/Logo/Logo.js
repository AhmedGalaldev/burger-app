import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png.png";
import styels from "./Logo.module.css";

const logo = (props) => (
  <div className={styels.Logo}>
    <img src={burgerLogo} alt="BurgerApp"></img>
  </div>
);

export default logo;
