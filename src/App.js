import './App.css';
import TimeCard from './components/TimeCard';

import { useState } from 'react';

function App() {

  const [weeklyHours, setWeeklyHours] = useState([])

  const sumWithInitial = weeklyHours.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

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
            <th></th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          <TimeCard day="Monday" setWeeklyHours={setWeeklyHours} />
          <TimeCard day="Tuesday" setWeeklyHours={setWeeklyHours} />
          <TimeCard day="Wednesday" setWeeklyHours={setWeeklyHours} />
          <TimeCard day="Thursday" setWeeklyHours={setWeeklyHours} />
          <TimeCard day="Friday" setWeeklyHours={setWeeklyHours} />
          <TimeCard day="Saturday" setWeeklyHours={setWeeklyHours} />
          <TimeCard day="Sunday" setWeeklyHours={setWeeklyHours} />
          <tr >
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
            <b>Total Weekly Hours:</b>
            </td>
          <td>
             <b>{sumWithInitial.toFixed(2)}</b>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
