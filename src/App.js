import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import History from "./History";
const language = [
  { code: "af", name: "Afrikaans" },
  { code: "sq", name: "Albanian" },
  { code: "am", name: "Amharic" },
  { code: "ar", name: "Arabic" },
  { code: "hy", name: "Armenian" },
  { code: "az", name: "Azerbaijani" },
  { code: "eu", name: "Basque" },
  { code: "be", name: "Belarusian" },
  { code: "bn", name: "Bengali" },
  { code: "bs", name: "Bosnian" },
  { code: "bg", name: "Bulgarian" },
  { code: "ca", name: "Catalan" },
  { code: "ceb", name: "Cebuano" },
  { code: "ny", name: "Chichewa" },
  { code: "zh-CN", name: "Chinese (Simplified)" },
  { code: "zh-TW", name: "Chinese (Traditional)" },
  { code: "co", name: "Corsican" },
  { code: "hr", name: "Croatian" },
  { code: "cs", name: "Czech" },
  { code: "da", name: "Danish" },
  { code: "nl", name: "Dutch" },
  { code: "en", name: "English" },
  { code: "eo", name: "Esperanto" },
  { code: "et", name: "Estonian" },
  { code: "tl", name: "Filipino" },
  { code: "fi", name: "Finnish" },
  { code: "fr", name: "French" },
  { code: "fy", name: "Frisian" },
  { code: "gl", name: "Galician" },
  { code: "ka", name: "Georgian" },
  { code: "de", name: "German" },
  { code: "el", name: "Greek" },
  { code: "gu", name: "Gujarati" },
  { code: "ht", name: "Haitian Creole" },
  { code: "ha", name: "Hausa" },
  { code: "haw", name: "Hawaiian" },
  { code: "iw", name: "Hebrew" },
  { code: "hi", name: "Hindi" },
  { code: "hmn", name: "Hmong" },
  { code: "hu", name: "Hungarian" },
  { code: "is", name: "Icelandic" },
  { code: "ig", name: "Igbo" },
  { code: "id", name: "Indonesian" },
  { code: "ga", name: "Irish" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
  { code: "jw", name: "Javanese" },
  { code: "kn", name: "Kannada" },
  { code: "kk", name: "Kazakh" },
  { code: "km", name: "Khmer" },
  { code: "ko", name: "Korean" },
  { code: "ku", name: "Kurdish (Kurmanji)" },
  { code: "ky", name: "Kyrgyz" },
  { code: "lo", name: "Lao" },
  { code: "la", name: "Latin" },
  { code: "lv", name: "Latvian" },
  { code: "lt", name: "Lithuanian" },
  { code: "lb", name: "Luxembourgish" },
  { code: "mk", name: "Macedonian" },
  { code: "mg", name: "Malagasy" },
  { code: "ms", name: "Malay" },
  { code: "ml", name: "Malayalam" },
  { code: "mt", name: "Maltese" },
  { code: "mi", name: "Maori" },
  { code: "mr", name: "Marathi" },
  { code: "mn", name: "Mongolian" },
  { code: "my", name: "Myanmar (Burmese)" },
  { code: "ne", name: "Nepali" },
  { code: "no", name: "Norwegian" },
  { code: "or", name: "Odia (Oriya)" },
  { code: "ps", name: "Pashto" },
  { code: "fa", name: "Persian" },
  { code: "pl", name: "Polish" },
  { code: "pt", name: "Portuguese" },
  { code: "pa", name: "Punjabi" },
  { code: "ro", name: "Romanian" },
  { code: "ru", name: "Russian" },
  { code: "sm", name: "Samoan" },
  { code: "gd", name: "Scots Gaelic" },
  { code: "sr", name: "Serbian" },
  { code: "st", name: "Sesotho" },
  { code: "sn", name: "Shona" },
  { code: "sd", name: "Sindhi" },
  { code: "si", name: "Sinhala" },
  { code: "sk", name: "Slovak" },
  { code: "sl", name: "Slovenian" },
  { code: "so", name: "Somali" },
  { code: "es", name: "Spanish" },
  { code: "su", name: "Sundanese" },
  { code: "sw", name: "Swahili" },
  { code: "sv", name: "Swedish" },
  { code: "tg", name: "Tajik" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "th", name: "Thai" },
  { code: "tr", name: "Turkish" },
  { code: "uk", name: "Ukrainian" },
  { code: "ur", name: "Urdu" },
  { code: "ug", name: "Uyghur" },
  { code: "uz", name: "Uzbek" },
  { code: "vi", name: "Vietnamese" },
  { code: "cy", name: "Welsh" },
  { code: "xh", name: "Xhosa" },
  { code: "yi", name: "Yiddish" },
  { code: "yo", name: "Yoruba" },
  { code: "zu", name: "Zulu" },
];

const App = () => {
  const [url, setUrl] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("en");
  const [apiToken, setApiToken] = useState("");
  const [apiSelector, setApiSelector] = useState("google");
  const [history, setHistory] = useState([
    { url: "https://example1.com", sourceLanguage: "en", targetLanguage: "es" },
    { url: "https://example2.com", sourceLanguage: "fr", targetLanguage: "de" },
    { url: "https://example3.com", sourceLanguage: "zh", targetLanguage: "en" },
  ]);
  const [currentPage, setCurrentPage] = useState("home");

  const handleTranslate = async () => {
    try {
      const response = await axios.post("http://localhost:5000/translate", {
        url,
        sourceLanguage: "auto",
        targetLanguage,
      });

      if (response.status === 200) {
        const translatedHTML = response.data;
        // Xử lý kết quả dịch ở đây, ví dụ như hiển thị hoặc lưu vào trạng thái
        console.log("Translated HTML:", translatedHTML);
        alert("Translation complete. Check console for the translated HTML.");
      }
    } catch (error) {
      console.error("Error during translation:", error);
      alert("Translation failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 flex transition-colors duration-300">
      <div className="flex-grow flex flex-col">
        <header className="bg-blue-500 dark:bg-blue-700 text-white p-4 shadow-md w-full flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src="https://placehold.co/40x40"
              alt="Logo"
              className="h-10 w-10 rounded-full"
            />
            <h1 className="text-2xl md:text-4xl font-bold">
              Website Translator
            </h1>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <button
                  onClick={() => setCurrentPage("home")}
                  className="hover:underline"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage("history")}
                  className="hover:underline"
                >
                  History
                </button>
              </li>
            </ul>
          </nav>
        </header>
        {currentPage === "home" ? (
          <main className="flex-grow p-8">
            <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
              <p className="text-zinc-800 dark:text-zinc-200 text-lg md:text-xl leading-relaxed mb-4">
                Easily translate your website into multiple languages with our
                powerful and easy-to-use tools. Enhance your global reach
                effortlessly!
              </p>
              <div className="mt-6">
                <label
                  htmlFor="website-url"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                >
                  Website URL:
                </label>
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
                  <label
                    htmlFor="target-language"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                  >
                    Target Language:
                  </label>
                  <select
                    id="target-language"
                    name="target-language"
                    className="shadow focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-zinc-300 rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                  >
                    {language.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-6 flex space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="api-selector"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                  >
                    Translation API:
                  </label>
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
