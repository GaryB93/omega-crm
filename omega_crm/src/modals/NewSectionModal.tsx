import './modals.css';
import { useSchedules,useScheduleDispatch } from '../reducers/scheduleReducer';
import { useState } from 'react';
import scheduleAPI from '../api/scheduleAPI';

function NewSectionModal () {
  const selectedScheduleID = useSchedules().selectedSchedule;
  const scheduleDispatch = useScheduleDispatch();
  const [ name, setName ] = useState("");

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleAPI.addSection(name, selectedScheduleID)
    .then(result => {
      scheduleDispatch({
        type: "addedSection",
        id: result.id,
        name: result.name
      })
    })
    .catch(err => console.error('Error', err));
  }

  return (
    <form className="formModal">
      <h3>Add Section</h3>
      <label htmlFor="sectionName">Section Name:</label>
      <input type="text" id="sectionName" value={name} onChange={(e)=>setName(e.target.value)}></input>
      <button className="submitBtn" onClick={handleClick}>Add</button>
    </form>
  )
}

export default NewSectionModal;