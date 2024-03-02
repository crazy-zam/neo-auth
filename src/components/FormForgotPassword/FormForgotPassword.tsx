import React from 'react';
import { useFormik } from 'formik';
import styles from './formForgotPassword.module.less';

const FormForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      type: '',
      string: '',
    },

    onSubmit: ({ type, string }) => {},
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.formWrapper}>
      <div className={styles.header}>Восстановление пароля!</div>
      <select className={styles.select} name="" id="">
        <option value="" hidden disabled selected>
          Выберите почту или имя пользователя
        </option>
        <option value="email" className={styles.option}>
          Email
        </option>
        <option value="username" className={styles.option}>
          Username
        </option>
      </select>
      <input
        id="string"
        name="string"
        type="text"
        placeholder="Введи почту или логин"
        onChange={formik.handleChange}
        value={formik.values.string}
        className={styles.input}
      />
      <button className={styles.btn}>Запросить сброс пароля</button>
      <div className={styles.footer}>
        Письмо с инструкцией по сбросу пароля придет вам на почту
      </div>
    </form>
  );
};

export default FormForgotPassword;
