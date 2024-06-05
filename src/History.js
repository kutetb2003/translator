import React from 'react';

const History = ({ history }) => {
  return (
    <main className="flex-grow p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-4">Translation History</h2>
        <ul className="space-y-4">
          {history.map((item, index) => (
            <li key={index} className="bg-zinc-100 dark:bg-zinc-700 p-4 rounded-lg shadow">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {item.url}
              </a>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                Translated from {item.sourceLanguage} to {item.targetLanguage}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default History;
