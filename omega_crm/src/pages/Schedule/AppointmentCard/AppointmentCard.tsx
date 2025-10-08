import Modal from "../../../components/Modal/Modal";
import type { Appointment } from "../../../reducers/scheduleReducer";
import getRow from "../../../utils/getRowStartEnd";
import { useState } from "react";
import './AppointmentCard.css';
import EditApptModal from "../../../modals/EditApptModal";

function AppointmentCard ({ appointmentInfo, j }: { appointmentInfo: Appointment, j: number }) {

  const [isEditApptModalOpen, setIsEditApptModalOpen] = useState(false);
  const closeEditApptModal = () => setIsEditApptModalOpen(false);
  const openEditApptModal = () => setIsEditApptModalOpen(true);

  return (
    <div className="appointmentCard"
        style={{
          gridColumn: `${j + 1} / ${j + 2}`,
          gridRow: `${getRow(appointmentInfo.startTime)} / ${getRow(appointmentInfo.endTime)}`
        }}
    >
      <span>{appointmentInfo.firstname} {appointmentInfo.lastname}</span>
      <span>{appointmentInfo.phone}</span>
      <div id="buttonContainer">
        <button onClick={openEditApptModal}>Edit</button>
        <button>Delete</button>
      </div>

      <Modal show={isEditApptModalOpen} onClose={closeEditApptModal}>
        <EditApptModal closeEditApptModal={closeEditApptModal} appointmentInfo={appointmentInfo}/>
      </Modal>
    </div>
  )
}

export default AppointmentCard;