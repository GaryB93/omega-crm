import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import AppointmentCard from "../pages/Schedule/AppointmentCard/AppointmentCard";
import displayPhone from "../utils/displayPhone";

describe('Appointment card component', () => {
  const appointment = {
    id: 1,
    date: '2025-10-14',
    startTime: '08:00:00',
    endTime: '09:00:00',
    description: 'Perform work here',
    section: 1,
    firstname: 'John',
    lastname: 'Smith',
    phone: '1234567890',
    textreminder: true,
  };

  it("should render the appointment information provided", () => {
    render(<AppointmentCard appointmentInfo={appointment} j={1}/>);
    const customerInfo = screen.queryByText(`${appointment.firstname} ${appointment.lastname} ${displayPhone(appointment.phone)}`);
    expect(customerInfo).toBeInTheDocument();
  });

  it('should render an edit button', () => {
    render(<AppointmentCard appointmentInfo={appointment} j={1}/>);
    const editButton = screen.getByRole('button', {name: /Edit/});
    expect(editButton).toBeInTheDocument();
  });

  it('should render a delete button that opens the Delete Appointment Modal', () => {
    render(<AppointmentCard appointmentInfo={appointment} j={1}/>);
    const deleteBtn = screen.getByRole('button', {name: /Delete/});
    expect(deleteBtn).toBeInTheDocument();
    fireEvent.click(deleteBtn);
    const modalTitle = screen.getByRole('heading', {name: /Delete Appointment/});
    expect(modalTitle).toBeInTheDocument();
  });
});