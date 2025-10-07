import { useState } from "react";
import { useCustomers } from "../reducers/customersReducer";
import { useSchedules, useScheduleDispatch } from "../reducers/scheduleReducer";
import appointmentAPI from "../api/appointmentAPI";
import './modals.css';
import scheduleAPI from "../api/scheduleAPI";

function NewApptModal ({closeAddApptModal}: {closeAddApptModal: ()=>void}) {

  const selectedCustomer = useCustomers().selectedCustomer;
  const scheduleState = useSchedules();
  const scheduleDispatch = useScheduleDispatch();

  const [ startTime, setStartTime ] = useState("00:00");
  const [ endTime, setEndTime ] = useState("00:00");
  const [ description, setDescription ] = useState("");
  const [ assignedSection, setAssisgnedSection ] = useState(0);

  const sections = scheduleState.sections.map(section => <option key={section.id} value={section.id}>{section.name}</option>);
  sections.unshift(<option key={0} value={0}>Choose section...</option>)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const customerId = selectedCustomer.id;
    const date = scheduleState.date;
    appointmentAPI.createAppointment(customerId, assignedSection, date, startTime, endTime, description)
    .then(result => {
      scheduleAPI.getSchedules(scheduleState.selectedSchedule, scheduleState.date)
      .then(result2 => {
        scheduleDispatch({
          type: "selected",
          id: result2.selectedSchedule,
          schedules: result2.schedules,
          sections: result2.sections,
          appointments: result2.appointments
        });
        closeAddApptModal();
      })
    })
    .catch(err => console.error('Error:', err));
  }

  return (
    <form className="formModal apptForm" onSubmit={handleSubmit}>
      <h3>Appointment Details</h3>
      <label htmlFor="fullName">Customer:</label>
      <input type="text" id="fullName" disabled value={selectedCustomer.firstname + " " + selectedCustomer.lastname} />

      <label htmlFor="phoneNum">Phone:</label>
      <input type="text" id="phoneNum" disabled value={selectedCustomer.phone} />

      <label htmlFor="apptDate">Date:</label>
      <input type="date" id="apptDate" disabled value={scheduleState.date} />

      <label htmlFor="startTime">Start Time:</label>
      <select id="startTime" value={startTime} onChange={(e)=>setStartTime(e.target.value)}>
        <option value={"00:00"}>--:--</option>
        <option value={"08:00"}>8:00am</option>
        <option value={"08:30"}>8:30am</option>
        <option value={"09:00"}>9:00am</option>
        <option value={"09:30"}>9:30am</option>
        <option value={"10:00"}>10:00am</option>
        <option value={"10:30"}>10:30am</option>
        <option value={"11:00"}>11:00am</option>
        <option value={"11:30"}>11:30am</option>
        <option value={"12:00"}>12:00pm</option>
        <option value={"12:30"}>12:30pm</option>
        <option value={"01:00"}>1:00pm</option>
        <option value={"01:30"}>1:30pm</option>
        <option value={"02:00"}>2:00pm</option>
        <option value={"02:30"}>2:30pm</option>
        <option value={"03:00"}>3:00pm</option>
        <option value={"03:30"}>3:30pm</option>
        <option value={"04:00"}>4:00pm</option>
        <option value={"04:30"}>4:30pm</option>
      </select>

      <label htmlFor="endTime">End Time:</label>
      <select id="endTime" value={endTime} onChange={(e)=>setEndTime(e.target.value)}>
        <option value={"00:00"}>--:--</option>
        <option value={"08:30"}>8:30am</option>
        <option value={"09:00"}>9:00am</option>
        <option value={"09:30"}>9:30am</option>
        <option value={"10:00"}>10:00am</option>
        <option value={"10:30"}>10:30am</option>
        <option value={"11:00"}>11:00am</option>
        <option value={"11:30"}>11:30am</option>
        <option value={"12:00"}>12:00pm</option>
        <option value={"12:30"}>12:30pm</option>
        <option value={"01:00"}>1:00pm</option>
        <option value={"01:30"}>1:30pm</option>
        <option value={"02:00"}>2:00pm</option>
        <option value={"02:30"}>2:30pm</option>
        <option value={"03:00"}>3:00pm</option>
        <option value={"03:30"}>3:30pm</option>
        <option value={"04:00"}>4:00pm</option>
        <option value={"04:30"}>4:30pm</option>
        <option value={"05:00"}>5:00pm</option>
      </select>

      <label htmlFor="description">Description of Work:</label>
      <textarea id="description" value={description} required onChange={(e)=>setDescription(e.target.value)}/>

      <label htmlFor="assignedSection">Assigned Section:</label>
      <select id="assignedSection" value={assignedSection} onChange={(e)=>setAssisgnedSection(Number(e.target.value))}>
        {sections}
      </select>

      <button type="submit">Save</button>
    </form>
  )
}

export default NewApptModal;