const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  // Launch a headless browser
  const browser = await puppeteer.launch();
  // Open a new page
  const page = await browser.newPage();
  // Navigate to the desired URL
  await page.goto('https://stackoverflow.com/questions/376723/getting-innertext-of-html-tags-using-regular-expressions');

  // Define the selector of the element whose outerHTML you want to get
  const elementSelector = 'html';
  await page.waitForSelector(elementSelector);

  // Get the outerHTML of the element
  const outerHTML = await page.evaluate((selector) => {
    const element = document.querySelector(selector);
    return element ? element.outerHTML : null;
  }, elementSelector);

  // Save the outerHTML to an HTML file
  fs.writeFileSync('output.html', outerHTML);

  console.log('outerHTML saved to output.html');

  await browser.close();
})();
