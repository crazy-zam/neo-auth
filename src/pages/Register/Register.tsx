import React from 'react';
import { Link } from 'react-router-dom';
import FormRegistration from '@/components/FormRegistration/FormRegistration';
import EmailValidateMessage from '@/components/EmailValidateMessage/EmailValidateMessage';
import mainLogo from '@/assets/main logo.png';
import arrowBack from '@/assets/arrow back.png';
import styles from './register.module.less';

const Register = () => {
  return (
    <div className={styles.page}>
      <Link to="/" className={styles.link}>
        <img src={arrowBack} alt="" />
        Назад
      </Link>
      <img src={mainLogo} alt="" className={styles.img} />
      <FormRegistration></FormRegistration>
      <EmailValidateMessage></EmailValidateMessage>
    </div>
  );
};

export default Register;
