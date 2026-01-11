import { test, expect } from "@playwright/test";

test("User can not log in with invalid both credentials", async ({ page }) => {
  // Go to login page
  await page.goto("/login");

  // Fill in wrong email / username
  await page.getByLabel("Email").fill("aleksa@gmail.com");
  // or: page.getByPlaceholder("Email")

  // Fill in wrong password
  await page.getByLabel("Password").fill("sifra");

  // Click login button
  await page.getByRole("button", { name: "Login" }).click();

     // Wait for page reload
  await page.waitForLoadState("networkidle");

  // Assert we are still on login page
  await expect(page).toHaveURL(/login/);

  // Assert inputs are now empty
  await expect(page.getByLabel("Email")).toHaveValue("");
  await expect(page.getByLabel("Password")).toHaveValue("");
});