import './App.css';
import TimeCard from './components/TimeCard';
import Calculate from './components/Calculate';
import { useState } from 'react';

function WeeklyTimeCard() {

  const DAYSOFWEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const [weeklyHours, setWeeklyHours] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  //Sums the hours worked
  const totalHoursWorked = weeklyHours.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const calculateHoursWorked = (hours, index, day) => {
    const hoursWorked = Calculate(hours);
    if (hoursWorked > 17 || hoursWorked < 0) return setErrorMessage(`${day} cannot exceed 17 hours`);
    //Saves everything in existing array to a copy to mutate contents inside
    const newArray = [...weeklyHours];
    newArray[index] = Number(hoursWorked);
    //Saves mutated copy to the state variable
    setWeeklyHours(newArray);
    setErrorMessage("");
  }

  //Creates a table row for each day of the week
  const mappedTimeCard = DAYSOFWEEK.map((day, index) => (
    <TimeCard 
      key={index} 
      index={index} 
      day={day} 
      errorMessage={errorMessage} 
      calculateHoursWorked={calculateHoursWorked} 
      weeklyHours={weeklyHours} />
  ));

  return (
    <div className="App">
      <h1>Deluxity's Time Card Calculator</h1>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Time-In</th>
            <th>Time-Out</th>
            <th>Deduction {`(min)`}</th>
            <th>{<p className='errorMessage'>{errorMessage}</p>}</th>
            <th>Regular Hours</th>
            <th>Overtime Hours</th>
          </tr>
        </thead>
        <tbody>
          {
            mappedTimeCard
          }
          <tr>
            <td></td><td></td><td></td><td></td>
            <td>
              <b>Total Weekly Hours:</b>
            </td>
            <td>
              <b>{totalHoursWorked?.toFixed(2)}</b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default WeeklyTimeCard;