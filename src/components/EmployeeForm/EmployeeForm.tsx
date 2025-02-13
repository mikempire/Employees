import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';
import { setEmployees } from '../../redux/employeeSlice.ts';
import InputMask from 'react-input-mask';
import ArchiveCheckbox from '../UI/ArchiveCheckbox.tsx';
import { Employee } from '../../types/types.ts';
import './EmployeeForm.scss';

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employees = useSelector((state: RootState) => state.employee.employees);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [role, setRole] = useState('cook');
  const [isArchive, setIsArchive] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const employee = id ? employees.find((emp) => emp.id === Number(id)) : null;

  const formatDateForInput = (date: string) => {
    const [day, month, year] = date.split('.');

    if (!day || !month || !year) {
      return '';
    }

    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };
  const formatDateForSave = (date: string) => {
    const [year, month, day] = date.split('-');
    return `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`;
  };

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setPhone(employee.phone);
      setBirthday(formatDateForInput(employee.birthday));
      setRole(employee.role || 'cook');
      setIsArchive(employee.isArchive);
    }
  }, [employee]);

  const handleSave = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name) newErrors.name = 'Имя обязательно';
    if (!phone) newErrors.phone = 'Телефон обязателен';
    if (!birthday) newErrors.birthday = 'Дата рождения обязательна';
    if (!role) newErrors.role = 'Должность обязательна';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formattedBirthday = formatDateForSave(birthday);

    const newEmployee: Employee = {
      id: id ? Number(id) : Date.now(),
      name,
      phone,
      birthday: formattedBirthday,
      role,
      isArchive,
    };

    const updatedEmployees = id
      ? employees.map((emp) => (emp.id === Number(id) ? newEmployee : emp))
      : [...employees, newEmployee];

    dispatch(setEmployees(updatedEmployees));
    navigate('/');
  };

  return (
    <div className="employee-form">
      <h2>{id ? 'Редактировать сотрудника' : 'Добавить нового сотрудника'}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>Имя</label>
          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Телефон</label>
          <InputMask
            mask="+7 (999) 999-99-99"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          >
            {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
              <input {...inputProps} type="tel" placeholder="Телефон" />
            )}
          </InputMask>
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>Дата рождения</label>
          <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
          {errors.birthday && <span className="error">{errors.birthday}</span>}
        </div>

        <div className="form-group">
          <label>Должность</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="cook">Повар</option>
            <option value="waiter">Официант</option>
            <option value="driver">Водитель</option>
          </select>
          {errors.role && <span className="error">{errors.role}</span>}
        </div>

        <div className="form-group">
          <ArchiveCheckbox checked={isArchive} onChange={(e) => setIsArchive(e.target.checked)} />
        </div>

        <button type="button" onClick={handleSave}>
          {id ? 'Сохранить' : 'Добавить'}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
