import { useState } from "react";
import { useCustomers } from "../reducers/customersReducer";
import { useSchedules, useScheduleDispatch } from "../reducers/scheduleReducer";
import appointmentAPI from "../api/appointmentAPI";
import './modals.css';
import scheduleAPI from "../api/scheduleAPI";
import ErrMsg from "../components/ErrMsg/ErrMsg";
import { useOutletContext } from "react-router";
import type { User } from "../interfaces/User";

function NewApptModal ({closeAddApptModal}: {closeAddApptModal: ()=>void}) {
  const user = useOutletContext<User>();

  const selectedCustomer = useCustomers().selectedCustomer;
  const scheduleState = useSchedules();
  const scheduleDispatch = useScheduleDispatch();

  const [ startTime, setStartTime ] = useState("00:00");
  const [ endTime, setEndTime ] = useState("00:00");
  const [ description, setDescription ] = useState("");
  const [ assignedSection, setAssisgnedSection ] = useState(0);

  const [ showStartTimeErr, setShowStartTimeErr ] = useState(false);
  const [ showEndTimeErr, setShowEndTimeErr ] = useState(false);
  const [ showSectionErr, setShowSectionErr ] = useState(false);

  const sections = scheduleState.sections.map(section => <option key={section.id} value={section.id}>{section.name}</option>);
  sections.unshift(<option key={0} value={0}>Choose section...</option>);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowStartTimeErr(startTime == "00:00");
    setShowEndTimeErr(endTime == "00:00");
    setShowSectionErr(assignedSection == 0);
    
    if (startTime != "00:00" && endTime != "00:00" && assignedSection != 0) {
      const customerId = selectedCustomer.id;
      const date = scheduleState.date;
      appointmentAPI.createAppointment(user.id, customerId, assignedSection, date, startTime, endTime, description)
      .then(result => {
        scheduleAPI.getSchedules(scheduleState.selectedSchedule, scheduleState.date)
        .then(response => response.json())
        .then(result2 => {
          scheduleDispatch({
            type: "selected",
            id: result2.selectedSchedule,
            schedules: result2.schedules,
            sections: result2.sections,
            appointments: result2.appointments
          });
          closeAddApptModal();
        });
      })
      .catch(err => console.error('Error:', err));
    }
  }

  return (
    <form className="formModal apptForm" name="newApptForm" onSubmit={handleSubmit}>
      <h3>Appointment Details</h3>
      <label htmlFor="fullName">Customer:</label>
      <input type="text" id="fullName" data-testid="fullName" disabled value={selectedCustomer.firstname + " " + selectedCustomer.lastname} />

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
        <option value={"13:00"}>1:00pm</option>
        <option value={"13:30"}>1:30pm</option>
        <option value={"14:00"}>2:00pm</option>
        <option value={"14:30"}>2:30pm</option>
        <option value={"15:00"}>3:00pm</option>
        <option value={"15:30"}>3:30pm</option>
        <option value={"16:00"}>4:00pm</option>
        <option value={"16:30"}>4:30pm</option>
      </select>
      {showStartTimeErr && <ErrMsg message="Please choose a start time."/>}

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
        <option value={"13:00"}>1:00pm</option>
        <option value={"13:30"}>1:30pm</option>
        <option value={"14:00"}>2:00pm</option>
        <option value={"14:30"}>2:30pm</option>
        <option value={"15:00"}>3:00pm</option>
        <option value={"15:30"}>3:30pm</option>
        <option value={"16:00"}>4:00pm</option>
        <option value={"16:30"}>4:30pm</option>
        <option value={"17:00"}>5:00pm</option>
      </select>
      {showEndTimeErr && <ErrMsg message="Please choose an end time."/>}

      <label htmlFor="description">Description of Work:</label>
      <textarea id="description" value={description} required onChange={(e)=>setDescription(e.target.value)}/>

      <label htmlFor="assignedSection">Assigned Section:</label>
      <select id="assignedSection" value={assignedSection} onChange={(e)=>setAssisgnedSection(Number(e.target.value))}>
        {sections}
      </select>
      {showSectionErr && <ErrMsg message="Please choose a section."/>}

      <button className="submitBtn primaryBtn" type="submit">Save</button>
    </form>
  )
}

export default NewApptModal;