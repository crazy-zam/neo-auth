import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useActions } from '@/hooks/useActions';
import Loader from '@/UI/Loader/Loader';
import styles from './formRegistration.module.less';
import eyeOpened from '@/assets/eye opened.png';
import eyeClosed from '@/assets/eye closed.png';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useDebounce } from '@/hooks/useDebounce';

const usernameSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, 'usernameNotAllowedLegth')
    .max(20, 'usernameNotAllowedLegth')
    .matches(/^[aA-zZ]+$/, 'usernameNotAllowedSymbols')
    .required('usernameNotFilled'),
});
const emailSchema = Yup.object().shape({
  email: Yup.string()
    .email('emailNotMasked')
    .matches(/\./, 'emailNotMasked')
    .required('emailNotFilled'),
});
const passwordSchema = Yup.object().shape({
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
const emailStatusObject = {
  emailNotFilled: true,
  emailNotMasked: true,
  errors: true,
};
const usernameStatusObject = {
  usernameNotFilled: true,
  usernameNotAllowedSymbols: true,
  usernameNotAllowedLegth: true,
  errors: true,
};
const passwordStatusObject = {
  passwordNotFilled: true,
  passwordNotAllowedSymbols: true,
  passwordNotAllowedLegth: true,
  passwordNotDigitRequire: true,
  passwordNotSpecSymbolRequire: true,
  confirmPasswordNotFilled: true,
  confirmPasswordNotEqual: true,
  errors: true,
};
const setClass = (filled: boolean, err: boolean) => {
  return !filled
    ? styles.helpDisabled
    : err
    ? styles.helpSucces
    : styles.helpError;
};
const FormRegistration = () => {
  const [emailValidateStatus, setEmailValidateStatus] = useState(
    Object.assign({}, emailStatusObject),
  );
  const [usernameValidateStatus, setUsernameValidateStatus] = useState(
    Object.assign({}, usernameStatusObject),
  );
  const [passwordValidateStatus, setPasswordValidateStatus] = useState(
    Object.assign({}, passwordStatusObject),
  );
  const [buttonDisable, setButtonDisable] = useState(true);
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
  const { registerUser, checkEmail, checkUsername } = useActions();

  const togglePasswordHandler = () => {
    setTogglePassword((prev) => !prev);
  };
  const toggleConfirmPasswordHandler = () => {
    setToggleConfirmPassword((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: ({ email, username, password }) => {
      registerUser(email, username, password);
    },
  });
  const checkEmailStatus = useTypedSelector((state) => state.checkUser.email);
  const checkUsernameStatus = useTypedSelector(
    (state) => state.checkUser.username,
  );
  const debounceEmailCheck = useDebounce((val) => {
    checkEmail(val);
  }, 500);
  const debounceUsernameCheck = useDebounce((val) => {
    checkUsername(val);
  }, 500);

  useEffect(() => {
    if (!usernameValidateStatus.errors) {
      debounceUsernameCheck(formik.values.username);
    }
  }, [usernameValidateStatus]);

  useEffect(() => {
    if (!emailValidateStatus.errors) {
      debounceEmailCheck(formik.values.email);
    }
  }, [emailValidateStatus]);

  useEffect(() => {
    emailSchema
      .validate({ email: formik.values.email }, { abortEarly: false })
      .then(() => {
        const emailStatus = Object.assign({}, emailStatusObject);
        emailStatus.errors = false;
        setEmailValidateStatus(emailStatus);
      })
      .catch((e) => {
        const errors = e.errors;
        const emailStatus = Object.assign({}, emailStatusObject);
        type ObjectKey = keyof typeof emailStatus;
        errors.forEach((err: string) => {
          const key = err as ObjectKey;
          emailStatus[key] = false;
        });
        emailStatus.errors = true;
        setEmailValidateStatus(emailStatus);
      });
  }, [formik.values.email]);
  useEffect(() => {
    usernameSchema
      .validate({ username: formik.values.username }, { abortEarly: false })
      .then(() => {
        const usernameStatus = Object.assign({}, usernameStatusObject);
        usernameStatus.errors = false;
        setUsernameValidateStatus(usernameStatus);
      })
      .catch((e) => {
        const errors = e.errors;
        const usernameStatus = Object.assign({}, usernameStatusObject);
        type ObjectKey = keyof typeof usernameStatus;
        errors.forEach((err: string) => {
          const key = err as ObjectKey;
          usernameStatus[key] = false;
        });
        usernameStatus.errors = true;
        setUsernameValidateStatus(usernameStatus);
      });
  }, [formik.values.username]);
  useEffect(() => {
    passwordSchema
      .validate(
        {
          password: formik.values.password,
          confirmPassword: formik.values.confirmPassword,
        },
        { abortEarly: false },
      )
      .then(() => {
        const passwordStatus = Object.assign({}, passwordStatusObject);
        passwordStatus.errors = false;
        setPasswordValidateStatus(passwordStatus);
      })
      .catch((e) => {
        const errors = e.errors;
        const passwordStatus = Object.assign({}, passwordStatusObject);
        type ObjectKey = keyof typeof passwordStatus;
        errors.forEach((err: string) => {
          const key = err as ObjectKey;
          passwordStatus[key] = false;
        });
        passwordStatus.errors = true;
        setPasswordValidateStatus(passwordStatus);
      });
  }, [formik.values.password, formik.values.confirmPassword]);

  useEffect(() => {
    if (
      !emailValidateStatus.errors &&
      !usernameValidateStatus.errors &&
      !passwordValidateStatus.errors &&
      checkUsernameStatus.error === '' &&
      checkEmailStatus.error === ''
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [
    emailValidateStatus.errors,
    usernameValidateStatus.errors,
    passwordValidateStatus.errors,
    checkUsernameStatus.error,
    checkEmailStatus.error,
  ]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Создать аккаунт Lorby</h1>
      <form onSubmit={formik.handleSubmit} className={styles.formWrapper}>
        <div className={styles.inputWrapper}>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Введи адрес почты"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            value={formik.values.email}
            className={styles.input}
          />
          <div className={styles.loader}>
            {checkEmailStatus.loading ? (
              <Loader />
            ) : (
              !checkEmailStatus.error && checkEmailStatus.checked && '✅'
            )}
          </div>
          {checkEmailStatus.error && (
            <div className={styles.checkError}>
              {checkEmailStatus.error !== '' &&
                'Эта почта уже зарегистрирована'}
            </div>
          )}
        </div>

        <div
          className={setClass(
            emailValidateStatus.emailNotFilled,
            emailValidateStatus.emailNotMasked,
          )}
        >
          Введите в поле правильную электронную почту
          {emailValidateStatus.emailNotFilled &&
            (emailValidateStatus.emailNotMasked ? '✅' : '❌')}
        </div>
        <div className={styles.inputWrapper}>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Придумай логин"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            value={formik.values.username}
            className={styles.input}
          />
          <div className={styles.loader}>
            {checkUsernameStatus.loading ? (
              <Loader />
            ) : (
              !checkUsernameStatus.error && checkUsernameStatus.checked && '✅'
            )}
          </div>
          {checkUsernameStatus.error && (
            <div className={styles.checkError}>
              {!!checkUsernameStatus.error && 'Это имя пользователя уже занято'}
            </div>
          )}
        </div>

        <div
          className={setClass(
            usernameValidateStatus.usernameNotFilled,
            usernameValidateStatus.usernameNotAllowedLegth,
          )}
        >
          От 6 до 20 символов
          {usernameValidateStatus.usernameNotFilled &&
            (usernameValidateStatus.usernameNotAllowedLegth ? '✅' : '❌')}
        </div>
        <div
          className={setClass(
            usernameValidateStatus.usernameNotFilled,
            usernameValidateStatus.usernameNotAllowedSymbols,
          )}
        >
          Допустимы только буквы английского алфавита{' '}
          {usernameValidateStatus.usernameNotFilled &&
            (usernameValidateStatus.usernameNotAllowedSymbols ? '✅' : '❌')}
        </div>
        <div className={styles.inputWrapper}>
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
            passwordValidateStatus.passwordNotFilled,
            passwordValidateStatus.passwordNotAllowedLegth,
          )}
        >
          От 8 до 15 символов
          {passwordValidateStatus.passwordNotFilled &&
            (passwordValidateStatus.passwordNotAllowedLegth ? '✅' : '❌')}
        </div>
        <div
          className={setClass(
            passwordValidateStatus.passwordNotFilled,
            passwordValidateStatus.passwordNotAllowedSymbols,
          )}
        >
          Строчные и прописные буквы
          {passwordValidateStatus.passwordNotFilled &&
            (passwordValidateStatus.passwordNotAllowedSymbols ? '✅' : '❌')}
        </div>
        <div
          className={setClass(
            passwordValidateStatus.passwordNotFilled,
            passwordValidateStatus.passwordNotDigitRequire,
          )}
        >
          Минимум 1 цифра
          {passwordValidateStatus.passwordNotFilled &&
            (passwordValidateStatus.passwordNotDigitRequire ? '✅' : '❌')}
        </div>
        <div
          className={setClass(
            passwordValidateStatus.passwordNotFilled,
            passwordValidateStatus.passwordNotSpecSymbolRequire,
          )}
        >
          Минимум 1 спецсимвол (!,",#,$...)
          {passwordValidateStatus.passwordNotFilled &&
            (passwordValidateStatus.passwordNotSpecSymbolRequire ? '✅' : '❌')}
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
            passwordValidateStatus.confirmPasswordNotFilled,
            passwordValidateStatus.confirmPasswordNotEqual,
          )}
        >
          Пароли не совпадают
          {passwordValidateStatus.confirmPasswordNotFilled &&
            (passwordValidateStatus.confirmPasswordNotEqual ? '✅' : '❌')}
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
