import { test, expect } from '@playwright/test'

const customFunctions = require("../tests/customFunctions.ts")

test.describe.serial('Purchase plan validations check', () => {
  test.slow()

  test('24 months Business plan credit card validations', async ({ page }) => {
    
    //variables used in the testing
    const cookieAcceptButton = page.getByRole('button', {name:'Accept'})
    const buttonClaimDeal = page.getByRole('button', { name: 'Claim Deal' })
    const buttonChoosePlan = page.getByRole('button', {name: "Choose plan"})
    const months24Selector = page.locator('#hcart-cart-period-selector').nth(2)
    const submitSecurePaymentButton = page.getByRole('button',{name:"Submit Secure Payment"})
    const emailErrorMessage = page.locator('.h-input__error').first()
    const passwordErrorMessage = page.locator('.h-input__error').nth(1)
    const emailAddressField = page.locator('.h-input__input').nth(0)
    const emaillAddressInput = customFunctions.generateRandomEmail(page)
    const passwordField = page.locator('.h-input__input').nth(1)
    const cardNumberError = page.locator('[class="error-message invalid"]').nth(0)
    const cardDateError = page.locator('[class="error-message invalid"]').nth(1)
    const cardCVCError = page.locator('[class="error-message invalid"]').nth(2)
    const cardFailedPaymentError = page.locator('#errors')
    const ccNumbersFrame = page.frameLocator('[data-processout-input="cc-number"] iframe')
    const ccNumbersSelector = ccNumbersFrame.locator('#processout-field').first()
    const cardHolderName = page.getByRole('textbox',{name:"Name on card"})
    const ccDateFrame = page.frameLocator('[data-processout-placeholder="MM / YY"] iframe')
    const ccDateSelector = ccDateFrame.getByPlaceholder('MM / YY')
    const ccCVCFrame =  page.frameLocator('[data-processout-input="cc-cvc"] iframe')
    const ccCVCSelector = ccCVCFrame.getByPlaceholder('CVC code')
    
    const passwordInput = 'Candidate22!'
    const cardCvcValue = '875'
    const cardFailedPaymentErrorMessage = 'The card 3DS check failed'
    const cardNumberErrorMessage = 'The card number is invalid.'
    const cardDateErrorMessage = 'The card expiry month is invalid.'
    const cardCVCErrorMessage = 'The card CVC is required.'
    const cardHolderNameValue = "Testing Name"
    const cardNumbersValue = '4111 1111 1111 1111'
    const cardDateValue = "04 27"
    
    
    //Confirmation that the user is on the correct site and product selection
    await page.goto('https://www.hostinger.com/')
    await expect(page).toHaveTitle(/Hostinger/)
    await expect(buttonClaimDeal).toHaveText("Claim deal")
    await buttonClaimDeal.click()
    await buttonChoosePlan.nth(1).click()
    
        //Second page validation and cookie policy
    await expect(page).toHaveTitle(/.*Cart*/)
    await expect(cookieAcceptButton).toHaveText("Accept")
    await cookieAcceptButton.click()


        // 24 months selection and email/password field validations
    await months24Selector.click()
    await page.waitForTimeout(1000)
    await submitSecurePaymentButton.click()
    await page.waitForTimeout(1000)
    await expect(emailErrorMessage).toHaveText('Enter your email to complete the purchase')
    await expect(passwordErrorMessage).toHaveText('Create your password')

    
        // Fill Email address and password to be available to enter credit card data
    await page.waitForTimeout(1000)
    await emailAddressField.click()
    await emailAddressField.fill(emaillAddressInput)
    await page.waitForTimeout(1000)
    await passwordField.click()
    await passwordField.fill(passwordInput)
    await page.waitForTimeout(1000)
    await submitSecurePaymentButton.click()

        
        //Credit card fields error messages validation
    await page.waitForTimeout(10000)
    // await expect(cardHolderNameErrorMessage).toHaveText('Name on card field is required')
    await expect(cardNumberError).toHaveText(cardNumberErrorMessage)
    await expect(cardDateError).toHaveText(cardDateErrorMessage)
    await expect(cardCVCError).toHaveText(cardCVCErrorMessage)

        //Credit card failed payment
    await cardHolderName.click()
    await cardHolderName.fill(cardHolderNameValue)

    await ccNumbersSelector.click()
    await ccNumbersSelector.fill(cardNumbersValue)

    await ccDateSelector.click()
    await ccDateSelector.fill(cardDateValue)

    await ccCVCSelector.click()
    await ccCVCSelector.fill(cardCvcValue)

    await submitSecurePaymentButton.click()
   

    await cardFailedPaymentError.click()
    await expect(cardFailedPaymentError).toHaveText(cardFailedPaymentErrorMessage)
});

})