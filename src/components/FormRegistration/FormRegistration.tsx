import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useActions } from '@/hooks/useActions';
import Loader from '@/UI/Loader/Loader';
import styles from './formRegistration.module.less';
import eyeOpened from '@/assets/eye opened.png';
import eyeClosed from '@/assets/eye closed.png';
import ValidateError from '@/UI/ValidateError/ValidateError';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useDebounce } from '@/hooks/useDebounce';
import {
  usernameSchema,
  emailSchema,
  passwordSchema,
  confirmPasswordSchema,
} from '@/utils/validation/schemes';
import {
  emailStatusObject,
  passwordStatusObject,
  usernameStatusObject,
  confirmPasswordStatusObject,
} from '@/utils/validation/defaultStatus';

const FormRegistration = () => {
  const newPasswordSchema = passwordSchema.concat(confirmPasswordSchema);
  const newPasswordStatusObject = Object.assign(
    {},
    passwordStatusObject,
    confirmPasswordStatusObject,
  );
  const [emailValidateStatus, setEmailValidateStatus] = useState(
    Object.assign({}, emailStatusObject),
  );
  const [usernameValidateStatus, setUsernameValidateStatus] = useState(
    Object.assign({}, usernameStatusObject),
  );
  const [passwordValidateStatus, setPasswordValidateStatus] = useState(
    Object.assign({}, newPasswordStatusObject),
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
  const createSchema = (
    schema: Yup.ObjectSchema<{}, Yup.AnyObject, {}, ''>,
    statusObj: any,
    setState: any,
    value: any,
  ) => {
    return () => {
      schema
        .validate(value, { abortEarly: false })
        .then(() => {
          const status = Object.assign({}, statusObj);
          status.errors = false;
          setState(status);
        })
        .catch((e) => {
          const errors = e.errors;
          const status = Object.assign({}, statusObj);
          type ObjectKey = keyof typeof status;
          errors.forEach((err: string) => {
            const key = err as ObjectKey;
            status[key] = false;
          });
          status.errors = true;
          setState(status);
        });
    };
  };
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

  useEffect(
    createSchema(emailSchema, emailStatusObject, setEmailValidateStatus, {
      email: formik.values.email,
    }),
    [formik.values.email],
  );
  useEffect(
    createSchema(
      usernameSchema,
      usernameStatusObject,
      setUsernameValidateStatus,
      { username: formik.values.username },
    ),
    [formik.values.username],
  );

  useEffect(
    createSchema(
      newPasswordSchema,
      newPasswordStatusObject,
      setPasswordValidateStatus,
      {
        password: formik.values.password,
        confirmPassword: formik.values.confirmPassword,
      },
    ),
    [formik.values.password, formik.values.confirmPassword],
  );

  useEffect(() => {
    setButtonDisable(
      emailValidateStatus.errors ||
        usernameValidateStatus.errors ||
        passwordValidateStatus.errors ||
        checkUsernameStatus.error !== '' ||
        checkEmailStatus.error !== '' ||
        checkEmailStatus.loading ||
        checkUsernameStatus.loading,
    );
  }, [
    emailValidateStatus.errors,
    usernameValidateStatus.errors,
    passwordValidateStatus.errors,
    checkUsernameStatus,
    checkEmailStatus,
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
        <ValidateError
          empty={emailValidateStatus.emailNotFilled}
          error={emailValidateStatus.emailNotMasked}
          text={'Введите в поле правильную электронную почту'}
        />

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
        <ValidateError
          empty={usernameValidateStatus.usernameNotFilled}
          error={usernameValidateStatus.usernameNotAllowedLegth}
          text={'От 6 до 20 символов '}
        />
        <ValidateError
          empty={usernameValidateStatus.usernameNotFilled}
          error={usernameValidateStatus.usernameNotAllowedSymbols}
          text={'Допустимы только буквы английского алфавита '}
        />

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
        <ValidateError
          empty={passwordValidateStatus.passwordNotFilled}
          error={passwordValidateStatus.passwordNotAllowedLegth}
          text={'От 8 до 15 символов '}
        />
        <ValidateError
          empty={passwordValidateStatus.passwordNotFilled}
          error={passwordValidateStatus.passwordNotAllowedSymbols}
          text={'Строчные и прописные буквы '}
        />
        <ValidateError
          empty={passwordValidateStatus.passwordNotFilled}
          error={passwordValidateStatus.passwordNotDigitRequire}
          text={'Минимум 1 цифра '}
        />
        <ValidateError
          empty={passwordValidateStatus.passwordNotFilled}
          error={passwordValidateStatus.passwordNotSpecSymbolRequire}
          text={'Минимум 1 спецсимвол (!,",#,$...) '}
        />

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
        <ValidateError
          empty={passwordValidateStatus.confirmPasswordNotFilled}
          error={passwordValidateStatus.confirmPasswordNotEqual}
          text={'Пароли не совпадают '}
        />

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
