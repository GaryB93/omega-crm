import { useReducer } from "react";
import { customerReducer, initialCustomers, CustomerContext, CustomerDispatchContext,  } from "../reducers/customersReducer";

function CustomerProvider({ children }) {
  const [customerState, dispatch] = useReducer(customerReducer, initialCustomers);

  return (
    <CustomerContext.Provider value={customerState}>
      <CustomerDispatchContext.Provider value={dispatch}>
        {children}
      </CustomerDispatchContext.Provider>
    </CustomerContext.Provider>
  );
}

export default CustomerProvider;