import styles from './validateError.module.less';
import React from 'react';
interface IValidate {
  empty: boolean;
  error: boolean;
  text: string;
}
const ValidateError = ({ empty, error, text }: IValidate) => {
  const setClass = (empty: boolean, err: boolean) => {
    return !empty
      ? styles.helpDisabled
      : err
      ? styles.helpSucces
      : styles.helpError;
  };
  const toggleIcon = (empty: boolean, error: boolean) => {
    return empty && (error ? '✅' : '❌');
  };
  return (
    <>
      <div className={setClass(empty, error)}>
        {text}
        {toggleIcon(empty, error)}
      </div>
    </>
  );
};

export default ValidateError;
