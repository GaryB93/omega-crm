import type { Appointment } from "../reducers/scheduleReducer";
import appointmentAPI from "../api/appointmentAPI";
import scheduleAPI from "../api/scheduleAPI";
import { useSchedules, useScheduleDispatch } from "../reducers/scheduleReducer";
import './modals.css';

interface DeleteApptModalProps {
  closeDeleteApptModal: ()=>void;
  appointmentInfo: Appointment;
}

function DeleteApptModal ({closeDeleteApptModal, appointmentInfo}: DeleteApptModalProps) {
  const scheduleState = useSchedules();
  const scheduleDispatch = useScheduleDispatch();

  const handleClick = () => {
    appointmentAPI.deleteAppointment(appointmentInfo.id)
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
        closeDeleteApptModal();
      })
      .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
  }

  return (
    <div className="formModal">
      <h3>Delete Appointment</h3>
      <p style={{marginTop: "20px"}}>Are you sure you want to delete this appointment for {appointmentInfo.firstname} {appointmentInfo.lastname}?</p>
      <button className="warningBtn submitBtn" onClick={handleClick}>Delete</button>
    </div>
  )
}

export default DeleteApptModal;