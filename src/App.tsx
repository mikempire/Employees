import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router.tsx';

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
