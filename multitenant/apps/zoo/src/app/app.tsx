import { AppLayout } from '@multitenant/ui-shared';
import { OidcInitializationGate } from '../oidc';
import { Auth } from './auth';

export function App() {
  return (
    <AppLayout appName="Zoo">
      <div className="pb-8 text-xl italic">Your current status is:</div>
      <OidcInitializationGate
        fallback={
          <div className="mb-6 text-2xl text-p2blue-700">
            Loading authentication…
          </div>
        }
      >
        <Auth />
      </OidcInitializationGate>
    </AppLayout>
  );
}
