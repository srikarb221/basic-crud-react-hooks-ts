import { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from '../components/navigation/navigation';
import Modal from '../components/confirmationModal/confirmationModal';
import Loading from '../components/loading/loading';
import { useAppState } from '../store/appStateProvider';
import ErrorToaster from '../components/errorToaster/errorToaster';

const ShowUsers = lazy(() => import('./showUsers/showUsers'));
const AddEditUser = lazy(() => import('../components/addEditUser/addEditUser'));


const App = () => {
  const { state } = useAppState();

  return (state.apiState.loading) ? <Loading /> : <Suspense fallback={<Loading />}>
    <Navigation />
    {state.modalState.showModal && <Modal />}
    <main style={{ paddingTop: "5rem" }}>
      <Switch>
        <Route exact path="/" component={ShowUsers} />
        <Route exact path="/create" component={AddEditUser} />
      </Switch>
      <ErrorToaster {...state.apiState.errors} />
    </main>
  </Suspense>
}

export default App;
