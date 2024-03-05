import styles from './main.module.less';
import mainLogo from '@/assets/main logo.png';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
const Main = () => {
  const { username, email, accessToken, refreshToken } = useTypedSelector(
    (state) => state.user,
  );
  const { logoutAction } = useActions();
  const logoutHandler = () => {
    logoutAction(accessToken, refreshToken);
  };
  return (
    <div className={styles.page}>
      <img className={styles.img} src={mainLogo} alt="" />
      <div className={styles.side}>
        <div className={styles.title}>
          Добро пожаловать <b>{username}</b> !
        </div>
        <br />
        <div>
          Ваш email: <b>{email}</b>{' '}
        </div>
        <br />
        <button onClick={logoutHandler} className={styles.button}>
          Выйти
        </button>
      </div>
    </div>
  );
};

export default Main;
