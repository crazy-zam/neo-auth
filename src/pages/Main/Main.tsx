import styles from './main.module.less';
import mainLogo from '@/assets/main logo.png';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import MyModal from '@/components/MyModal/MyModal';
import { useState } from 'react';
const Main = () => {
  const { username, email, accessToken, refreshToken } = useTypedSelector(
    (state) => state.user,
  );
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const { logoutAction } = useActions();
  const logoutHandler = () => {
    logoutAction(accessToken, refreshToken);
  };
  const handleModal = (bool: boolean) => {
    return () => setModalIsOpen(bool);
  };
  return (
    <div className={styles.page}>
      <img className={styles.img} src={mainLogo} alt="" />
      <div className={styles.side}>
        <div className={styles.title}>
          Добро пожаловать <br /> <b>{username}</b>!
        </div>
        <br />
        <div>
          Ваш email: <br /> <b>{email}</b>
        </div>
        <br />
        <button onClick={handleModal(true)} className={styles.button}>
          Выйти
        </button>
      </div>
      <MyModal isOpen={modalIsOpen} onClose={handleModal(false)}>
        <>
          <div className={styles.modalTitle}>Выйти?</div>
          <div className={styles.modalText}>Точно выйти?</div>
          <button onClick={logoutHandler} className={styles.modalExitBtn}>
            Да, точно
          </button>
          <button onClick={handleModal(false)} className={styles.modalBackBtn}>
            Нет, остаться
          </button>
        </>
      </MyModal>
    </div>
  );
};

export default Main;
