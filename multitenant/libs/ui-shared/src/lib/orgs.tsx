import { Icon } from '@iconify/react';
import { MyOrganizationRepresentation } from '@multitenant/phasetwo-orgs-api';

export const Organizations = ({
  applications,
}: {
  applications?: { [key: string]: MyOrganizationRepresentation } | null;
}) => {
  if (!applications) {
    return (
      <div className="mt-2 text-lg font-semibold">
        No access to applications.
      </div>
    );
  }

  const roles: {
    [key: string]: string[];
  } = {};

  Object.keys(applications).forEach((key) => {
    applications[key]?.roles?.forEach((role) => {
      roles[role] ? roles[role].push(key) : (roles[role] = [key]);
    });
  });

  return (
    <div>
      <h2 className="mt-6 text-2xl">Organizations Access</h2>
      {Object.keys(roles).map((role, index) => {
        return (
          <div className="mb-3 mt-4" key={index}>
            <h2 className="mb-2 text-xl">App: {role}</h2>
            <div className="flex justify-center gap-3 flex-wrap">
              {roles[role]?.map((appId) => {
                const app = applications[appId];
                return (
                  <div
                    className="shadow-sm rounded-lg p-4 w-64 mb-3 bg-fuchsia-200"
                    key={appId}
                  >
                    <h5 className="text-lg font-semibold">
                      {app?.displayName}
                    </h5>
                    <p className="text-sm">Name: {app?.name}</p>
                    <a
                      href="#" // Add link to app when known
                      className="text-blue-500 hover:underline text-sm mt-2 inline-flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon
                        icon="line-md:external-link-rounded"
                        className="w-4 h-4 mr-1"
                      />
                      Visit
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Organizations;
