
import './App.css';
import InvoiceForm from './InvoiceForm';
import React from 'react';

// useContext() and createContext()-->container

export const myContext = React.createContext()

function App() {

  const [currency, setCurrency] = React.useState("INR")
  const [tax, setTax] = React.useState(0)

  

  return (
    <div >
      <myContext.Provider value={{myCurrency : currency, myTax : tax}}>
        <InvoiceForm />
      </myContext.Provider>
     
    </div>
  );
}

export default App;
