import { test, expect } from '@playwright/test'

test('professional layout fits desktop and mobile and respects reduced motion', async ({ page }) => {
  await page.route('**/api/homepage', async route => {
    const response = await route.fetch()
    const body = await response.json()
    body.data.hero.title = 'Beautiful spaces. Lasting impressions.'
    body.data.hero.sideImage = '/assets/interior-blue-feature-wall.jpg'
    body.data.hero.backgroundImage = '/assets/exterior-home-front.jpg'
    await route.fulfill({ response, json: body })
  })
  // Local editorial photos belong to this frontend, not the test API server.
  await page.route('**/assets/interior-blue-feature-wall.jpg', route => route.fulfill({ path: 'public/assets/interior-blue-feature-wall.jpg', contentType: 'image/jpeg' }))
  await page.route('**/assets/exterior-home-front.jpg', route => route.fulfill({ path: 'public/assets/exterior-home-front.jpg', contentType: 'image/jpeg' }))
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('http://localhost:5184')
  await expect(page.locator('h1')).toHaveText('Beautiful spaces. Lasting impressions.')
  await page.evaluate(() => document.fonts.ready)
  await expect(page.locator('.hero-project-image')).toBeVisible()
  await expect(page.locator('.hero-showcase')).toHaveCSS('opacity', '1')
  await page.screenshot({ path: '/tmp/crystal-design-desktop.png' })
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
  await page.setViewportSize({ width: 375, height: 900 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('.paint-surface')).toHaveCSS('transform', 'none')
  await page.screenshot({ path: '/tmp/crystal-design-mobile.png' })
})
