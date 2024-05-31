import React, { useRef, useState } from "react";
import styles from "./LoginPageStyle.module.css";
import { Navigate } from "react-router-dom";
import { userData } from "../../data";

function LoginPage() {
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(null);

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const user = userData.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      if (user.user === "admin") {
        setRedirect("/imageList");
      } else {
        setRedirect("/home");
      }
    } else {
      setError("Неверный email или пароль");
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className={styles.loginBox}>
      <div className={styles.loginHeader}>
        <header>Вход</header>
      </div>
      <form onSubmit={handleLogin}>
        <div className={styles.inputBox}>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Email"
            autoComplete="off"
            ref={emailRef}
            required
          />
        </div>
        <div className={styles.inputBox}>
          <input
            type="password"
            className={styles.inputField}
            placeholder="Пароль"
            autoComplete="off"
            ref={passwordRef}
            required
          />
        </div>
        <div className={styles.forgot}>
          <section>
            <input type="checkbox" id="check" />
            <label htmlFor="check">Запомнить меня</label>
          </section>
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.inputSubmit}>
          <button type="submit" className={styles.submitBtn}>
            Войти
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
