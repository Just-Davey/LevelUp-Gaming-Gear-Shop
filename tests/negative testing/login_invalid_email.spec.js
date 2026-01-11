import { test, expect } from "@playwright/test";

test("User can not log in with invalid email", async ({ page }) => {
  // Go to login page
  await page.goto("/login");

  // Fill wrong email / username
  await page.getByLabel("Email").fill("losmail@gmail.com");
  // or: page.getByPlaceholder("Email")

  // Fill password
  await page.getByLabel("Password").fill("sifrasifra12?");

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