import { test, expect } from "@playwright/test";

test("User can log in with valid credentials", async ({ page }) => {
  // Go to login page
  await page.goto("/login");

  // Fill email / username
  await page.getByLabel("Email").fill("aleksapetrovic2002@gmail.com");
  // or: page.getByPlaceholder("Email")

  // Fill password
  await page.getByLabel("Password").fill("sifrasifra12?");

  // Click login button
  await page.getByRole("button", { name: "Login" }).click();

  // Assert something that only logged-in users can see
  await expect(page.getByRole('link', { name: 'Cart' })).toBeVisible();
});