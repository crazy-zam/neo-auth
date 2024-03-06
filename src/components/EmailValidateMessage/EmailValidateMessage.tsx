import styles from './emailValidateMessage.module.less';
import MyModal from '@/components/MyModal/MyModal';

import { useState } from 'react';
import { sendValidateEmailAPI } from '@/api/api';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import CountdownTimer from '@/components/CountdownTimer/CountdownTimer';

const EmailValidateMessage = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const { resetRegistration, resetCheck } = useActions();
  const { email, username } = useTypedSelector(
    (state) => state.registration.user,
  );
  const closeModalHandler = () => {
    setModalIsOpen(false);
  };
  const sendEmail = () => {
    sendValidateEmailAPI(email, username);
    setModalIsOpen(true);
  };
  const resetRegistrationHandler = () => {
    resetRegistration();
    resetCheck();
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.bold}>
        Выслали письмо со ссылкой для завершения регистрации на к вам на почту
      </div>
      <div className={styles.normal}>
        Если письмо не пришло, не спеши ждать совиную почту - лучше
        <b> проверь ящик “Спам”</b>
      </div>
      <div className={styles.bold}>(´｡• ω •｡`)</div>
      {!modalIsOpen ? (
        <CountdownTimer
          className={styles.counter}
          timer={15}
          text={
            'Вы сможете запросить письмо подвтерждения вашей электронной почты повторно'
          }
        >
          <button className={styles.button} onClick={sendEmail}>
            Нажми сюда, чтобы получить еще одно письмо!
          </button>
        </CountdownTimer>
      ) : (
        <div className={styles.counter}></div>
      )}
      <button
        className={styles.resetBtn}
        type="button"
        onClick={resetRegistrationHandler}
      >
        Нажмите на эту кнопку, если хотите сбросить все данные о вашей
        регистрации из текущего сеанса
      </button>

      <MyModal isOpen={modalIsOpen} onClose={closeModalHandler}>
        <div className={styles.modalBold}>
          Мы выслали еще одно письмо на указанную тобой почту
        </div>
        <div className={styles.modalNormal}>
          Не забудь проверить ящик “Спам”!11!!!!
        </div>
        <button className={styles.modalBtn} onClick={closeModalHandler}>
          Понятно!!1!
        </button>
      </MyModal>
    </div>
  );
};

export default EmailValidateMessage;
