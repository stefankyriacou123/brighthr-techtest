import { test, expect } from '@playwright/test'

test('loads', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { name: 'Absences' })).toBeVisible()
})

test('navigates to user absence list page and back again', async ({ page }) => {
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

  const link = page.getByRole('link', { name: 'Rahaf' })
  link.click()

  // Check the details page works.
  await expect(page.getByText('Rahaf Deckard')).toBeVisible()
  await expect(page.getByText('Start Date: 28/05/2022 05:39:06')).toBeVisible()
  await expect(page.getByText('End Date: 06/06/2022 05:39:06')).toBeVisible()
  await expect(page.getByText('Absence Type: Sickness')).toBeVisible()
  await expect(page.getByText('Approved: Approved')).toBeVisible()

  await page.goBack()

  // Make sure we can see the data from the list again after we go back.
  await expect(page.getByText('Rahaf')).toBeVisible()
  await expect(page.getByText('Deckard')).toBeVisible()
  await expect(page.locator('text=Sickness').first()).toBeVisible()
  // nth(0) is the header, nth(1) is the first row.
  await expect(page.locator('text=Approved').nth(1)).toBeVisible()
  await expect(page.getByText('28/05/2022 05:39:06')).toBeVisible()
  await expect(page.getByText('06/06/2022 05:39:06')).toBeVisible()
})
