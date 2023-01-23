import './App.css';
import TimeCard from './components/TimeCard';

import { useState } from 'react';

function App() {

  const DAYSOFWEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const [weeklyHours, setWeeklyHours] = useState([])

  const sumWithInitial = weeklyHours.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const mappedTimeCard = DAYSOFWEEK.map((day, index) => (
    <TimeCard key={index} day={day} setWeeklyHours={setWeeklyHours} />
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
            <th></th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>

          {
            mappedTimeCard
          }
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