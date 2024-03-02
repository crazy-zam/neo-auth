import React, { useEffect, useState } from 'react';
import styles from './forgotPassword.module.less';
import { useNavigate, useSearchParams } from 'react-router-dom';
import mainLogo from '@/assets/main logo.png';
import { useFormik } from 'formik';
import MyModal from '@/components/MyModal/MyModal';
import CountdownTimer from '@/components/CountdownTimer/CountdownTimer';
import { resetPasswordAPI } from '@/api/api';

const ForgotPassword = () => {
  const [params, setParams] = useSearchParams();
  const token = params.get('rpt');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [passwordConfirmed, setPasswordConfirmed] = useState('');
  const formik = useFormik({
    initialValues: {
      password: '',
    },

    onSubmit: ({ password }) => {
      try {
        resetPasswordAPI(password, token);
        setPasswordConfirmed('success');
      } catch (error) {
        setPasswordConfirmed(error);
      }
    },
  });
  const navigate = useNavigate();
  const navigateHandler = () => navigate('/auth/login');

  return (
    <div className={styles.page}>
      <img className={styles.img} src={mainLogo} alt="company logo" />
      <div className={styles.side}>
        <h1 className={styles.title}>Восстановление пароля</h1>
        <div className={styles.text}>
          Чтобы установить новый пароль, введите его в поле ниже и нажмите
          отправить!
        </div>
        <input
          id="password"
          name="password"
          type="text"
          placeholder="Введи пароль, только запомни его"
          onChange={formik.handleChange}
          value={formik.values.password}
          className={styles.input}
        />
        <button className={styles.btn}>Установить новый пароль</button>
        <MyModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
          {passwordConfirmed === 'success' ? (
            <>
              <div className={styles.counterHead}>
                Поздравляем вы успешно установили новый пароль!
              </div>
              <CountdownTimer
                className={styles.counter}
                timer={10}
                text={'Вы будете перенаправлены на страницу для входа через'}
                handler={navigateHandler}
              ></CountdownTimer>
              <button className={styles.counterBtn} onClick={navigateHandler}>
                Перейти на страницу для входа
              </button>
            </>
          ) : (
            <>
              <div className={styles.counterHead}>
                Ссылка для изменения пароля устарела!
              </div>
              <div>
                Возможно вы отправили запрос повторно, проверьте вашу почту, или
                же запросите письмо для сброса пароля повторно перейдя на
                страницу входа.
              </div>
              <button className={styles.counterBtn} onClick={navigateHandler}>
                Запросить письмо повторно
              </button>
            </>
          )}
        </MyModal>
      </div>
    </div>
  );
};

export default ForgotPassword;
