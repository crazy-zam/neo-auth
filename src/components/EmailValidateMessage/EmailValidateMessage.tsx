import React from 'react';
import styles from './emailValidateMessage.module.less';

const EmailValidateMessage = () => {
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
      <button className={styles.button}>Письмо не пришло</button>
    </div>
  );
};

export default EmailValidateMessage;
