import React, {useState} from 'react'
import arrowIcon from '../../../assets/Icons/arrow.png'
import './Calendar.scss'

function Calendar() {

//CALENDAR FONCTIONALITY
const [activeDay, setActiveDay] = useState(null);

const handleCalendarDayClick = (day) => {
    if(day === activeDay){
        setActiveDay(null);
    } else {
        setActiveDay(day);
    }
}

//CALENDAR BASICS
    const [currentDate, setCurrentDate] = useState(new Date());
    const daysOfWeek = [ 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const renderDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInCurrentMonth = daysInMonth(year, month);
        const firstDayOfMonth = new Date(year, month, 1).getDay();

        const daysArray = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            daysArray.push(
            <div key={`empty-${i}`} className='calendarDay empty'
                >
            </div>)
        }
        for (let day = 1; day <= daysInCurrentMonth; day++) {
            daysArray.push(
                <div key={day} className='calendarDay' onClick={() => handleCalendarDayClick(day)}
                style={{
                  backgroundColor: activeDay === day ? 'black' : 'white', 
                  color: activeDay === day ? 'white' : 'black', 
                }}>
                    {day}
                </div>
            );
        }
        return daysArray;
    }
    const changeMonth = (direction) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
    };

  return (
    <div id='calendar'>
        <div className='calendarHeader'>
            <h2>{currentDate.toLocaleDateString('default', {month: 'long'})} {currentDate.getFullYear()}</h2>
            <div className='changeMonthArrow'>
                <img className='previousMonth' src={arrowIcon} onClick={() => {changeMonth(-1), handleCalendarDayClick()}}/>
                <img className='nextMonth' src={arrowIcon} onClick={() => {changeMonth(+1), handleCalendarDayClick()}}/>
            </div> 
        </div>
        <div className='calendarGrid'>
            {daysOfWeek.map((day) => (
                <div key={day} className='calendarDayName'>
                    {day}
                </div>
            ))}
             {renderDays()}
        </div>
    </div>
  )
}

export default Calendar
