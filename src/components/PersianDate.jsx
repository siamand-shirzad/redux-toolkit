import moment from 'moment-jalaali';
import React, { useEffect, useState } from 'react';

const PersianDate = ({date}) => {
  const [time, setTime] = useState('') 
  const [dayToGame, setDayToGame] = useState(0) 
  // console.log(date.format("jYYYY/jMM/jDD"));
  
  useEffect(() => {
    console.log(date);
    
    let gameDate = moment(date, "YYYY-MM-DD")
    let todayDate = moment()

    setDayToGame(  Number(gameDate.format("jYYYY/jMM/jDD ").slice(-3)) - Number(todayDate.format("jYYYY/jMM/jDD ").slice(-3)));
    
  
  }, [])
  
  return (
    <div className='w-1/3'>
      <h3>Up coming game in {dayToGame} days</h3>
      
    </div>
  );
};

export default PersianDate;