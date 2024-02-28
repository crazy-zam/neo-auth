import FormLogin from '@/components/FormLogin/FormLogin';
import styles from './login.module.less';
import mainLogo from '@/assets/main logo.png';
const Login = () => {
  return (
    <div className={styles.page}>
      <img src={mainLogo} alt="" className={styles.img} />
      <FormLogin />
    </div>
  );
};

export default Login;
