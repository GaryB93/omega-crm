import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import CustomerPane from "../pages/Schedule/CustomerPane/CustomerPane";
import Customer from "../classes/Customer";
import displayPhone from "../utils/displayPhone";

describe('Customer pane', () => {

  const mockCustomerDispatch = vi.fn();

  it('should render a heading for descriptive purposes', () => {
    const customer = new Customer(0, "", "", "", false);
    render(<CustomerPane customer={customer} customerDispatch={mockCustomerDispatch} />);
    const heading = screen.getByRole('heading', {name: /Customer Selection/});
    expect(heading).toBeInTheDocument();
  });

  it('should render input elements with labels', () => {
    const customer = new Customer(0, "", "", "", false);
    render(<CustomerPane customer={customer} customerDispatch={mockCustomerDispatch} />);
    const firstName = screen.getByLabelText(/First Name:/);
    const lastName = screen.getByLabelText(/Last Name:/);
    const phone = screen.getByLabelText(/Phone:/);
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
  });

  it('should render input elements that are disabled', () => {
    const customer = new Customer(0, "", "", "", false);
    render(<CustomerPane customer={customer} customerDispatch={mockCustomerDispatch} />);
    const firstName = screen.getByLabelText(/First Name:/);
    const lastName = screen.getByLabelText(/Last Name:/);
    const phone = screen.getByLabelText(/Phone:/);
    expect(firstName).toBeDisabled();
    expect(lastName).toBeDisabled();
    expect(phone).toBeDisabled();
  });

  it('should render a button to clear the customer selection', () => {
    const customer = new Customer(0, "", "", "", false);
    render(<CustomerPane customer={customer} customerDispatch={mockCustomerDispatch} />);
    const clearBtn = screen.getByRole('button', {name: /Clear/});
    expect(clearBtn).toBeInTheDocument();
  })

  it('should not render customer information when a customer with an id of 0 is provided', () => {
    const firstname = "firstname";
    const lastname = "lastname";
    const phone = "1111111111";
    const customer = new Customer(0, firstname, lastname, phone, false);
    render(<CustomerPane customer={customer} customerDispatch={mockCustomerDispatch} />);
    const firstName = screen.queryByDisplayValue(firstname.toUpperCase());
    expect(firstName).not.toBeInTheDocument();
    const lastName = screen.queryByDisplayValue(lastname.toUpperCase());
    expect(lastName).not.toBeInTheDocument();
    const phoneNum = screen.queryByDisplayValue(displayPhone(phone));
    expect(phoneNum).not.toBeInTheDocument();
  });

  it('should render customer information when a customer with an id of not 0 is provided', () => {
    const firstname = "firstname";
    const lastname = "lastname";
    const phone = "1111111111";
    const customer = new Customer(1, firstname, lastname, phone, false);
    render(<CustomerPane customer={customer} customerDispatch={mockCustomerDispatch} />);
    const firstName = screen.getByDisplayValue(firstname.toUpperCase());
    expect(firstName).toBeInTheDocument();
    const lastName = screen.getByDisplayValue(lastname.toUpperCase());
    expect(lastName).toBeInTheDocument();
    const phoneNum = screen.getByDisplayValue(displayPhone(phone));
    expect(phoneNum).toBeInTheDocument();
  });

  it('should call the dispatch callback function provided when the button is clicked', () => {
    const customer = new Customer(0, "", "", "", false);
    render(<CustomerPane customer={customer} customerDispatch={mockCustomerDispatch} />);
    const clearBtn = screen.getByRole('button', {name: /Clear/});
    fireEvent.click(clearBtn);
    expect(mockCustomerDispatch).toBeCalled();
  });
})