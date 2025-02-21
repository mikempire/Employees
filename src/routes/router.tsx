import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/UI/Layout/Layout.tsx';
import EmployeeList from '../pages/EmployeeList/EmployeeList.tsx';
import EmployeeForm from '../pages/EmployeeForm/EmployeeForm.tsx';
import NotFound from '../pages/NotFound/NotFound.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <EmployeeList />,
      },
      {
        path: 'employee/:id',
        element: <EmployeeForm />,
      },
      {
        path: 'add',
        element: <EmployeeForm />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
