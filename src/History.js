import React, { useState, useEffect } from 'react';
import axios from 'axios';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/history');
        setHistory(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch history');
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main className="flex-grow p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-4">Translation History</h2>
        {history.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">No translation history found.</p>
        ) : (
          <ul className="space-y-4">
            {history.map((item, index) => (
              <li key={index} className="bg-zinc-100 dark:bg-zinc-700 p-4 rounded-lg shadow">
                <a
                  href={`http://localhost:5000${item.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {item.path}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default History;
