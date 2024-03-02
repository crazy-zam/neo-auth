import React from 'react';
import { Link } from 'react-router-dom';
import FormRegistration from '@/components/FormRegistration/FormRegistration';
import EmailValidateMessage from '@/components/EmailValidateMessage/EmailValidateMessage';
import mainLogo from '@/assets/main logo.png';
import arrowBack from '@/assets/arrow back.png';
import styles from './register.module.less';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const Register = () => {
  const registrationStatus = useTypedSelector(
    (state) => state.registration.status,
  );

  return (
    <div className={styles.page}>
      <Link to="/auth/login" className={styles.link}>
        <img src={arrowBack} alt="" />
        Назад
      </Link>
      <img src={mainLogo} alt="" className={styles.img} />
      {registrationStatus === 'success' ? (
        <EmailValidateMessage></EmailValidateMessage>
      ) : (
        <FormRegistration></FormRegistration>
      )}

      {/* <EmailValidateMessage></EmailValidateMessage>

      <FormRegistration></FormRegistration> */}
    </div>
  );
};

export default Register;
