import ScheduleTabs from "./ScheduleTabs/ScheduleTabs";
import CustomerPane from "./CustomerPane/CustomerPane";
import DateSelection from "./DateSelection/DateSelection";
import ScheduleGrid from "./ScheduleGrid/ScheduleGrid";
import { useSchedules, useScheduleDispatch } from "../../reducers/scheduleReducer";
import Modal from "../../components/Modal/Modal";
import { useState, useEffect } from "react";
import NewSectionModal from "../../modals/NewSectionModal";
import NewScheduleModal from "../../modals/NewScheduleModal";
import NewApptModal from "../../modals/NewApptModal";
import scheduleAPI from "../../api/scheduleAPI";
import './Schedule.css';

function Schedule () {
  
  const scheduleState = useSchedules();
  const scheduleDispatch = useScheduleDispatch();
  const schedules = scheduleState.schedules;
  const selectedScheduleId = scheduleState.selectedSchedule;

  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false);
  const closeAddScheduleModal = () => setIsAddScheduleModalOpen(false);
  const openAddScheduleModal = () => setIsAddScheduleModalOpen(true);
  
  const [isAddSectionModallOpen, setIsAddSectionModallOpen] = useState(false);
  const closeAddSectionModal = () => setIsAddSectionModallOpen(false);
  const openAddSectionModal = () => setIsAddSectionModallOpen(true);

  const [isAddApptModalOpen, setIsAddApptModalOpen] = useState(false);
  const closeAddApptModal = () => setIsAddApptModalOpen(false);
  const openAddApptModal = () => setIsAddApptModalOpen(true);

  useEffect(() => {
    scheduleAPI.getSchedules(scheduleState.selectedSchedule, scheduleState.date)
    .then(result => {
      scheduleDispatch({
        type: "selected",
        id: result.selectedSchedule,
        schedules: result.schedules,
        sections: result.sections,
        appointments: result.appointments
      });
    })
    .catch(err => console.error(err));
  }, []);

  return (
    <div id="scheduleMainContainer">
      <div id="schedule">
        <ScheduleTabs 
          schedules={schedules}
          selectedId={selectedScheduleId}
          openAddScheduleModal={openAddScheduleModal}
        />
        <DateSelection />
        <ScheduleGrid 
          openAddSectionModal={openAddSectionModal}
          openAddApptModal={openAddApptModal}
        />
      </div>
      <CustomerPane />

      <Modal show={isAddScheduleModalOpen} onClose={closeAddScheduleModal}>
        <NewScheduleModal />
      </Modal>

      <Modal show={isAddSectionModallOpen} onClose={closeAddSectionModal}>
        <NewSectionModal />
      </Modal>

      <Modal show={isAddApptModalOpen} onClose={closeAddApptModal}>
        <NewApptModal closeAddApptModal={closeAddApptModal} />
      </Modal>
    </div>
  );
}

export default Schedule;