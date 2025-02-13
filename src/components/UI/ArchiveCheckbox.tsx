import { FC } from 'react';
import './ArchiveCheckbox.scss';

interface ArchiveCheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ArchiveCheckbox: FC<ArchiveCheckboxProps> = ({ checked, onChange }) => {
  return (
    <label>
      В архиве:
      <input type="checkbox" checked={checked} onChange={onChange} />
    </label>
  );
};

export default ArchiveCheckbox;
