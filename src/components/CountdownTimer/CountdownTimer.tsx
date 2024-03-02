import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';

interface Render {
  seconds: any;
  completed: any;
}
interface Counter {
  timer: number;
  text: string;
  className: any;
  handler?: () => void;
  children?: React.ReactNode;
}

const CountdownTimer = ({
  timer,
  text,
  className,
  handler,
  children,
}: Counter) => {
  const renderer = ({ seconds, completed }: Render) => {
    if (completed) {
      handler && handler();
      return <div>{children}</div>;
    } else {
      return (
        <div>
          {text} через: <b>{seconds}</b> секунд
        </div>
      );
    }
  };
  return (
    <div className={className}>
      {timer && (
        <Countdown date={Date.now() + timer * 1000} renderer={renderer} />
      )}
    </div>
  );
};

export default CountdownTimer;
