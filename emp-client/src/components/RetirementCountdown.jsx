import React, { useState, useEffect } from 'react';
import moment from 'moment';

function Countdown(props) {
  const [countdown, setCountdown] = useState({});

  useEffect(() => {
    const intervalId = setInterval(() => {
      const retirementDate = moment(props.retirementDate);

      const today = moment().format('DD-MM-YYYY');
      const diff = moment(today, 'DD-MM-YYYY').diff(moment(retirementDate._i, 'DD-MM-YYYY'));

      const diffInDays = Math.abs(Math.floor(diff / (1000 * 60 * 60 * 24)));
      const diffInHours = Math.abs(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      const diffInMinutes = Math.abs(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
      const diffInSeconds = Math.abs(Math.floor((diff % (1000 * 60)) / 1000));

      setCountdown({diffInDays, diffInHours, diffInMinutes, diffInSeconds});

    }, 1000);
    return () => clearInterval(intervalId);
  }, [props.retirementDate]);

  return (
    <div>
      <h1>Retirement Date: {props.retirementDate}</h1>
      <p> {countdown.diffInDays} days, {countdown.diffInHours} hours, {countdown.diffInMinutes} minutes, {countdown.diffInSeconds} seconds Left For Retirement</p>
    </div>
  );
}

export default Countdown;
