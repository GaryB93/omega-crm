import { useSchedules } from '../../../reducers/scheduleReducer';
import AppointmentCard from '../AppointmentCard/AppointmentCard';
import { useCustomers } from '../../../reducers/customersReducer';
import './ScheduleGrid.css';

interface ScheduleGridProps {
  openAddSectionModal: () => void;
  openAddApptModal: () => void;
}

function ScheduleGrid ({ openAddSectionModal, openAddApptModal }: ScheduleGridProps) {

  const schedules = useSchedules();
  const customers = useCustomers();
  let appointments = [];
  
  let i = 0;
  const sections = schedules.sections.map(section => {
    i++;
    return <h5 key={section.id} style={{gridColumn: `${i + 1} / ${i + 2}`}}>{section.name}</h5>
  });

  let j = 0;
  schedules.sections.forEach(section => {
    j++;
    const filteredAppts = schedules.appointments.filter((appointment) => appointment.section == section.id);

    appointments = appointments.concat(filteredAppts.map(appt => {
      return <AppointmentCard key={appt.id} appointmentInfo={appt} j={j}/>
    }))
  });

  return (
    <div id="scheduleGrid" style={{gridTemplateColumns: `1fr repeat(${sections.length}, 2fr)`}}>
      <h3>Schedule Name</h3>
      <h4>Day(Date)</h4>
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
      <button id="addSectionBtn" onClick={openAddSectionModal} style={{gridColumn: `${sections.length}`}}>Add Section</button>
      <button id="createApptBtn" onClick={openAddApptModal} style={{gridColumn: `${sections.length + 1}`}}
        disabled={customers.selectedCustomer.id == 0}>Create Appt</button>
    </div>
  )
}

export default ScheduleGrid;