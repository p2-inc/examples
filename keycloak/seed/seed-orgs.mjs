const KEYCLOAK_URL = process.env.KEYCLOAK_URL ?? "http://localhost:8080/auth";
const REALM = "p2examples";
const CLIENT_ID = "seed-cli";
const CLIENT_SECRET = "seed-cli-local-dev-secret";

const organizations = [
  {
    name: "california",
    displayName: "California",
    roles: ["zoo", "aquarium"],
    members: { jane: ["zoo"], jacques: ["aquarium"] },
  },
  {
    name: "newyork",
    displayName: "New York",
    roles: ["zoo", "aquarium"],
    members: { jane: ["zoo", "aquarium"], jacques: ["aquarium"] },
  },
];

const base = `${KEYCLOAK_URL}/realms/${REALM}`;

async function getToken() {
  const response = await fetch(`${base}/protocol/openid-connect/token`, {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });
  if (!response.ok) {
    throw new Error(
      `Token request failed: ${response.status} ${await response.text()}`,
    );
  }
  return (await response.json()).access_token;
}

const token = await getToken();

async function api(method, url, body) {
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok && response.status !== 409) {
    throw new Error(
      `${method} ${url} failed: ${response.status} ${await response.text()}`,
    );
  }
  return response;
}

async function findUserId(username) {
  const response = await api(
    "GET",
    `${KEYCLOAK_URL}/admin/realms/${REALM}/users?exact=true&username=${encodeURIComponent(username)}`,
  );
  const [user] = await response.json();
  if (!user) throw new Error(`User "${username}" not found in realm ${REALM}`);
  return user.id;
}

async function findOrCreateOrganization({ name, displayName }) {
  const search = await api(
    "GET",
    `${base}/orgs?search=${encodeURIComponent(name)}`,
  );
  const existing = (await search.json()).find((org) => org.name === name);
  if (existing) return existing.id;

  const created = await api("POST", `${base}/orgs`, { name, displayName });
  const location = created.headers.get("Location");
  if (!location)
    throw new Error(
      `Organization "${name}" was created without a Location header`,
    );
  return location.split("/").pop();
}

for (const org of organizations) {
  const orgId = await findOrCreateOrganization(org);

  for (const role of org.roles) {
    await api("POST", `${base}/orgs/${orgId}/roles`, { name: role });
  }

  for (const [username, roles] of Object.entries(org.members)) {
    const userId = await findUserId(username);
    await api("PUT", `${base}/orgs/${orgId}/members/${userId}`);
    for (const role of roles) {
      await api("PUT", `${base}/orgs/${orgId}/roles/${role}/users/${userId}`);
    }
  }

  console.log(`Seeded organization "${org.name}" (${orgId})`);
}
