import { useFormik } from 'formik';
import styles from './formForgotPassword.module.less';
import { forgotPasswordAPI } from '@/api/api';
import MyModal from '@/components/MyModal/MyModal';
import { useState } from 'react';
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
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const closeModalHandler = () => {
    setModalIsOpen(false);
  };
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
      <MyModal isOpen={modalIsOpen} onClose={closeModalHandler}>
        <div className={styles.modalBold}>
          Мы выслали письмо с инструкцией по сбросу пароля вам на почту
        </div>
        <div className={styles.modalNormal}>
          Не забудь проверить ящик “Спам”!11!!!!
        </div>
        <button className={styles.modalBtn} onClick={closeModalHandler}>
          Понятно!!1!
        </button>
      </MyModal>
    </form>
  );
};

export default FormForgotPassword;
