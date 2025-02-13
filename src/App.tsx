import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import RoutesComponent from './routes/Routes';

const App = () => {
  return (
    <Provider store={store}>
      <RoutesComponent />
    </Provider>
  );
};

export default App;
