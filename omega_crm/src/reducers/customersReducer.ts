import { createContext, useContext } from "react";

export interface CustomerState {
  selectedCustomerID: number | undefined;
  customers: Array<Customer>;
}

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  textReminder: boolean;
}

export const initialCustomers: CustomerState = {
  selectedCustomerID: 1,
  customers: [
    {
      id: 1,
      firstName: "John",
      lastName: "Smith",
      phone: "1111111111",
      textReminder: true
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Doe",
      phone: "2222222222",
      textReminder: false
    }
  ]
}

export const CustomerContext = createContext(initialCustomers);
export const CustomerDispatchContext = createContext();

export function customerReducer(customerState: CustomerState,
  action: { type: string; id?: number; customer?: Customer}) {
    switch (action.type) {
      case 'selected': {
        return {...customerState,
          selectedCustomerID: action.id
        }
      }
      case 'clearSelected': {
        return {
          ...customerState,
          selectedCustomerID: undefined
        }
      }
      case 'added': {
        return {
          ...customerState,
          customers: [...customerState.customers, action.customer]
        }
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
}

export function useCustomers() {
  return useContext(CustomerContext);
}

export function useCustomerDispatch() {
  return useContext(CustomerDispatchContext);
}