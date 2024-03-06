import FormLogin from '@/components/FormLogin/FormLogin';
import styles from './login.module.less';
import mainLogo from '@/assets/main logo.png';
import arrowBack from '@/assets/arrow back.png';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import { useEffect, useState } from 'react';
import FormForgotPassword from '@/components/FormForgotPassword/FormForgotPassword';
const isTokenExpired = (token: string) => {
  const expiry = JSON.parse(atob(token.split('.')[1])).exp;
  return Math.floor(new Date().getTime() / 1000) >= expiry;
};

const Login = () => {
  const { refreshTokenAction, getUserAction } = useActions();
  const [resetPassword, setResetPassword] = useState(false);
  const { accessToken, refreshToken } = useTypedSelector((state) => state.user);

  useEffect(() => {
    const tokenRefreshLS = localStorage.getItem('refresh');
    const tokenAccessLS = localStorage.getItem('access');
    if (!!tokenAccessLS && !isTokenExpired(tokenAccessLS)) {
      getUserAction(tokenAccessLS, tokenRefreshLS);
      return;
    }
    if (
      !!tokenAccessLS &&
      !!tokenRefreshLS &&
      isTokenExpired(tokenAccessLS) &&
      !isTokenExpired(tokenRefreshLS)
    ) {
      refreshTokenAction(tokenRefreshLS);
      return;
    }
    localStorage.removeItem('refresh');
    localStorage.removeItem('access');
  }, []);

  useEffect(() => {
    if (accessToken && isTokenExpired(accessToken)) {
      getUserAction(accessToken, refreshToken);
    }
  }, [accessToken]);

  return (
    <div className={styles.page} id="page">
      <img src={mainLogo} alt="" className={styles.img} />
      {resetPassword ? (
        <div>
          <FormForgotPassword></FormForgotPassword>
          <button
            onClick={() => setResetPassword(false)}
            className={styles.linkBack}
          >
            <img src={arrowBack} alt="" /> Назад
          </button>
        </div>
      ) : (
        <div>
          <FormLogin />
          <button
            className={styles.forgotBtn}
            onClick={() => setResetPassword(true)}
          >
            Забыли пароль?
          </button>
          <Link to="/auth/registration" className={styles.linkButton}>
            Зарегистрироваться
          </Link>
        </div>
      )}
    </div>
  );
};

export default Login;
