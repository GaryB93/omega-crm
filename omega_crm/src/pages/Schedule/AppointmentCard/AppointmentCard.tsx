import type { Appointment } from "../../../reducers/scheduleReducer";
import getRow from "../../../utils/getRowStartEnd";
import './AppointmentCard.css';

function AppointmentCard ({ appointmentInfo, j }: { appointmentInfo: Appointment, j: number }) {

  return (
    <div className="appointmentCard"
        style={{
          gridColumn: `${j + 1} / ${j + 2}`,
          gridRow: `${getRow(appointmentInfo.startTime)} / ${getRow(appointmentInfo.endTime)}`
        }}
    >
      <span>{appointmentInfo.firstname} {appointmentInfo.lastname}</span>
      <span>{appointmentInfo.phone}</span>
      <button>Edit</button>
    </div>
  )
}

export default AppointmentCard;