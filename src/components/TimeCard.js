import { useState } from "react";

function TimeCard(props) {

    const { setWeeklyHours } = props

    let inMinutesToHours;
    let outMinutesToHours;
    let inHours;
    let outHours;
    let hoursWorked;
    let deduction;
    
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


    //State variable for total hours worked and error message pop up.
    const [totalHours, setTotalHours] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    //Watches the changes from the input
    const handleChange = (e) => {
        const { name, value } = e.target
        setHours({ ...hours, [name]: value })
    }

    //Calculates total hours
    const calculate = (hours) => {
        // Sets error state variable to empty string
        setErrorMessage("");

        // Minutes to hours conversions
        inMinutesToHours = hours.inMinutes / 60
        outMinutesToHours = hours.outMinutes / 60
        inHours = Number(hours.inHours) + inMinutesToHours;
        outHours = Number(hours.outHours) + outMinutesToHours;
        deduction = Number(hours.lunchDeduction) / 60;

        // Case where the time of days are equal to each other. PM == PM or AM == AM
        if (hours.inTimeOfDay === hours.outTimeOfDay) {
            if (Number(hours.inHours) === 12) {
                hoursWorked = outHours - inMinutesToHours - deduction
                setWeeklyHours((prevData) => [...prevData, hoursWorked])
                return setTotalHours(hoursWorked.toFixed(2))

            } else if (Number(hours.outHours) < Number(hours.inHours)) {
                return setErrorMessage("Please double check times.")
            } else if (Number(hours.outHours) === 12) {
                return setErrorMessage("Please double check times.")
            } else {
                hoursWorked = outHours - inHours - deduction
                setWeeklyHours((prevData) => [...prevData, hoursWorked])
                return setTotalHours(hoursWorked.toFixed(2))
            }
        }
        //Case where time of day are differnt   
        else {
            if (Number(hours.outHours) === 12) {
                hoursWorked = (12 - inHours) + outMinutesToHours - deduction
                setWeeklyHours((prevData) => [...prevData, hoursWorked])
                return setTotalHours(hoursWorked.toFixed(2))
            } else {
                hoursWorked = (12 - inHours) + outHours - deduction
                setWeeklyHours((prevData) => [...prevData, hoursWorked])
                return setTotalHours(hoursWorked.toFixed(2))
            }

        }
    }

    return (
        <tr>
            <td>
                {props.day}
            </td>
            <td>
                <div>
                    <input type="number" min={0} name="inHours"  value={hours.inHours} onChange={handleChange} /> :
                    <input type="number" min={0} ="inMinutes" value={hours.inMinutes} onChange={handleChange} />
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
                <button onClick={()=>calculate(hours)}>Calculate</button>
            </td>
            <td>
                {errorMessage.length > 0 ? <p style={{color: "red"}}>{errorMessage}</p>: totalHours}
            </td>
        </tr>

    )
}

export default TimeCard