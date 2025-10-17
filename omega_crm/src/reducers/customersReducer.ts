import { createContext, useContext } from "react";
// import Customer from "../classes/Customer";

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
  selectedCustomer: {id: 0, firstname: "", lastname: "", phone: "", textreminder: false},
  customers: [{id: 0, firstname: "", lastname: "", phone: "", textreminder: false}]
}

export const CustomerContext = createContext(initialCustomers);
export const CustomerDispatchContext = createContext<React.ActionDispatch<[Action]>>(()=>{});

export type Action = 
  | { type: 'selected', customer: Customer }
  | { type: 'clearSelected' }
  | { type: 'saved', customer: Customer }
  | { type: 'retrieved', customers: Array<Customer> }

export function customerReducer(customerState: CustomerState, action: Action) {
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
        const editedCustomer = customerState.customers.findIndex((customer)=> customer.id == action.customer.id)
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
        throw Error('Unknown action in customersReducer');
      }
    }
}

export function useCustomers() {
  return useContext(CustomerContext);
}

export function useCustomerDispatch() {
  return useContext(CustomerDispatchContext);
}