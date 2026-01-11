import { test, expect } from "@playwright/test";

test("User can not log in with invalid password", async ({ page }) => {
  // Go to login page
  await page.goto("/login");

  // Fill email / username
  await page.getByLabel("Email").fill("aleksapetrovic2002@gmail.com");
  // or: page.getByPlaceholder("Email")

  // Fill in wrong password
  await page.getByLabel("Password").fill("losaSifra");

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