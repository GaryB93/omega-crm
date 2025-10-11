import { useSchedules, useScheduleDispatch } from '../../../reducers/scheduleReducer';
import scheduleAPI from '../../../api/scheduleAPI';
import './DateSelection.css';

function DateSelection () {
  const scheduleState = useSchedules();
  const dispatchSchedule = useScheduleDispatch();
  
  const handleClick = () => {
    scheduleAPI.getSchedules(scheduleState.selectedSchedule, scheduleState.date)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      console.log(response);
      throw new Error("Error retrieving schedule data after selecting date");
    }).then(result => {
      dispatchSchedule({
        type: "selected",
        id: result.selectedSchedule,
        schedules: result.schedules,
        sections: result.sections,
        appointments: result.appointments
      })
    })
    .catch(err => console.error('Error', err));
  }

  return (
    <div id="datePickerContainer">
      <input type="date" id="datepicker" value={scheduleState.date} onChange={(e) => dispatchSchedule({type: "changedDate", date: e.target.value})}></input>
      <button className="secondaryBtn" onClick={handleClick}>Apply</button>
    </div>
  )
}

export default DateSelection;