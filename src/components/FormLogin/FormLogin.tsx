import React, { useState } from 'react';
import { useFormik } from 'formik';

import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useActions } from '@/hooks/useActions';
import eyeOpened from '@/assets/eye opened.png';
import eyeClosed from '@/assets/eye closed.png';
import styles from './formLogin.module.less';

const SignupSchema = Yup.object().shape({
  login: Yup.string().required('loginNotFilled'),
  password: Yup.string().required('passwordNotFilled'),
});
const errorNotify = (mess: string) =>
  toast.error(mess, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    style: { border: '2px solid red', color: 'red', width: '650px' },
    closeButton: false,
  });

const FormLogin = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const togglePasswordHandler = () => {
    setTogglePassword((prev) => !prev);
  };
  const { userLoginAction } = useActions();
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },

    onSubmit: ({ login, password }) => {
      const loginRegex = new RegExp(/^[aA-zZ]+$/);
      const passwordRegex = new RegExp(/^[aA-zZ\d!@#$%^&*()_=+-]+$/);
      if (!loginRegex.test(login))
        errorNotify(
          'Проверьте правильность ввода логина (только буквы английского алфавита)',
        );
      if (!passwordRegex.test(password))
        errorNotify(
          'Проверьте правильность ввода пароля(только буквы английского алфавита, цифры и спецсимволы)',
        );
      userLoginAction(login, password);
    },
    validationSchema: SignupSchema,
  });
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

        <button className={styles.button} type="submit">
          Войти
        </button>
      </form>
    </div>
  );
};

export default FormLogin;
