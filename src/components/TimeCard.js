import { useState } from "react";

function TimeCard(props) {

    const { calculateHoursWorked, day, index, weeklyHours } = props;
    
  //State variable for tracking hours input
  const [hours, setHours] = useState({
    inHours: 0,
    inMinutes: 0,
    outHours: 0,
    outMinutes: 0,
    inTimeOfDay: "",
    outTimeOfDay: "",
    lunchDeduction: 0
});

    //Watches the changes from the input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setHours({ ...hours, [name]: value });
    }

    return (
        <tr>
            <td>
                {day ? day : ""}
            </td>
            <td>
                <div>
                    <input type="number" min={0} name="inHours"  value={hours.inHours} onChange={handleChange} /> :
                    <input type="number" min={0} name="inMinutes" value={hours.inMinutes} onChange={handleChange} />
                    <select name="inTimeOfDay" value={hours.inTimeOfDay} onChange={handleChange}>
                        <option defaultValue={hours.inTimeOfDay}>AM</option>
                        <option>PM</option>
                    </select>
                </div>
            </td>
            <td>
                <div>
                    <input type="number" min={0} name="outHours" value={hours.outHours} onChange={handleChange} /> :
                    <input type="number" min={0} name="outMinutes" value={hours.outMinutes} onChange={handleChange} />
                    <select name="outTimeOfDay" value={hours.outTimeOfDay} onChange={handleChange}>
                        <option defaultValue={hours.inTimeOfDay}>AM</option>
                        <option>PM</option>
                    </select>
                </div>
            </td>
            <td>
                <input type="number" name="lunchDeduction" value={hours.lunchDeduction} onChange={handleChange} />
            </td>
            <td>
                <button disabled={hours.inHours <= 0 || hours.outHours <= 0 ? true: false} onClick={()=>calculateHoursWorked(hours, index, day)}>Calculate</button>
            </td>
            <td>
                {weeklyHours[index]}
            </td>
        </tr>

    )
}

export default TimeCard