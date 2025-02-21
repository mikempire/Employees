import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterRole, setFilterArchived } from '../../redux/employeeSlice.ts';
import { RootState } from '../../redux/store.ts';
import { Link } from 'react-router-dom';
import ArchiveCheckbox from '../../components/UI/ArchiveCheckbox/ArchiveCheckbox.tsx';
import './EmployeeList.scss';

const roleTranslations: { [key: string]: string } = {
  cook: 'Повар',
  waiter: 'Официант',
  driver: 'Водитель',
};

const EmployeeList = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state: RootState) => state.employee.filteredEmployees);
  const filter = useSelector((state: RootState) => state.employee.filter);
  const [sortOrder, setSortOrder] = useState<'name' | 'birthday'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilterRole(e.target.value));
  };

  const handleArchivedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterArchived(e.target.checked));
  };

  const handleSortChange = (field: 'name' | 'birthday') => {
    // вынести в Redux
    if (field === sortOrder) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortOrder(field);
      setSortDirection('asc');
    }
  };

  const sortedEmployees = [...employees].sort((a, b) => {
    if (sortOrder === 'name') {
      return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortOrder === 'birthday') {
      return sortDirection === 'asc'
        ? new Date(a.birthday).getTime() - new Date(b.birthday).getTime()
        : new Date(b.birthday).getTime() - new Date(a.birthday).getTime();
    }
    return 0;
  });

  return (
    <div className="employee-list">
      <h2>Список сотрудников</h2>
      <div className="employee-link">
        <Link to="/add">
          <button className="add-employee-btn">Добавить сотрудника</button>
        </Link>
      </div>

      <div className="filters">
        <div className="filter-group">
          <select onChange={handleRoleChange} value={filter.role}>
            <option value="">Все должности</option>
            {Object.keys(roleTranslations).map((role) => (
              <option key={role} value={role}>
                {roleTranslations[role]}
              </option>
            ))}
          </select>
          <ArchiveCheckbox checked={filter.isArchive} onChange={handleArchivedChange} />
        </div>

        <div className="sorting">
          <button
            onClick={() => handleSortChange('name')}
            className={sortOrder === 'name' ? 'active' : ''}
          >
            Сортировать по имени
            {sortOrder === 'name' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
          </button>
          <button
            onClick={() => handleSortChange('birthday')}
            className={sortOrder === 'birthday' ? 'active' : ''}
          >
            Сортировать по дате рождения
            {sortOrder === 'birthday' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
          </button>
        </div>
      </div>

      {employees.length > 0 ? (
        <table className="employee-table">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Должность</th>
              <th>Телефон</th>
            </tr>
          </thead>
          <tbody>
            {sortedEmployees.map(({ role, phone, id, name }) => (
              <tr key={id}>
                <td>
                  <Link to={`/employee/${id}`}>{name}</Link>
                </td>
                <td>{roleTranslations[role] || role}</td>
                <td>{phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="employee-empty">Нет сотрудников для отображения.</p>
      )}
    </div>
  );
};

export default EmployeeList;
