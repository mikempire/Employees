import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeList from '../components/EmployeeList.tsx';
import EmployeeForm from '../components/EmployeeForm.tsx';

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/employee/:id" element={<EmployeeForm />} />
        <Route path="/add" element={<EmployeeForm />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
