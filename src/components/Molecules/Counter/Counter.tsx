import React, {FC, PropsWithChildren} from 'react';
import Countdown from 'react-countdown';

interface CardIconWithTextProps {
    alertCounter: number,
    completeCounter: () =>  void;
}

const Counter: FC<PropsWithChildren<CardIconWithTextProps>> = ({alertCounter,completeCounter}) => {
  const renderer = ({  minutes, seconds, completed }:any) => {
    if (completed) {
      return completeCounter;
    } else {
      return (<span>{minutes}:{seconds}</span>)
    }
  };
    return <Countdown date={alertCounter} renderer={renderer}/>
}

export default Counter;


