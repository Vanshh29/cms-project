import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function WordTable({ data, onUpdate }) {
  return (
    <div className="table-container">
    <table>
      <thead>
        <tr>
          <th>Word (First Lang)</th>
          <th>Sentence (First Lang)</th>
          <th>Word (Second Lang)</th>
          <th>Sentence (Second Lang)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((word) => (
          <tr key={word.id}>
            <td>{word.wordFirstLang}</td>
            <td>{word.sentenceFirstLang}</td>
            <td>{word.wordSecondLang}</td>
            <td>{word.sentenceSecondLang}</td>
            <td>
              <button className="button" onClick={() => onUpdate(word.id)}>
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

function App() {
  const [words, setWords] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchWords();
  }, [page, search]);

  const fetchWords = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/words', {
        params: { page, limit, search },
      });
      setWords(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Words & Phrases CMS</h1>
      </header>

      <div className="App-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
        />

        <WordTable
          data={words}
          onUpdate={(id) => {
            console.log(`Editing word with ID: ${id}`);
          }}
        />

        <div className="pagination">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <span>
            Page {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
            disabled={page === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
