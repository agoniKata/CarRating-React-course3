import React from "react";
import { Link } from "react-router-dom";
import styles from "./HeaderStyle.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <h5>Car List</h5>
        </Link>
      </div>
    </div>
  );
};

export default Header;
