import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPoll, votePoll } from '../api/pollApi';

function VotingPage() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [voted, setVoted] = useState(false);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getPoll(id)
      .then(setPoll)
      .catch(() => setError('Poll not found'));
  }, [id]);

  const handleVote = async (optionIndex) => {
    try {
      const updated = await votePoll(id, optionIndex);
      setPoll(updated);
      setSelected(optionIndex);
      setVoted(true);
    } catch (err) {
      setError('Failed to vote');
    }
  };

  if (error) return <p style={{ color: 'red', textAlign: 'center', marginTop: '40px' }}>{error}</p>;
  if (!poll) return <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading...</p>;

  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div style={{
      maxWidth: '420px',
      margin: '60px auto',
      background: '#fff',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      fontFamily: 'sans-serif'
    }}>
      <p style={{ fontSize: '13px', color: '#888', margin: '0 0 4px' }}>Poll</p>
      <h2 style={{ fontSize: '18px', margin: '0 0 20px', color: '#111' }}>{poll.question}</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {poll.options.map((opt, index) => {
          const percent = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
          const isSelected = selected === index;

          return (
            <div
              key={index}
              onClick={() => !voted && handleVote(index)}
              style={{
                position: 'relative',
                height: '44px',
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1px solid #e0e0e0',
                background: '#f3f4f6',
                cursor: voted ? 'default' : 'pointer'
              }}
            >
              {voted && (
                <div style={{
                  position: 'absolute',
                  left: 0, top: 0, bottom: 0,
                  width: `${percent}%`,
                  background: isSelected ? '#10B981' : '#A7F3D0',
                  transition: 'width 0.6s ease-out'
                }} />
              )}
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100%',
                padding: '0 14px',
                fontSize: '14px',
                fontWeight: isSelected ? 600 : 400,
                color: '#111'
              }}>
                <span>{isSelected && '✓ '}{opt.text}</span>
                {voted && <span>{percent}%</span>}
              </div>
            </div>
          );
        })}
      </div>

      {voted && (
        <p style={{ textAlign: 'center', fontSize: '12px', color: '#888', marginTop: '16px' }}>
          {totalVotes} vote{totalVotes !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}

export default VotingPage;