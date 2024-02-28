import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useActions } from '@/hooks/useActions';
import styles from './formRegistration.module.less';
import eyeOpened from '@/assets/eye opened.png';
import eyeClosed from '@/assets/eye closed.png';

const RegistrationSchema = Yup.object().shape({
  email: Yup.string().email('emailNotMasked').required('emailNotFilled'),
  login: Yup.string()
    .min(2, 'loginNotAllowedLegth')
    .max(20, 'loginNotAllowedLegth')
    .matches(/^[aA-zZ]+$/, 'loginNotAllowedSymbols')
    .required('loginNotFilled'),
  password: Yup.string()
    .min(8, 'passwordNotAllowedLegth')
    .max(15, 'passwordNotAllowedLegth')
    .matches(/[a-z]/, 'passwordNotAllowedSymbols')
    .matches(/[A-Z]/, 'passwordNotAllowedSymbols')
    .matches(/\d/, 'passwordNotDigitRequire')
    .matches(/[!@#$%^&*()_=+-]/, 'passwordNotSpecSymbolRequire')
    .matches(/^[aA-zZ\d!@#$%^&*()_=+-]+$/, 'passwordNotAllowedSymbols')
    .required('passwordNotFilled'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'confirmPasswordNotEqual')
    .required('confirmPasswordNotFilled'),
});
const statusObject = {
  emailNotFilled: true,
  emailNotMasked: true,
  loginNotFilled: true,
  loginNotAllowedSymbols: true,
  loginNotAllowedLegth: true,
  passwordNotFilled: true,
  passwordNotAllowedSymbols: true,
  passwordNotAllowedLegth: true,
  passwordNotDigitRequire: true,
  passwordNotSpecSymbolRequire: true,
  confirmPasswordNotFilled: true,
  confirmPasswordNotEqual: true,
};
const setClass = (filled: boolean, err: boolean) => {
  return !filled
    ? styles.helpDisabled
    : err
    ? styles.helpSucces
    : styles.helpError;
};
const FormRegistration = () => {
  const [validateStatus, setValidateStatus] = useState(
    Object.assign({}, statusObject),
  );
  const { registerUser } = useActions();
  const [buttonDisable, setButtonDisable] = useState(true);
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);

  const togglePasswordHandler = () => {
    setTogglePassword((prev) => !prev);
  };
  const toggleConfirmPasswordHandler = () => {
    setToggleConfirmPassword((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      login: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: ({ email, login, password }) => {
      // console.log('email', email, 'login', login, 'password', password);
      registerUser(email, login, password);
    },
  });

  useEffect(() => {
    RegistrationSchema.validate(
      {
        email: formik.values.email,
        login: formik.values.login,
        password: formik.values.password,
        confirmPassword: formik.values.confirmPassword,
      },
      { abortEarly: false },
    )
      .then((valid) => {
        setValidateStatus(Object.assign({}, statusObject));
        setButtonDisable(false);
      })
      .catch((e) => {
        const errors = e.errors;
        const status = Object.assign({}, statusObject);
        type ObjectKey = keyof typeof status;
        errors.forEach((err: string) => {
          const key = err as ObjectKey;
          status[key] = false;
        });
        setValidateStatus(status);
        setButtonDisable(true);
      });
  }, [formik.values]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Создать аккаунт Lorby</h1>
      <form onSubmit={formik.handleSubmit} className={styles.formWrapper}>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="Введи адрес почты"
          onChange={formik.handleChange}
          value={formik.values.email}
          className={styles.input}
        />
        <div
          className={setClass(
            validateStatus.emailNotFilled,
            validateStatus.emailNotMasked,
          )}
        >
          Введите в поле правильную электронную почту
          {validateStatus.emailNotFilled &&
            (validateStatus.emailNotMasked ? '✅' : '❌')}
        </div>

        <input
          id="login"
          name="login"
          type="text"
          placeholder="Придумай логин"
          onChange={formik.handleChange}
          value={formik.values.login}
          className={styles.input}
        />
        <div
          className={setClass(
            validateStatus.loginNotFilled,
            validateStatus.loginNotAllowedLegth,
          )}
        >
          От 2 до 20 символов
          {validateStatus.loginNotFilled &&
            (validateStatus.loginNotAllowedLegth ? '✅' : '❌')}
        </div>
        <div
          className={setClass(
            validateStatus.loginNotFilled,
            validateStatus.loginNotAllowedSymbols,
          )}
        >
          Допустимы только буквы английского алфавита{' '}
          {validateStatus.loginNotFilled &&
            (validateStatus.loginNotAllowedSymbols ? '✅' : '❌')}
        </div>
        <div className={styles.inputWrapper}>
          {' '}
          <input
            id="password"
            name="password"
            type={togglePassword ? 'text' : 'password'}
            placeholder="Создай пароль"
            onChange={formik.handleChange}
            value={formik.values.password}
            className={styles.input}
          />
          <button
            type="button"
            onClick={togglePasswordHandler}
            className={styles.eyeImg}
          >
            <img src={togglePassword ? eyeClosed : eyeOpened} alt="" />
          </button>
        </div>

        <div
          className={setClass(
            validateStatus.passwordNotFilled,
            validateStatus.passwordNotAllowedLegth,
          )}
        >
          От 8 до 15 символов
          {validateStatus.passwordNotFilled &&
            (validateStatus.passwordNotAllowedLegth ? '✅' : '❌')}
        </div>
        <div
          className={setClass(
            validateStatus.passwordNotFilled,
            validateStatus.passwordNotAllowedSymbols,
          )}
        >
          Строчные и прописные буквы
          {validateStatus.passwordNotFilled &&
            (validateStatus.passwordNotAllowedSymbols ? '✅' : '❌')}
        </div>
        <div
          className={setClass(
            validateStatus.passwordNotFilled,
            validateStatus.passwordNotDigitRequire,
          )}
        >
          Минимум 1 цифра
          {validateStatus.passwordNotFilled &&
            (validateStatus.passwordNotDigitRequire ? '✅' : '❌')}
        </div>
        <div
          className={setClass(
            validateStatus.passwordNotFilled,
            validateStatus.passwordNotSpecSymbolRequire,
          )}
        >
          Минимум 1 спецсимвол (!,",#,$...)
          {validateStatus.passwordNotFilled &&
            (validateStatus.passwordNotSpecSymbolRequire ? '✅' : '❌')}
        </div>
        <div className={styles.inputWrapper}>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={toggleConfirmPassword ? 'text' : 'password'}
            placeholder="Повтори пароль"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            className={styles.input}
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordHandler}
            className={styles.eyeImg}
          >
            <img src={toggleConfirmPassword ? eyeClosed : eyeOpened} alt="" />
          </button>
        </div>

        <div
          className={setClass(
            validateStatus.confirmPasswordNotFilled,
            validateStatus.confirmPasswordNotEqual,
          )}
        >
          Пароли не совпадают
          {validateStatus.confirmPasswordNotFilled &&
            (validateStatus.confirmPasswordNotEqual ? '✅' : '❌')}
        </div>

        <button
          disabled={buttonDisable}
          type="submit"
          className={styles.button}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormRegistration;
