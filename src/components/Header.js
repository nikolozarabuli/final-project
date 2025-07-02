import React from "react";
import { Link } from "react-router-dom";
import ThemeToggler from "./ThemeToggler";
import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <ThemeToggler />
    </header>
  );
}


export default Header;