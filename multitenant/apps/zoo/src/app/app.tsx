import Auth from './auth';
import { AppLayout } from '@multitenant/ui-shared';

const appName = 'zoo';
// hard define it or pull from url or something
const tenant = 'local';

function App() {
  return <AppLayout Auth={Auth} appName={appName} appTenant={tenant} />;
}

export default App;
