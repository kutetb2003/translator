import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import History from './History';

const App = () => {
  const [url, setUrl] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [apiToken, setApiToken] = useState('');
  const [apiSelector, setApiSelector] = useState('google');
  const [history, setHistory] = useState([
    { url: 'https://example1.com', sourceLanguage: 'en', targetLanguage: 'es' },
    { url: 'https://example2.com', sourceLanguage: 'fr', targetLanguage: 'de' },
    { url: 'https://example3.com', sourceLanguage: 'zh', targetLanguage: 'en' },
  ]);
  const [currentPage, setCurrentPage] = useState('home');

  const handleTranslate = async () => {
    try {
      const axios = require('axios');

    const encodedParams = new URLSearchParams();
    encodedParams.set('q', 'Hello, world!');
    encodedParams.set('target', 'es');
    encodedParams.set('source', 'en');

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

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
      const translatedContent = response.data;
      const newWindow = window.open();
      newWindow.document.write(translatedContent);
      newWindow.document.close();

      // Cập nhật lịch sử
      setHistory([...history, { url, sourceLanguage, targetLanguage }]);
    } catch (error) {
      console.error('Error translating the content:', error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 flex transition-colors duration-300">
      <div className="flex-grow flex flex-col">
        <header className="bg-blue-500 dark:bg-blue-700 text-white p-4 shadow-md w-full flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="https://placehold.co/40x40" alt="Logo" className="h-10 w-10 rounded-full" />
            <h1 className="text-2xl md:text-4xl font-bold">Website Translator</h1>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><button onClick={() => setCurrentPage('home')} className="hover:underline">Home</button></li>
              <li><button onClick={() => setCurrentPage('history')} className="hover:underline">History</button></li>
            </ul>
          </nav>
        </header>
        {currentPage === 'home' ? (
          <main className="flex-grow p-8">
            <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
              <p className="text-zinc-800 dark:text-zinc-200 text-lg md:text-xl leading-relaxed mb-4">
                Easily translate your website into multiple languages with our powerful and easy-to-use tools. Enhance your global reach effortlessly!
              </p>
              <div className="mt-6">
                <label htmlFor="website-url" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Website URL:</label>
                <input
                  type="url"
                  id="website-url"
                  name="website-url"
                  className="shadow focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-zinc-300 rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-white dark:placeholder-zinc-400"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div className="mt-6 flex space-x-4">
                <div className="flex-1">
                  <label htmlFor="source-language" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Source Language:</label>
                  <select
                    id="source-language"
                    name="source-language"
                    className="shadow focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-zinc-300 rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                    value={sourceLanguage}
                    onChange={(e) => setSourceLanguage(e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh">Chinese</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label htmlFor="target-language" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Target Language:</label>
                  <select
                    id="target-language"
                    name="target-language"
                    className="shadow focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-zinc-300 rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh">Chinese</option>
                    <option value="it">Italian</option>
                    <option value="ja">Japanese</option>
                    <option value="ru">Russian</option>
                    <option value="ar">Arabic</option>
                    <option value="ko">Korean</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex space-x-4">
                <div className="flex-1">
                  <label htmlFor="api-selector" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Translation API:</label>
                  <select
                    id="api-selector"
                    name="api-selector"
                    className="shadow focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-zinc-300 rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                    value={apiSelector}
                    onChange={(e) => setApiSelector(e.target.value)}
                  >
                    <option value="google">Google Translate</option>
                    <option value="microsoft">Microsoft Translator</option>
                    <option value="deepl">DeepL</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label htmlFor="api-token" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">API Token:</label>
                  <input
                    type="text"
                    id="api-token"
                    name="api-token"
                    className="shadow focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-zinc-300 rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-white dark:placeholder-zinc-400"
                    placeholder="Enter your API token"
                    value={apiToken}
                    onChange={(e) => setApiToken(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleTranslate}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Start Translating
                </button>
              </div>
            </div>
          </main>
        ) : (
          <History history={history} />
        )}
        <footer className="bg-zinc-200 dark:bg-zinc-800 text-center p-4 text-sm text-zinc-600 dark:text-zinc-400 w-full">
          © 2023 Website Translator. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default App;
