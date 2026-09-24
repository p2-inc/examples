import type { MyOrganizations, OrgsApi } from '@multitenant/api-manager';
import type { MyOrganizationRepresentation } from '@multitenant/phasetwo-orgs-api';
import { useEffect, useState } from 'react';

type State =
  | { status: 'loading' }
  | { status: 'loaded'; organizations: MyOrganizations }
  | { status: 'failed'; message: string };

function organizationLabel(organization: MyOrganizationRepresentation) {
  return organization.displayName || organization.name || '';
}

export function Organizations({
  orgsApi,
  appRole,
}: {
  orgsApi: OrgsApi;
  appRole: string;
}) {
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    let active = true;
    orgsApi.getMyOrganizations().then(
      (organizations) => {
        if (active) {
          setState({ status: 'loaded', organizations });
        }
      },
      (error: unknown) => {
        if (active) {
          setState({
            status: 'failed',
            message: error instanceof Error ? error.message : String(error),
          });
        }
      },
    );
    return () => {
      active = false;
    };
  }, [orgsApi]);

  let content;
  if (state.status === 'loading') {
    content = (
      <p className="mt-6 text-center text-slate-600">
        Loading your organizations…
      </p>
    );
  } else if (state.status === 'failed') {
    content = (
      <p className="mt-6 text-center text-red-700">
        Could not load your organizations: {state.message}
      </p>
    );
  } else {
    const organizations = Object.entries(state.organizations).sort(
      ([, a], [, b]) =>
        organizationLabel(a).localeCompare(organizationLabel(b)),
    );
    content =
      organizations.length === 0 ? (
        <p className="mt-6 text-center text-slate-600">
          You are not a member of any organization.
        </p>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {organizations.map(([id, organization]) => (
            <OrganizationCard
              key={id}
              organization={organization}
              appRole={appRole}
            />
          ))}
        </ul>
      );
  }

  return (
    <section className="mt-12 text-left">
      <h2 className="text-center text-2xl text-p2blue-700">
        Your organizations
      </h2>
      <p className="mt-2 text-center text-slate-600">
        Each organization is a tenant. The{' '}
        <span className="font-semibold">{appRole}</span> role in an organization
        lets you use this app for that tenant.
      </p>
      {content}
    </section>
  );
}

function OrganizationCard({
  organization,
  appRole,
}: {
  organization: MyOrganizationRepresentation;
  appRole: string;
}) {
  const roles = organization.roles ?? [];
  const hasAccess = roles.includes(appRole);

  return (
    <li
      aria-label={organizationLabel(organization)}
      className={`rounded-2xl bg-white/80 p-5 shadow-sm ring-1 ${hasAccess ? 'ring-p2blue-500' : 'ring-slate-200'}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {organizationLabel(organization)}
          </h3>
          <p className="text-sm text-slate-500">{organization.name}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${hasAccess ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}
        >
          {hasAccess ? `Access to ${appRole}` : `No access to ${appRole}`}
        </span>
      </div>
      <p className="mt-4 text-xs font-semibold tracking-wide text-slate-500 uppercase">
        Roles
      </p>
      {roles.length === 0 ? (
        <p className="mt-2 text-sm text-slate-500">No roles</p>
      ) : (
        <ul className="mt-2 flex flex-wrap gap-2">
          {roles.map((role) => (
            <li
              key={role}
              className={`rounded-md px-2 py-1 text-sm ${role === appRole ? 'bg-p2blue-700 text-white' : 'bg-p2blue-200 text-p2blue-900'}`}
            >
              {role}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
