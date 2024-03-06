import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useActions } from '@/hooks/useActions';
import eyeOpened from '@/assets/eye opened.png';
import eyeClosed from '@/assets/eye closed.png';
import styles from './formLogin.module.less';

const FormLogin = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const togglePasswordHandler = () => {
    setTogglePassword((prev) => !prev);
  };
  const [btnDisabled, setBtnDisabled] = useState(true);
  const { userLoginAction } = useActions();
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },

    onSubmit: ({ login, password }) => {
      userLoginAction(login, password);
    },
  });
  useEffect(() => {
    setBtnDisabled(!formik.values.login || !formik.values.password);
  }, [formik.values]);
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Вэлком бэк!</h1>
      <form onSubmit={formik.handleSubmit} className={styles.formWrapper}>
        <input
          id="login"
          name="login"
          type="text"
          placeholder="Введи туда-сюда логин"
          onChange={formik.handleChange}
          value={formik.values.login}
          className={styles.input}
        />

        <div className={styles.inputWrapper}>
          <input
            id="password"
            name="password"
            type={togglePassword ? 'text' : 'password'}
            placeholder="Пароль (тоже введи)"
            onChange={formik.handleChange}
            value={formik.values.password}
            className={styles.input}
          />
          <button
            type="button"
            onClick={togglePasswordHandler}
            className={styles.eyeImg}
          >
            <img src={togglePassword ? eyeClosed : eyeOpened} alt="" />
          </button>
        </div>
        <button className={styles.button} type="submit" disabled={btnDisabled}>
          Войти
        </button>
      </form>
    </div>
  );
};

export default FormLogin;
