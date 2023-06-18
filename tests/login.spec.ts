import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';

test('user is logged in successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.performLogin('standard_user', 'secret_sauce');

    const inventoryPage = new InventoryPage(page);
    inventoryPage.assertShoppingCartIsVisible();
    inventoryPage.assertInventoryContainerIsVisible();
});

test('locked out user cannot login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.performLogin('locked_out_user', 'secret_sauce');
    await loginPage.assertLockedOutUser();
});
