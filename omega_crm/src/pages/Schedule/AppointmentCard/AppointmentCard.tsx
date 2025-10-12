import Modal from "../../../components/Modal/Modal";
import type { Appointment } from "../../../reducers/scheduleReducer";
import getRow from "../../../utils/getRowStartEnd";
import { useState } from "react";
import './AppointmentCard.css';
import EditApptModal from "../../../modals/EditApptModal";
import DeleteApptModal from "../../../modals/DeleteApptModal";
import displayPhone from "../../../utils/displayPhone";

function AppointmentCard ({ appointmentInfo, j }: { appointmentInfo: Appointment, j: number }) {

  const [isEditApptModalOpen, setIsEditApptModalOpen] = useState(false);
  const closeEditApptModal = () => setIsEditApptModalOpen(false);
  const openEditApptModal = () => setIsEditApptModalOpen(true);

  const [isDeleteApptModalOpen, setIsDeleteApptModalOpen] = useState(false);
  const closeDeleteApptModal = () => setIsDeleteApptModalOpen(false);
  const openDeleteApptModal = () => setIsDeleteApptModalOpen(true);

  return (
    <div className="appointmentCard"
        style={{
          gridColumn: `${j + 1} / ${j + 2}`,
          gridRow: `${getRow(appointmentInfo.startTime)} / ${getRow(appointmentInfo.endTime)}`
        }}
    >
      <div id="appointmentInfoContainer">
        <span>{appointmentInfo.firstname} {appointmentInfo.lastname} {displayPhone(appointmentInfo.phone)}</span>
        <span>{appointmentInfo.description}</span>
      </div>
      <div id="buttonContainer">
        <button className="secondaryBtn" onClick={openDeleteApptModal}>Delete</button>
        <button className="secondaryBtn" onClick={openEditApptModal}>Edit</button>
      </div>

      <Modal show={isEditApptModalOpen} onClose={closeEditApptModal}>
        <EditApptModal closeEditApptModal={closeEditApptModal} appointmentInfo={appointmentInfo}/>
      </Modal>

      <Modal show={isDeleteApptModalOpen} onClose={closeDeleteApptModal}>
        <DeleteApptModal closeDeleteApptModal={closeDeleteApptModal} appointmentInfo={appointmentInfo}/>
      </Modal>
    </div>
  )
}

export default AppointmentCard;