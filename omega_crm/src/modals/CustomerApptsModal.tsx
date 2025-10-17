import appointmentAPI from "../api/appointmentAPI";
import { useState, useEffect } from "react";
import getCurrentDate from "../utils/getCurrentDate";
import Customer from "../classes/Customer";
import Appointment from "../classes/Appointment";
import './modals.css';

// This modal is used to generate reports based on the customer selected to show their appointments and appointment edits made by users, including a timestamp of when the edit was made and by whom.

interface CustomerApptsModalProps {
  customer: Customer;
}

interface Appointments {
  appointments: Array<Appointment>;
  appointmentEdits: Array<AppointmentEdits>;
}

interface AppointmentEdits {
  id: number;
  appointment: number;
  newinfo: string;
  previnfo: string;
  owner: number;
  timestamp: string;
}

function CustomerApptsModal ({customer}: CustomerApptsModalProps) {
  const [appointments, setAppointments] = useState<Appointments>({
    appointments: [],
    appointmentEdits: []
  });
  const [selectedAppointment, setSelectedAppointment] = useState<number>();

  useEffect(() => {
    appointmentAPI.getAppointmentsByCustomer(customer.id)
    .then(result => { // result is an object with properties: appointments and appointmentEdits
      setAppointments(result);
      if (result.appointments[0]) {
        setSelectedAppointment(result.appointments[0].id);
      }
    })
    .catch(err => console.error('Error:', err));
  }, []);

  const appointmentList = appointments.appointments.map((appt) => {
    const classes = selectedAppointment == appt.id ? "apptSelected apptInfo" : "apptInfo";
    
    return (
      <div key={appt.id} className={classes} onClick={()=>{setSelectedAppointment(appt.id)}}>
        <span>{getCurrentDate(new Date(appt.date))}</span>
        <span>{appt.startTime}</span>
        <span>{appt.endTime}</span>
        <span>{appt.description}</span>
      </div>
    )
  });

  const appointmentEditsList = appointments.appointmentEdits.filter(apptEdit => apptEdit.appointment == selectedAppointment).map(apptEdit => {
    const timestamp = new Date(apptEdit.timestamp);
    return (
      <div key={apptEdit.id} className="apptEdit">
        <span>{timestamp.toLocaleString()}</span>
        <span>{apptEdit.owner}</span>
      </div>
    )
  });
  

  return (
    <div>
      <h2>Customer's Appointments Report</h2>
      <div className="appointments">
        <div className="appointmentsHeader">
          <span>Appt Date</span>
          <span>Start Time</span>
          <span>End Time</span>
          <span>Description</span>
        </div>
        {appointmentList}
      </div>
      <div className="appointmentEdits">
        <h3>Appointment Edits Report</h3>
        <div className="editsHeader">
          <span>Timestamp</span>
          <span>Edit made by</span>
        </div>
        {appointmentEditsList}
      </div>
    </div>
  )
}

export default CustomerApptsModal;