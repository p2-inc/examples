import { Button, Organizations } from '@multitenant/ui-shared';
import { useOidc } from '../oidc';
import { orgsApi } from '../orgs-api';

const appRole = 'aquarium';

export function Auth() {
  const oidc = useOidc();

  if (oidc.isUserLoggedIn) {
    const { decodedIdToken } = oidc;
    return (
      <>
        <div className="mb-2 text-2xl text-p2blue-700">Authenticated</div>
        <div className="mb-6 text-p2blue-700">
          <div>{decodedIdToken.name ?? decodedIdToken.preferred_username}</div>
          <div>{decodedIdToken.email}</div>
        </div>
        <Button onClick={() => oidc.logout({ redirectTo: 'home' })}>
          Log out
        </Button>
        <Organizations orgsApi={orgsApi} appRole={appRole} />
      </>
    );
  }

  return (
    <>
      <div className="mb-6 text-2xl text-p2blue-700">Not authenticated.</div>
      {oidc.initializationError && (
        <div className="mb-6 text-red-700">
          {oidc.initializationError.message}
        </div>
      )}
      <Button onClick={() => oidc.login()}>Log in</Button>
    </>
  );
}
