import styles from './emailValidateMessage.module.less';
import MyModal from '@/components/MyModal/MyModal';

import { useEffect, useState } from 'react';
import { sendValidateEmailAPI } from '@/api/api';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import CountdownTimer from '@/components/CountdownTimer/CountdownTimer';

const EmailValidateMessage = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [timer, setTimer] = useState(15);
  const { email } = useTypedSelector((state) => state.registration.user);
  const closeModalHandler = () => {
    setModalIsOpen(false);
  };
  const sendEmail = () => {
    sendValidateEmailAPI(email);
    setModalIsOpen(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.bold}>
        Выслали письмо со ссылкой для завершения регистрации на
        example@gmail.com
      </div>
      <div className={styles.normal}>
        Если письмо не пришло, не спеши ждать совиную почту - лучше
        <b> проверь ящик “Спам”</b>
      </div>
      <div className={styles.bold}>(´｡• ω •｡`)</div>

      {!modalIsOpen ? (
        <CountdownTimer
          className={styles.counter}
          timer={timer}
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

      <MyModal isOpen={modalIsOpen} onClose={closeModalHandler}>
        <div className={styles.modalBold}>
          Мы выслали еще одно письмо на указанную тобой почту example@gmail.com
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
