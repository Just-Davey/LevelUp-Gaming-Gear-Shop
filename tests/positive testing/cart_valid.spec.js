import { test, expect } from "@playwright/test";

test("User can buy a product", async ({ page }) => {
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

  // Added product to cart
  await page.locator('xpath=/html/body/div/main/div/section[2]/div/article[1]/div[2]/form/button').click();


  // Go to cart
  await page.getByRole('link', { name: 'Cart' }).click();

   // Assert we are on cart page
  await expect(page).toHaveURL(/cart/);

  // Go to checkout
  await page.getByRole('button', { name: 'Checkout' }).click();

  //Assert the cart is empty by showing "go to shop link (button)"
  await expect(page.getByRole('link', { name: 'Go to Shop' })).toBeVisible();

});