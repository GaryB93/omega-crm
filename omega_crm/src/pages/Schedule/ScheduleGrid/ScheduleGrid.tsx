import AppointmentCard from '../AppointmentCard/AppointmentCard';
import type { ScheduleState } from '../../../reducers/scheduleReducer';
import './ScheduleGrid.css';

// The schedulegrid component is one of the ways the application showcases a user-friendly, functional GUI.
// The main purpose of this application is to provide users with an easy way to view appointments by date and when they are scheduled for.
// The user can change what appointments are being shown by choosing the specific date or schedule.

interface ScheduleGridProps {
  scheduleState: ScheduleState;
  selectedCustomerId: number;
  openAddSectionModal: () => void;
  openAddApptModal: () => void;
}

function ScheduleGrid ({ scheduleState, selectedCustomerId, openAddSectionModal, openAddApptModal }: ScheduleGridProps) {

  const currentSchedule = scheduleState.schedules.find(schedule => schedule.id == scheduleState.selectedSchedule);
  let appointments = [];
  
  let i = 0;
  const sections = scheduleState.sections.map(section => {
    i++;
    return <span className="sectionTitles" key={section.id} style={{gridColumn: `${i + 1} / ${i + 2}`}}>{section.name}</span>
  });

  let j = 0;
  scheduleState.sections.forEach(section => {
    j++;
    const filteredAppts = scheduleState.appointments.filter((appointment) => appointment.section == section.id);

    appointments = appointments.concat(filteredAppts.map(appt => {
      return <AppointmentCard key={appt.id} appointmentInfo={appt} j={j}/>
    }))
  });

  return (
    <div id="scheduleGrid" style={{gridTemplateColumns: `1fr repeat(${sections.length}, 2fr)`}}>
      <h2>{currentSchedule ? currentSchedule!.name : 'Schedule'}</h2>
      <p className="times eight">8:00AM</p>
      <p className="times nine">9:00AM</p>
      <p className="times ten">10:00AM</p>
      <p className="times eleven">11:00AM</p>
      <p className="times twelve">12:00AM</p>
      <p className="times one">1:00PM</p>
      <p className="times two">2:00PM</p>
      <p className="times three">3:00PM</p>
      <p className="times four">4:00PM</p>
      <p className="times five">5:00PM</p>
      {sections}
      {appointments}
      <div id="scheduleFunctions">
        <button className="secondaryBtn" onClick={openAddSectionModal} style={{gridColumn: `${sections.length}`}}>Add Section</button>
        <button className="primaryBtn" onClick={openAddApptModal} style={{gridColumn: `${sections.length + 1}`}} disabled={selectedCustomerId == 0 || scheduleState.selectedSchedule == undefined}>Create Appointment</button>
      </div>
    </div>
  )
}

export default ScheduleGrid;