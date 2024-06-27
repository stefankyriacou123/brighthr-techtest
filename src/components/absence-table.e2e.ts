import { test, expect } from '@playwright/test'

test('renders absence table with data', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  // This is not super specific, we're just making sure the data loads, as we've mocked the request,
  // we know that the order is always guaranteed, so we can just check the first row.
  await expect(page.getByText('Rahaf')).toBeVisible()
  await expect(page.getByText('Deckard')).toBeVisible()
  await expect(page.locator('text=Sickness').first()).toBeVisible()
  // nth(0) is the header, nth(1) is the first row.
  await expect(page.locator('text=Approved').nth(1)).toBeVisible()
  await expect(page.getByText('28/05/2022 05:39:06')).toBeVisible()
  await expect(page.getByText('06/06/2022 05:39:06')).toBeVisible()
})

test('pagination works', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  // This is not super specific, we're just making sure the data loads, as we've mocked the request,
  // we know that the order is always guaranteed, so we can just check the first row.
  await expect(page.getByText('Rahaf')).toBeVisible()
  await expect(page.getByText('Deckard')).toBeVisible()
  await expect(page.locator('text=Sickness').first()).toBeVisible()
  // nth(0) is the header, nth(1) is the first row.
  await expect(page.locator('text=Approved').nth(1)).toBeVisible()
  await expect(page.getByText('28/05/2022 05:39:06')).toBeVisible()
  await expect(page.getByText('06/06/2022 05:39:06')).toBeVisible()

  const button = page.getByRole('button', { name: 'next page button' })
  await button.click()

  // We just check the last row of the second page, as the data order is guaranteed,
  // and can be seen at `./src/mocks/absence.ts`.
  await expect(page.locator('text=Amiah').first()).toBeVisible()
  await expect(page.locator('text=Fenton').first()).toBeVisible()
  await expect(page.locator('text=Annual Leave').first()).toBeVisible()
  // nth(5) is the last row on the second page.
  await expect(page.locator('text=Approved').nth(5)).toBeVisible()
  await expect(page.getByText('08/06/2023 14:11:47')).toBeVisible()
  await expect(page.getByText('18/06/2023 14:11:47')).toBeVisible()
})

test('entries per page dropdown works', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  // This is not super specific, we're just making sure the data loads, as we've mocked the request,
  // we know that the order is always guaranteed, so we can just check the first row.
  await expect(page.getByText('Rahaf')).toBeVisible()
  await expect(page.getByText('Deckard')).toBeVisible()
  await expect(page.locator('text=Sickness').first()).toBeVisible()
  // nth(0) is the header, nth(1) is the first row.
  await expect(page.locator('text=Approved').nth(1)).toBeVisible()
  await expect(page.getByText('28/05/2022 05:39:06')).toBeVisible()
  await expect(page.getByText('06/06/2022 05:39:06')).toBeVisible()

  const dropdown = page.getByRole('combobox', { name: 'entries per page dropdown' })
  await dropdown.click()
  await page.waitForTimeout(300)

  const option = page.getByRole('option', { name: '50 entries' })
  await option.click()

  // Make sure we are rendering on a single page.
  await expect(page.getByText('Page 1 of 1')).toBeVisible()

  // We just check the last row of what would have been the second page, as the data order is guaranteed,
  // and can be seen at `./src/mocks/absence.ts`.
  await expect(page.locator('text=Amiah').first()).toBeVisible()
  await expect(page.locator('text=Fenton').first()).toBeVisible()
  await expect(page.locator('text=Annual Leave').first()).toBeVisible()
  // nth(5) is the last row on the second page.
  await expect(page.locator('text=Approved').nth(5)).toBeVisible()
  await expect(page.getByText('08/06/2023 14:11:47')).toBeVisible()
  await expect(page.getByText('18/06/2023 14:11:47')).toBeVisible()
})

test('column ordering works', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const actualNamesUnordered = await page.$$eval(
    '[data-id="table-data"] > div > div:first-child',
    items => items.map(item => item.textContent?.trim()),
  )

  const expectedNamesUnordered = [
    'Rahaf',     'Enya',
    'Raniya',    'Shrey',
    'Wesley',    'Shrey',
    'Josemaria', 'Reuben',
    'Raniya',    'Ryland',
  ]
  expect(actualNamesUnordered).toEqual(expectedNamesUnordered)

  const columnHeader = page.getByRole('button', { name: 'First Name' })
  await columnHeader.click()

  const actualNamesOrdered = await page.$$eval(
    '[data-id="table-data"] > div > div:first-child',
    items => items.map(item => item.textContent?.trim()),
  )

  const expectedNamesOrdered = [
    'Wesley',    'Shrey',
    'Shrey',     'Ryland',
    'Reuben',    'Raniya',
    'Raniya',    'Rahaf',
    'Josemaria', 'Josemaria',
  ]
  expect(actualNamesOrdered).toEqual(expectedNamesOrdered)

  await columnHeader.click()

  const actualNamesOrderReversed = await page.$$eval(
    '[data-id="table-data"] > div > div:first-child',
    items => items.map(item => item.textContent?.trim()),
  )

  const expectedNamesOrderReversed = [
    'Alexi',     'Alexi',
    'Amiah',     'Amiah',
    'Amiah',     'Enya',
    'Isla',      'Isla',
    'Jabez',     'Jabez',
  ]
  expect(actualNamesOrderReversed).toEqual(expectedNamesOrderReversed)
})
