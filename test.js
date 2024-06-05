const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  // Launch a headless browser
  const browser = await puppeteer.launch();
  // Open a new page
  const page = await browser.newPage();
  // Navigate to the desired URL
  await page.goto('https://www.blogspotvn.net/2024/05/hien-thi-noi-dung-an-khi-nhap-ma.html');

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

  // // Extract all stylesheets
  // const stylesheets = await page.evaluate(() => {
  //   const linkElements = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
  //   const styleElements = Array.from(document.querySelectorAll('style'));

  //   const links = linkElements.map(link => link.href);
  //   const styles = styleElements.map(style => style.innerHTML);

  //   return { links, styles };
  // });

  // // Fetch the content of the external stylesheets
  // const fetchStylesheetContent = async (url) => {
  //   const response = await page.goto(url);
  //   return await response.text();
  // };

  // const externalStyles = await Promise.all(stylesheets.links.map(fetchStylesheetContent));

  // // Combine inline and external styles
  // const combinedStyles = [...externalStyles, ...stylesheets.styles].join('\n');

  // // Save the combined styles to a CSS file
  // fs.writeFileSync('styles.css', combinedStyles);

  // console.log('CSS saved to styles.css');

  // Close the browser
  await browser.close();
})();
