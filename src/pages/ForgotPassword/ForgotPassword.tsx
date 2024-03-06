import { useEffect, useState } from 'react';
import styles from './forgotPassword.module.less';
import { useNavigate, useSearchParams } from 'react-router-dom';
import mainLogo from '@/assets/main logo.png';
import { useFormik } from 'formik';
import MyModal from '@/components/MyModal/MyModal';
import CountdownTimer from '@/components/CountdownTimer/CountdownTimer';
import { resetPasswordAPI } from '@/api/api';
import { passwordSchema } from '@/utils/validation/schemes';
import * as Yup from 'yup';
import { passwordStatusObject } from '@/utils/validation/defaultStatus';
import ValidateError from '@/UI/ValidateError/ValidateError';

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

const ForgotPassword = () => {
  const [params, setParams] = useSearchParams();
  const token = params.get('rpt');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [passwordConfirmed, setPasswordConfirmed] = useState('');
  const [passwordValidateStatus, setPasswordValidateStatus] = useState(
    Object.assign({}, passwordStatusObject),
  );
  const [btnDisabled, setBtnDisabled] = useState(true);
  const formik = useFormik({
    initialValues: {
      password: '',
    },

    onSubmit: async ({ password }) => {
      try {
        await resetPasswordAPI(password, token);
        setPasswordConfirmed('success');
        setModalIsOpen(true);
      } catch (error) {
        setPasswordConfirmed(error);
      } finally {
        setModalIsOpen(true);
      }
    },
  });
  useEffect(
    createSchema(
      passwordSchema,
      passwordStatusObject,
      setPasswordValidateStatus,
      {
        password: formik.values.password,
      },
    ),
    [formik.values.password],
  );
  useEffect(() => {
    setBtnDisabled(passwordValidateStatus.errors);
  }, [passwordValidateStatus.errors]);
  const navigate = useNavigate();
  const navigateHandler = () => navigate('/auth/login');
  console.log(passwordValidateStatus);
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
          className={
            !passwordValidateStatus.errors ? styles.input : styles.wrongInput
          }
        />
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
        <button
          className={styles.btn}
          type="submit"
          onClick={formik.submitForm}
          disabled={btnDisabled}
        >
          Установить новый пароль
        </button>
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
