import './App.css';
import Customer from './features/customer/components/Customer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreditLoan from './features/loan/CreditLoan';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Customer />} />
        <Route path="/credit" element={<CreditLoan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
