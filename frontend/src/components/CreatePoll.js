import { useState } from 'react';
import { createPoll } from '../api/pollApi';

function CreatePoll() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [pollLink, setPollLink] = useState('');
  const [error, setError] = useState('');

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const filteredOptions = options.filter(opt => opt.trim() !== '');
    if (!question.trim() || filteredOptions.length < 2) {
      setError('Enter a question and at least 2 options');
      return;
    }
    try {
      const poll = await createPoll(question, filteredOptions);
      setPollLink(`${window.location.origin}/poll/${poll._id}`);
      setQuestion('');
      setOptions(['', '']);
    } catch (err) {
      setError('Failed to create poll');
    }
  };

  return (
    <div>
      <h2>Create a poll</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        {options.map((opt, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        ))}
        <button type="button" onClick={addOption}>+ Add option</button>
        <button type="submit">Create Poll</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {pollLink && (
        <p>Share this link: <a href={pollLink}>{pollLink}</a></p>
      )}
    </div>
  );
}

export default CreatePoll;