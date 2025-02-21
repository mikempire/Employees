import { Outlet } from 'react-router-dom';
import Header from '../Header/Header.tsx';

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
