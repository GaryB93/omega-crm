import type { Appointment } from "../../../reducers/scheduleReducer";

function AppointmentCard ({ appointmentInfo, j }: { appointmentInfo: Appointment, j: number }) {

  return (
    <div style={{gridColumn: `${j + 1} / ${j + 2}`}} className="appointmentCard">
      {appointmentInfo.firstname}
    </div>
  )
}

export default AppointmentCard;