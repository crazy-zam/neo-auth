import React, { useEffect, useState } from 'react';
import styles from './emailValidate.module.less';
import { useNavigate, useSearchParams } from 'react-router-dom';
import mainLogo from '@/assets/main logo.png';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import MyModal from '@/components/MyModal/MyModal';
import CountdownTimer from '@/components/CountdownTimer/CountdownTimer';
import { sendValidateEmailAPI } from '@/api/api';

const EmailValidate = () => {
  const [params, setParams] = useSearchParams();
  const token = params.get('ct');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const { emailValidated, status } = useTypedSelector(
    (state) => state.registration,
  );

  const { email, username } = useTypedSelector(
    (state) => state.registration.user,
  );
  const { validateEmail } = useActions();
  const navigate = useNavigate();
  const navigateHandler = () => navigate('/auth/login');
  useEffect(() => {
    validateEmail(token);
  }, []);
  useEffect(() => {
    console.log('first');
    setModalIsOpen(true);
  }, [emailValidated, status]);

  return (
    <div className={styles.page}>
      <img className={styles.img} src={mainLogo} alt="company logo" />
      <div className={styles.text}>
        Мы отправили запрос для подтверждения вашей электронной почты, как
        только получим ответ, перенаправим вас на страницу для входа.
      </div>
      <MyModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        {emailValidated ? (
          <>
            <div className={styles.counterHead}>
              Поздравляем вы подтвердили вашу электронную почту!
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
              Ссылка для подтверждения почты устарела!
            </div>
            <div>
              Возможно вы отправили запрос повторно, проверьте вашу почту, или
              запросите письмо подтверждение потворно, нажав на кнопку внизу.
            </div>
            <button
              className={styles.counterBtn}
              onClick={() => sendValidateEmailAPI(email, username)}
            >
              Запросить письмо повторно
            </button>
          </>
        )}
      </MyModal>
    </div>
  );
};

export default EmailValidate;
