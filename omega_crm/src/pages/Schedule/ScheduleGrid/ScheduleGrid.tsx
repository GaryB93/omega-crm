import { useSchedules } from '../../../reducers/scheduleReducer';
import './ScheduleGrid.css';

interface ScheduleGridProps {
  openAddSectionModal: () => void;
  openAddApptModal: () => void;
}

function ScheduleGrid ({ openAddSectionModal, openAddApptModal }: ScheduleGridProps) {

  const schedules = useSchedules();
  
  let i = 0;
  const sections = schedules.sections.map(section => {
    i++;
    return <h5 style={{gridColumn: `${i + 1} / ${i + 2}`}}>{section.name}</h5>
  });

  return (
    <div id="scheduleGrid" style={{gridTemplateColumns: `repeat(${sections.length + 1}, 1fr)`}}>
      <h3>Schedule Name</h3>
      <h4>Day(Date)</h4>
      <p id="eight" className="times">8:00AM</p>
      <p id="nine" className="times">9:00AM</p>
      <p id="ten" className="times">10:00AM</p>
      <p id="eleven" className="times">11:00AM</p>
      <p id="twelve" className="times">12:00AM</p>
      <p id="one" className="times">1:00PM</p>
      <p id="two" className="times">2:00PM</p>
      <p id="three" className="times">3:00PM</p>
      <p id="four" className="times">4:00PM</p>
      <p id="five" className="times">5:00PM</p>
      {sections}
      <button id="addSectionBtn" onClick={openAddSectionModal} style={{gridColumn: `${sections.length}`}}>Add Section</button>
      <button id="createApptBtn" onClick={openAddApptModal} style={{gridColumn: `${sections.length + 1}`}}>Create Appt</button>
    </div>
  )
}

export default ScheduleGrid;