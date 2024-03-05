import React from 'react';
import { useFormik } from 'formik';
import styles from './formForgotPassword.module.less';
import { forgotPasswordAPI } from '@/api/api';

interface Values {
  string: string;
}
const FormForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      string: '',
    },

    onSubmit: (values: Values) => {
      forgotPasswordAPI(values.string);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.formWrapper}>
      <div className={styles.header}>Восстановление пароля!</div>
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
