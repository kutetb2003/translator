const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const translate = require('translate-google');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/translate', async (req, res) => {
  const { url, sourceLanguage, targetLanguage } = req.body;

  try {
    // Launch a headless browser
    const browser = await puppeteer.launch();
    // Open a new page
    const page = await browser.newPage();
    // Navigate to the desired URL
    await page.goto(url);
  
    // Define the selector of the element whose outerHTML you want to get
    const elementSelector = 'html';
    await page.waitForSelector(elementSelector);
  
    // Get the outerHTML of the element
    const outerHTML = await page.evaluate((selector) => {
      const element = document.querySelector(selector);
      return element ? element.outerHTML : null;
    }, elementSelector);
  
    // Save the outerHTML to an HTML file
    const urlObj = new URL(url);
    const folderPath = path.join(__dirname, urlObj.hostname);
    console.log(folderPath);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    const filePath = path.join(folderPath, 'output.html');
    fs.writeFileSync(filePath, outerHTML);
    console.log('outerHTML saved to output.html');
  
    await browser.close();

    // Parse the HTML content using JSDOM
    const dom = new JSDOM(outerHTML);
    const document = dom.window.document;
    const NodeFilter = dom.window.NodeFilter;

    // Define translation function using translate-google
    async function translateText(text, from, to) {
      try {
        const result = await translate(text, { from, to });
        console.log(result) 
        return result; // Translated text
      } catch (error) {
        console.error('Error during translation:', error);
        return ''; // Return a default value or handle error differently
      }
    }

    // Translate text nodes
    const body = document.querySelector('body');
    const textNodes = [];
    const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node) {
        if (node.nodeValue.trim()) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_REJECT;
      }
    });

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    // Translate each text node concurrently using Promise.all
    const translationPromises = textNodes.map(node =>
      translateText(node.nodeValue.trim(), sourceLanguage, targetLanguage).then(translatedText => {
        node.nodeValue = translatedText;
      })
    );

    // Wait for all translations to complete
    await Promise.all(translationPromises);

    // Save translated HTML to a file
    const translatedHTML = dom.serialize();
    const translatedFilePath = path.join(folderPath, 'translatedOutput.html');
    fs.writeFileSync(translatedFilePath, translatedHTML);

    res.status(200).send(translatedHTML);
  } catch (error) {
    console.error('Error during translation:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/history', (req, res) => {
  const currentDir = __dirname;
  const history = [];

  // Hàm đệ quy để quét các thư mục
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && item !== 'node_modules') {
        // Nếu là thư mục và không phải node_modules, quét tiếp
        scanDirectory(fullPath);
      } else if (item === 'translatedOutput.html') {
        // Nếu tìm thấy file translatedOutput.html
        const relativePath = path.relative(currentDir, fullPath);
        const content = fs.readFileSync(fullPath, 'utf-8');
        history.push({
          path: relativePath,
          url: `/translated/${encodeURIComponent(relativePath)}` // URL để truy cập file
        });
      }
    }
  }

  // Bắt đầu quét từ thư mục hiện tại
  scanDirectory(currentDir);

  res.json(history);
});

// Thêm route để serve các file HTML đã dịch
app.get('/translated/:path(*)', (req, res) => {
  const filePath = path.join(__dirname, req.params.path);
  res.sendFile(filePath);
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
