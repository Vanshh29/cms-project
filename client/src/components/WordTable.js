import React, { useState } from 'react';

const WordTable = ({ data, onUpdate }) => {
  // Track which row is being edited
  const [editingId, setEditingId] = useState(null);

  // This will hold the form data for the row being edited
  const [formData, setFormData] = useState({
    wordFirstLang: '',
    sentenceFirstLang: '',
    wordSecondLang: '',
    sentenceSecondLang: '',
  });

  // Called when user clicks "Edit" on a row
  const startEdit = (row) => {
    setEditingId(row.id);
    setFormData({
      wordFirstLang: row.wordFirstLang || '',
      sentenceFirstLang: row.sentenceFirstLang || '',
      wordSecondLang: row.wordSecondLang || '',
      sentenceSecondLang: row.sentenceSecondLang || '',
    });
  };

  // Cancel out of edit mode
  const cancelEdit = () => {
    setEditingId(null);
  };

  // Save changes by calling the onUpdate callback
  const saveEdit = () => {
    onUpdate(editingId, formData);
    setEditingId(null);
  };

  // Handle input changes in the edit form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <table border="1" width="100%" cellPadding="5" style={{ marginTop: '1rem' }}>
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
        {data.map((row) => {
          if (editingId === row.id) {
            // Edit mode for this row
            return (
              <tr key={row.id}>
                <td>
                  <input
                    name="wordFirstLang"
                    value={formData.wordFirstLang}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="sentenceFirstLang"
                    value={formData.sentenceFirstLang}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="wordSecondLang"
                    value={formData.wordSecondLang}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="sentenceSecondLang"
                    value={formData.sentenceSecondLang}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <button onClick={saveEdit}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </td>
              </tr>
            );
          } else {
            // Read-only mode for this row
            return (
              <tr key={row.id}>
                <td>{row.wordFirstLang}</td>
                <td>{row.sentenceFirstLang}</td>
                <td>{row.wordSecondLang}</td>
                <td>{row.sentenceSecondLang}</td>
                <td>
                  <button onClick={() => startEdit(row)}>Edit</button>
                </td>
              </tr>
            );
          }
        })}
      </tbody>
    </table>
  );
};

export default WordTable;
