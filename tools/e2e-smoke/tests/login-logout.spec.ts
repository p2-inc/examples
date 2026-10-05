import { expect, test } from "@playwright/test";

const username = process.env.KC_USERNAME ?? "demo";
const password = process.env.KC_PASSWORD ?? "demo";

test("logs in and out through Keycloak", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Not authenticated.")).toBeVisible();

  await page.getByRole("button", { name: "Log in" }).click();

  await page.locator("#username").fill(username);
  await page.locator("#password").fill(password);
  await page.locator("#kc-login").click();

  await expect(page.getByText("Authenticated", { exact: true })).toBeVisible();
  await expect(
    page.getByLabel(/token \(decoded\)|claims/i).first(),
  ).toHaveValue(/"iss"/);

  await page.getByRole("button", { name: "Log out" }).click();
  await expect(page.getByText("Not authenticated.")).toBeVisible();
});
