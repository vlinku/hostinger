import { test, expect } from '@playwright/test';

const customFunctions = require("../tests/customFunctions.ts");



test.describe.serial('Purchase plan validations check', () => {
  test.slow();

  test('24 months Business plan validations', async ({ page }) => {
    const cookieAcceptButton = page.getByRole('button', {name:'Accept'});
    const buttonClaimDeal = page.getByRole('button', { name: 'Claim Deal' });
    const buttonChoosePlan = page.getByRole('button', {name: "Choose plan"});
    const months24Selector = page.locator('#hcart-cart-period-selector').nth(2);
    const submitSecurePaymentButton = page.getByRole('button',{name:"Submit Secure Payment"})
    const emailErrorMessage = page.locator('.h-input__error').first()
    const passwordErrorMessage = page.locator('.h-input__error').nth(1)

    const emailAddressField = page.locator('.h-input__input').nth(0);
    const emaillAddressInput = customFunctions.generateRandomEmail(page);

    const passwordField = page.locator('.h-input__input').nth(1);
    const passwordInput = 'Candidate22!';
   

    const cardHolderNameErrorMessage = page.locator('[class="error-message invalid"]').nth(0);
    const cardNumberErrorMessage = page.locator('[class="error-message invalid"]').nth(1);
    const cardDateErrorMessage = page.locator('[class="error-message invalid"]').nth(2);
    const cardCVCErrorMessage = page.locator('[class="error-message invalid"]').nth(3);
    
    
    
    await page.goto('https://www.hostinger.com/');
    await expect(page).toHaveTitle(/Hostinger/);
    await expect(buttonClaimDeal).toHaveText("Claim Deal");
    await buttonClaimDeal.click();
    await buttonChoosePlan.nth(1).click()
    
        //Second page validation and Cookie policy acceptance
    await expect(page).toHaveTitle(/.*Cart*/)
    await expect(cookieAcceptButton).toHaveText("Accept");
    await cookieAcceptButton.click();


        // 24 months selection and email/password field validations
    await months24Selector.click();
    await page.waitForTimeout(1000);
    await submitSecurePaymentButton.click();
    await page.waitForTimeout(1000);
    await expect(emailErrorMessage).toHaveText('Enter your email to complete the purchase');
    await expect(passwordErrorMessage).toHaveText('Create your password');

    
        // Fill Email address and password to be available to enter credit card data
    await page.waitForTimeout(1000);
    await emailAddressField.click();
    await emailAddressField.fill(emaillAddressInput);
    await page.waitForTimeout(1000);
    await passwordField.click();
    await passwordField.fill(passwordInput);
    await page.waitForTimeout(1000);
    await submitSecurePaymentButton.click();

        
        //Credit card validation
    await page.waitForTimeout(10000);
    await expect(cardHolderNameErrorMessage).toHaveText('Name on card field is required');
    await expect(cardNumberErrorMessage).toHaveText('The card number is invalid.');
    await expect(cardDateErrorMessage).toHaveText('The card expiry month is invalid.');
    await expect(cardCVCErrorMessage).toHaveText('The card CVC is required.');

  });

})