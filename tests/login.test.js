const { test, expect } = require('@playwright/test');

test('Kasutaja edukas sisselogimine', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.fill('#username', 'rasmus');
  await page.fill('#password', 'qwerty');
  await page.click('#login');
  
  // Kontrolli tervitussõnumit
  await expect(page.locator('body')).toContainText('Tere tulemast');
});


test('Vormide edukas esitamine', async ({ page }) => {
  await page.goto('http://localhost:3000/form');
  await page.fill('#name', 'Testija');
  await page.fill('#email', 'rasmus.klaaser@voco.com');
  await page.fill('#message', 'Test');
  await page.click('#esita');
  
  // Kontrolli edukuse sõnumit
  await expect(page.locator('body')).toContainText('Vorm saadeti edukalt');
});


test('Lehtede vahel navigeerimine', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('nav a[href="/form"]');
  await expect(page).toHaveURL('http://localhost:3000/form');
  
  await page.click('nav a[href="/contact"]');
  await expect(page).toHaveURL('http://localhost:3000/contact');
});


test('Kasutaja edukas sisselogimine õige parooliga', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.fill('#username', 'rasmus');
  await page.fill('#password', 'qwerty');
  await page.click('#login');
  
  // Kontrolli tervitussõnumit
  await expect(page.locator('body')).toContainText('Tere tulemast');
});

test('Kasutaja ebaõnnestumine sisse logides', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.fill('#username', 'rasmus');
  await page.fill('#password', 'qwert');
  await page.click('#login');
 
  await expect(page.locator('body')).toContainText('Vale kasutajanimi või parool');
});


test('Sisselogimine ebaõnnestub, kui kasutajanimi puudub', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.fill('#username', '')
  await page.fill('#password', 'qwerty');
  await page.click('#login');
  await expect(page.locator('body')).toContainText('Kasutajanimi on nõutud');
});


test('Sisselogimine ebaõnnestub, kui parool puudub', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.fill('#username', 'rasmus')
  await page.fill('#password', '');
  await page.click('#login');
  await expect(page.locator('body')).toContainText('Parool on nõutud');
});

