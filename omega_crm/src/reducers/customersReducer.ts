import { createContext, useContext } from "react";

export interface CustomerState {
  selectedCustomer: Customer;
  customers: Array<Customer>;
}

export interface Customer {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  textreminder: boolean;
}

export const initialCustomers: CustomerState = {
  selectedCustomer: {
    id: 0,
    firstname: "",
    lastname: "",
    phone: "",
    textreminder: false
  },
  customers: []
}

export const CustomerContext = createContext(initialCustomers);
export const CustomerDispatchContext = createContext();

export function customerReducer(customerState: CustomerState,
  action: { type: string; id?: number; customer?: Customer; customers?: Array<Customer>}) {
    switch (action.type) {
      case 'selected': {
        return {...customerState,
          selectedCustomer: action.customer,
          customers: [...customerState.customers]
        }
      }
      case 'clearSelected': {
        return {
          ...customerState,
          selectedCustomer: {
            id: 0,
            firstname: "",
            lastname: "",
            phone: "",
            textreminder: false
          },
          customers: [...customerState.customers]
        }
      }
      case 'saved': {
        const editedCustomer = customerState.customers.findIndex((customer)=> customer.id == action.customer!.id)
        if (editedCustomer == -1) {
          return {
            ...customerState,
            customers: [action.customer, ...customerState.customers]
          }
        }
        const customersCopy = [...customerState.customers];
        customersCopy[editedCustomer] = action.customer!;
        return {
          ...customerState,
          customers: customersCopy
        }
      }
      case 'retrieved': {
        return {
          ...customerState,
          customers: action.customers
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