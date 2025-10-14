import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import NewApptModal from "./NewApptModal";

describe.skip('New appointment form', () => {
  const mockedCloseAddApptModal = vi.fn();

  beforeEach(() => {
    render(<NewApptModal closeAddApptModal={mockedCloseAddApptModal}/>);
  })

  test('should render with a customer input that is disabled to show the name of the customer', () => {
    const customerInput = screen.getByLabelText(/Customer:$/);
    expect(customerInput).toBeDisabled();
  });
  
  test('form renders with a phone input that is disabled to show the phone number of the customer', () => {
    const phoneInput = screen.getByLabelText(/Phone:$/);
    expect(phoneInput).toBeDisabled();
  });

  test('form renders with a date input that is disabled to show the date the appointment will be scheduled for', () => {
    const dateInput = screen.getByLabelText(/Date:$/);
    expect(dateInput).toBeDisabled();
  });

  test('form renders with a select element to choose the start time of the appointment', () => {
    const startTimeSelect = screen.getByRole('combobox', {name: /Start Time:$/});
    expect(startTimeSelect).toBeInTheDocument();
  });

  test('form renders with a select element to choose the end time of the appointment', () => {
    const endTimeSelect = screen.getByRole('combobox', {name: /End Time:$/});
    expect(endTimeSelect).toBeInTheDocument();
  });

  test('form renders with a select element to choose the end time of the appointment', () => {
    const descriptionTextarea = screen.getByRole('textbox', {name: /Description of Work:$/});
    expect(descriptionTextarea).toBeInTheDocument();
  });

  test('form renders with a select element to choose the section the appointment is assigned to,', () => {
    const sectionSelect = screen.getByRole('combobox', {name: /Assigned Section:$/});
    expect(sectionSelect).toBeInTheDocument();
  });

  // test('form displays an error message if user tries submitting form without choosing a start time for the appointment', () => {
  //   // const startTimeSelect = screen.getByRole('combobox', {name: /Start Time:$/});
  //   const form = screen.getByRole('form', {name: ""});
  //   expect(form).toBeInTheDocument();
  //   fireEvent.submit(form);
  //   const errMsg = screen.getByRole('alert', {description: /Please choose a start time.$/});
  //   expect(errMsg).toBeInTheDocument();
  // })
});
