import { useState } from "react";
import scheduleAPI from "../api/scheduleAPI";
import { useScheduleDispatch } from "../reducers/scheduleReducer";
import './modals.css';

function NewScheduleModal () {

  const [name, setName] = useState("");
  const scheduleDispatch = useScheduleDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleAPI.addSchedule(name)
    .then(result => {
      scheduleDispatch({
        type: "added",
        id: result.id,
        scheduleName: result.name
      })
    })
    .catch(error => console.error('Error', error))
  }

  return (
    <form className="formModal" onSubmit={handleSubmit}>
      <h3>Add Schedule</h3>
      <label htmlFor="scheduleName">Schedule Name:</label>
      <input type="text" id="scheduleName" value={name} onChange={(e) => setName(e.target.value)} required></input>
      <button className="submitBtn" type="submit">Add</button>
    </form>
  )
}

export default NewScheduleModal;