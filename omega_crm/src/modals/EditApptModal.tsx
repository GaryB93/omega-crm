import { useState } from "react";
import { useUser } from "../pages/Dashboard/Dashboard";
import { useSchedules, useScheduleDispatch } from "../reducers/scheduleReducer";
import appointmentAPI from "../api/appointmentAPI";
import './modals.css';
import scheduleAPI from "../api/scheduleAPI";
import type { Appointment } from "../reducers/scheduleReducer";
import getCurrentDate from "../utils/getCurrentDate";

function EditApptModal ({closeEditApptModal, appointmentInfo}: {closeEditApptModal: ()=>void, appointmentInfo: Appointment}) {
  const [ user, setUser ] = useUser();
  
  const scheduleState = useSchedules();
  const scheduleDispatch = useScheduleDispatch();

  const [ startTime, setStartTime ] = useState(appointmentInfo.startTime);
  const [ endTime, setEndTime ] = useState(appointmentInfo.endTime);
  const [ description, setDescription ] = useState(appointmentInfo.description);
  const [ assignedSection, setAssisgnedSection ] = useState(appointmentInfo.section);

  const apptDate = new Date(appointmentInfo.date);
  const [ date, setDate ] = useState(getCurrentDate(apptDate));

  const sections = scheduleState.sections.map(section => <option key={section.id} value={section.id}>{section.name}</option>);
  sections.unshift(<option key={0} value={0}>Choose section...</option>)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const appointmentId = appointmentInfo.id;
    const userId = user.id;

    appointmentAPI.editAppointment(appointmentId, userId, assignedSection, date, startTime, endTime, description)
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
        closeEditApptModal();
      })
    })
    .catch(err => console.error('Error:', err));
  }

  return (
    <form className="formModal apptForm" onSubmit={handleSubmit}>
      <h3>Edit Appointment Details</h3>
      <label htmlFor="fullName">Customer:</label>
      <input type="text" id="fullName" disabled value={appointmentInfo.firstname + " " + appointmentInfo.lastname} />

      <label htmlFor="phoneNum">Phone:</label>
      <input type="text" id="phoneNum" disabled value={appointmentInfo.phone} />

      <label htmlFor="apptDate">Date:</label>
      <input type="date" id="apptDate" value={date} onChange={(e)=>setDate(e.target.value)}/>

      <label htmlFor="startTime">Start Time:</label>
      <select id="startTime" value={startTime} onChange={(e)=>setStartTime(e.target.value)}>
        <option value={"00:00"}>--:--</option>
        <option value={"08:00:00"}>8:00am</option>
        <option value={"08:30:00"}>8:30am</option>
        <option value={"09:00:00"}>9:00am</option>
        <option value={"09:30:00"}>9:30am</option>
        <option value={"10:00:00"}>10:00am</option>
        <option value={"10:30:00"}>10:30am</option>
        <option value={"11:00:00"}>11:00am</option>
        <option value={"11:30:00"}>11:30am</option>
        <option value={"12:00:00"}>12:00pm</option>
        <option value={"12:30:00"}>12:30pm</option>
        <option value={"13:00:00"}>1:00pm</option>
        <option value={"13:30:00"}>1:30pm</option>
        <option value={"14:00:00"}>2:00pm</option>
        <option value={"14:30:00"}>2:30pm</option>
        <option value={"15:00:00"}>3:00pm</option>
        <option value={"15:30:00"}>3:30pm</option>
        <option value={"16:00:00"}>4:00pm</option>
        <option value={"16:30:00"}>4:30pm</option>
      </select>

      <label htmlFor="endTime">End Time:</label>
      <select id="endTime" value={endTime} onChange={(e)=>setEndTime(e.target.value)}>
        <option value={"00:00:00"}>--:--</option>
        <option value={"08:30:00"}>8:30am</option>
        <option value={"09:00:00"}>9:00am</option>
        <option value={"09:30:00"}>9:30am</option>
        <option value={"10:00:00"}>10:00am</option>
        <option value={"10:30:00"}>10:30am</option>
        <option value={"11:00:00"}>11:00am</option>
        <option value={"11:30:00"}>11:30am</option>
        <option value={"12:00:00"}>12:00pm</option>
        <option value={"12:30:00"}>12:30pm</option>
        <option value={"13:00:00"}>1:00pm</option>
        <option value={"13:30:00"}>1:30pm</option>
        <option value={"14:00:00"}>2:00pm</option>
        <option value={"14:30:00"}>2:30pm</option>
        <option value={"15:00:00"}>3:00pm</option>
        <option value={"15:30:00"}>3:30pm</option>
        <option value={"16:00:00"}>4:00pm</option>
        <option value={"16:30:00"}>4:30pm</option>
        <option value={"17:00:00"}>5:00pm</option>
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

export default EditApptModal;