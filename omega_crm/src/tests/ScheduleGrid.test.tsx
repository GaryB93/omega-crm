import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import ScheduleGrid from "../pages/Schedule/ScheduleGrid/ScheduleGrid";
import type { ScheduleState } from "../reducers/scheduleReducer";

describe('Schedule component', () => {
  const mockOpenAddSectionModal = vi.fn();
  const mockOpenAddAptModal = vi.fn();
  const scheduleState: ScheduleState = {
    selectedSchedule: 1,
    date: '2025-10-14',
    schedules: [
      {
        id: 1,
        name: 'Schedule 1'
      },
      {
        id: 2,
        name: 'Schedule 2'
      }
    ],
    sections: [
      {
        id: 1,
        name: 'Section 1'
      },
      {
        id: 2,
        name: 'Section 2'
      }
    ],
    appointments: [
      {
        id: 1,
        date: '2025-10-14',
        startTime: '08:00:00',
        endTime: '09:00:00',
        description: 'This is an appointment',
        section: 1,
        firstname: 'John',
        lastname: 'Smith',
        phone: '1111111111',
        textreminder: false
      },
      {
        id: 2,
        date: '2025-10-14',
        startTime: '08:00:00',
        endTime: '09:00:00',
        description: 'This is another appointment',
        section: 2,
        firstname: 'Jane',
        lastname: 'Doe',
        phone: '2222222222',
        textreminder: true
      }
    ],
  }

  it('should render a heading of the schedule name that is selected', () => {
    render(
      <ScheduleGrid scheduleState={scheduleState} selectedCustomerId={0} 
      openAddSectionModal={mockOpenAddSectionModal} openAddApptModal={mockOpenAddAptModal}/>
    );
    const heading = screen.getByRole('heading', {name: 'Schedule 1'});
    expect(heading).toBeInTheDocument();
  });

  it('should render section names for the schedule', () => {
    render(
      <ScheduleGrid scheduleState={scheduleState} selectedCustomerId={0} 
      openAddSectionModal={mockOpenAddSectionModal} openAddApptModal={mockOpenAddAptModal}/>
    );
    const sectionName1 = screen.getByText('Section 1');
    expect(sectionName1).toBeInTheDocument();
    const sectionName2 = screen.getByText('Section 2');
    expect(sectionName2).toBeInTheDocument();
  });

  it('should render a button to create appointments that is disabled if the selected customer ID is 0', () => {
    render(
      <ScheduleGrid scheduleState={scheduleState} selectedCustomerId={0} 
      openAddSectionModal={mockOpenAddSectionModal} openAddApptModal={mockOpenAddAptModal}/>
    );
    const createApptBtn = screen.getByRole('button', {name: /Create Appointment/});
    expect(createApptBtn).toBeDisabled();
  });

  it('should render a button to create appointments that is enabled if a customer has been selected', () => {
    render(
      <ScheduleGrid scheduleState={scheduleState} selectedCustomerId={1} 
      openAddSectionModal={mockOpenAddSectionModal} openAddApptModal={mockOpenAddAptModal}/>
    );
    const createApptBtn = screen.getByRole('button', {name: /Create Appointment/});
    expect(createApptBtn).not.toBeDisabled();
  });

  it('should render a button to add sections to the schedule', () => {
    render(
      <ScheduleGrid scheduleState={scheduleState} selectedCustomerId={1} 
      openAddSectionModal={mockOpenAddSectionModal} openAddApptModal={mockOpenAddAptModal}/>
    );
    const addSectionBtn = screen.getByRole('button', {name: /Add Section/});
    expect(addSectionBtn).toBeInTheDocument();
  });

  it('should call the function to open the Create Appointment Modal when the button is clicked', () => {
    render(
      <ScheduleGrid scheduleState={scheduleState} selectedCustomerId={1} 
      openAddSectionModal={mockOpenAddSectionModal} openAddApptModal={mockOpenAddAptModal}/>
    );
    const createApptBtn = screen.getByRole('button', {name: /Create Appointment/});
    fireEvent.click(createApptBtn);
    expect(mockOpenAddAptModal).toHaveBeenCalled();
  });

  it('should call the function to open the Add Section Modal when the button is clicked', () => {
    render(
      <ScheduleGrid scheduleState={scheduleState} selectedCustomerId={1} 
      openAddSectionModal={mockOpenAddSectionModal} openAddApptModal={mockOpenAddAptModal}/>
    );
    const addSectionBtn = screen.getByRole('button', {name: /Add Section/});
    fireEvent.click(addSectionBtn);
    expect(mockOpenAddSectionModal).toHaveBeenCalled();
  });
});