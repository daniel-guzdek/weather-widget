import React, { useState, useEffect } from 'react';

function DateAndTime() {

  // actual date
  const [dayName, setDayName] = useState(new Date().getDay());
  const [date, setDate] = useState(new Date().toLocaleDateString());

  if(dayName === 1) {
    setDayName('Monday');
  } 
  if(dayName === 2) {
    setDayName('Tuesday');
  } 
  if(dayName === 3) {
    setDayName('Wednesday');
  } 
  if(dayName === 4) {
    setDayName('Thursday');
  } 
  if(dayName === 5) {
    setDayName('Friday');
  } 
  if(dayName === 6) {
    setDayName('Saturday');
  } 
  if(dayName === 7) {
    setDayName('Sunday');
  } 

  const getActualDate = () => {
    setInterval(()=> {
      setDayName(new Date().getDay());
      setDate(new Date().toLocaleDateString());
    }, 10000);
  };

  useEffect(() => {
    getActualDate()
  }, [dayName, date]);
    
  // actual time
  const [houres, setHoures] = useState(new Date().getHours());
  const [minutes, setMinutes] = useState(new Date().getMinutes());

  const getActualTime = () => {
    setInterval(() => {
      setHoures(new Date().getHours());
      setMinutes(new Date().getMinutes());
    }, 1000)
  };

  useEffect(() => {
    getActualTime()
  }, [minutes, houres]);

  return(
    <>
      <div className="date-time_container">
          <div className="date">
            <p className="date__day-name"><span className="date-spacing">{dayName},</span></p>
            <p className="date__dd-mm-yy">{date}</p>
          </div>
          <div className="time">
            <p className="time__houres time-info"><span className="dots">{houres <10 ? `0${houres}` : houres}</span>:</p>
            <p className="time__minutes time-info"><span className="dots">{minutes <10 ? `0${minutes}` : minutes}</span></p>
          </div>
        </div>
    </>
  )
}

export default DateAndTime;