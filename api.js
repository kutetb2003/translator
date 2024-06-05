const express = require('express');
const axios = require('axios');
const cors = require('cors');
const cheerio = require('cheerio');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/translate', async (req, res) => {
  const { url, language } = req.body;

  try {
    const response = await axios.get(url);
    const content = response.data;
    console.log(content)
    const $ = cheerio.load(content);
    let textContent = '';
    $('body').find('*').contents().each(function () {
      if (this.type === 'text') {
        textContent += ' ' + $(this).text();
      }
    });

    const encodedParams = new URLSearchParams();
    encodedParams.set('q', textContent); 
    encodedParams.set('target', language);
    encodedParams.set('source', "vi");


    const options = {
      method: 'POST',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': 'c6715578fdmshcad20d8bcbd1c44p1955c3jsnec5c6e1449cd',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      },
      data: encodedParams,
    };

    const translateResponse = await axios.request(options);
    const translatedText = translateResponse.data.data.translations[0].translatedText;
    console.log(translatedText)
    console.log(translateResponse.data)
    let translatedHtml = content;
    $('body').find('*').contents().each(function () {
      if (this.type === 'text') {
        translatedHtml = translatedHtml.replace($(this).text(), translatedText);
      }
    });

    res.send(translatedHtml);
  } catch (error) {
    console.error('Error translating the content:', error);
    res.status(500).send('Error translating the content');
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});






