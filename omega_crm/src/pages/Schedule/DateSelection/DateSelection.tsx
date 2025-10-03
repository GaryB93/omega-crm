import { useSchedules, useScheduleDispatch } from '../../../reducers/scheduleReducer';
import scheduleAPI from '../../../api/scheduleAPI';
import './DateSelection.css';

function DateSelection () {
  const scheduleState = useSchedules();
  const dispatchSchedule = useScheduleDispatch();
  
  const handleClick = () => {
    scheduleAPI.getSchedules(scheduleState.selectedSchedule, scheduleState.date)
    .then(result => {
      console.log(result);
    })
    .catch(err => console.error('Error', err));
  }

  return (
    <div id="datePickerContainer">
      <input type="date" id="datepicker" value={scheduleState.date} onChange={(e) => dispatchSchedule({type: "changedDate", date: e.target.value})}></input>
      <button onClick={handleClick}>Apply</button>
    </div>
  )
}

export default DateSelection;