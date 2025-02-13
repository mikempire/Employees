import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from '../types/types.ts';
import employeesData from '../assets/employees.json';

interface EmployeeState {
  employees: Employee[];
  filteredEmployees: Employee[];
  filter: {
    role: string;
    isArchive: boolean;
    name: string;
  };
}

const initialState: EmployeeState = {
  employees: employeesData,
  filteredEmployees: employeesData,
  filter: {
    role: '',
    isArchive: false,
    name: '',
  },
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployees(state, action: PayloadAction<Employee[]>) {
      state.employees = action.payload;
      state.filteredEmployees = filterEmployees(state);
    },
    setFilterRole(state, action: PayloadAction<string>) {
      state.filter.role = action.payload;
      state.filteredEmployees = filterEmployees(state);
    },
    setFilterArchived(state, action: PayloadAction<boolean>) {
      state.filter.isArchive = action.payload;
      state.filteredEmployees = filterEmployees(state);
    },
  },
});

const filterEmployees = (state: EmployeeState): Employee[] => {
  return state.employees.filter((employee) => {
    const { name, role, isArchive } = state.filter;
    return (
      (role ? employee.role === role : true) &&
      (isArchive ? employee.isArchive : true) &&
      (name ? employee.name.toLowerCase().includes(name.toLowerCase()) : true)
    );
  });
};

export const { setEmployees, setFilterRole, setFilterArchived } = employeeSlice.actions;

export default employeeSlice.reducer;
