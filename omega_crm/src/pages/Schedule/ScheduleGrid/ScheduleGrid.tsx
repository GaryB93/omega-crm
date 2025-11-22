import { useScheduleDispatch } from '../../../reducers/scheduleReducer';
import AppointmentCard from '../AppointmentCard/AppointmentCard';
import type { ScheduleState } from '../../../reducers/scheduleReducer';
import './ScheduleGrid.css';

interface ScheduleGridProps {
  scheduleState: ScheduleState;
  selectedCustomerId: number;
  openAddSectionModal: () => void;
  openAddApptModal: () => void;
}

function ScheduleGrid ({ scheduleState, selectedCustomerId, openAddSectionModal, openAddApptModal }: ScheduleGridProps) {

  const scheduleDispatch = useScheduleDispatch();
  const currentSchedule = scheduleState.schedules.find(schedule => schedule.id == scheduleState.selectedSchedule);
  const sectionIds: Array<number> = [];
  
  let i = 0;
  const sections = scheduleState.sections.map(section => {
    i++;
    sectionIds.push(section.id);
    return <span className="sectionTitles" key={section.id} style={{gridColumn: `${i + 1} / ${i + 2}`}}>{section.name}</span>
  });

  const appointments = scheduleState.appointments.map(appointment => {
    const column = sectionIds.findIndex(sectionId => sectionId == appointment.section);
    return <AppointmentCard key={appointment.id} appointmentInfo={appointment} j={column + 1} />
  });

  // scheduleState.sections.forEach(section => {
  //   j++;
  //   const filteredAppts = scheduleState.appointments.filter((appointment) => appointment.section == section.id);

  //   appointments = appointments.concat(filteredAppts.map(appt => {
  //     return <AppointmentCard key={appt.id} appointmentInfo={appt} j={j}/>
  //   }))
  // });

  return (
    <div id="scheduleGrid" style={{gridTemplateColumns: `100px repeat(${sections.length}, 1fr)`}}>
      <div id="title">
        <h2>{currentSchedule ? currentSchedule!.name : 'Schedule'}</h2>
        <input type="date" id="datepicker" value={scheduleState.date} onChange={(e) => scheduleDispatch({type: "changedDate", date: e.target.value})}/>
      </div>
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