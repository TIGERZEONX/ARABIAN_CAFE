import { useState } from "react";
import { Link } from "react-router-dom";

import AuthTemplate from "@/components/templates/AuthTemplate";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

import useLogin from "@/hooks/useLogin";

import styles from "./Login.module.css";

export default function Login() {

  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  const {
    login,
    loading,
    error,
  } = useLogin();

  const handleChange =
    (field) =>
    (e) => {

      setForm({
        ...form,
        [field]:
          e.target.value,
      });

    };

  const handleLogin =
    async (e) => {

      e.preventDefault();

      const result =
        await login(
          form
        );

      console.log(
        result
      );

    };

  return (

    <AuthTemplate>

      <div className={styles.container}>

        <div className={styles.logo}>
          ArabianCafe
        </div>

        <div className={styles.subtitle}>
          Super Admin
        </div>

        <form
          className={styles.form}
          onSubmit={
            handleLogin
          }
        >

          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={
              handleChange(
                "email"
              )
            }
          />

          <Input
            label="Password"
            type="password"
            value={
              form.password
            }
            onChange={
              handleChange(
                "password"
              )
            }
          />

          {error && (
            <div
              className={
                styles.error
              }
            >
              {error}
            </div>
          )}

          <Button
            type="submit"
            label={
              loading
                ? "Loading..."
                : "Login"
            }
          />

        </form>

      </div>
        <div className={styles.register}>

    Not registered?

    <Link to="/register">

    Create Account

    </Link>

    </div>

    </AuthTemplate>

  );

}
