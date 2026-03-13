import { useState } from 'react';

const LogInteractionForm = () => {
  const [formData, setFormData] = useState({
    hcp_name: '',
    interaction_type: 'Meeting',
    date: '',
    time: '',
    attendees: '',
    topics_discussed: '',
    sentiment: 'Neutral',
    outcomes: '',
    follow_up_actions: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const interactionTypes = ['Meeting', 'Call', 'Email', 'Visit'];
  const sentiments = ['Positive', 'Neutral', 'Negative'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // TODO: Replace with actual API call
      console.log('Form submitted:', formData);
      
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ type: 'success', text: 'Interaction logged successfully!' });
      
      // Reset form
      setFormData({
        hcp_name: '',
        interaction_type: 'Meeting',
        date: '',
        time: '',
        attendees: '',
        topics_discussed: '',
        sentiment: 'Neutral',
        outcomes: '',
        follow_up_actions: ''
      });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to log interaction. Please try again.' });
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="log-interaction-form">
      <h2>Log HCP Interaction</h2>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="hcp_name">
            HCP Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="hcp_name"
            name="hcp_name"
            value={formData.hcp_name}
            onChange={handleChange}
            required
            placeholder="Enter healthcare professional name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="interaction_type">
            Interaction Type <span className="required">*</span>
          </label>
          <select
            id="interaction_type"
            name="interaction_type"
            value={formData.interaction_type}
            onChange={handleChange}
            required
          >
            {interactionTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">
              Date <span className="required">*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">
              Time <span className="required">*</span>
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="attendees">Attendees</label>
          <textarea
            id="attendees"
            name="attendees"
            value={formData.attendees}
            onChange={handleChange}
            rows="3"
            placeholder="List all attendees (comma-separated or line-separated)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="topics_discussed">Topics Discussed</label>
          <textarea
            id="topics_discussed"
            name="topics_discussed"
            value={formData.topics_discussed}
            onChange={handleChange}
            rows="4"
            placeholder="Describe the topics discussed during the interaction"
          />
        </div>

        <div className="form-group">
          <label htmlFor="sentiment">Sentiment</label>
          <select
            id="sentiment"
            name="sentiment"
            value={formData.sentiment}
            onChange={handleChange}
          >
            {sentiments.map(sentiment => (
              <option key={sentiment} value={sentiment}>
                {sentiment}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="outcomes">Outcomes</label>
          <textarea
            id="outcomes"
            name="outcomes"
            value={formData.outcomes}
            onChange={handleChange}
            rows="3"
            placeholder="Document the outcomes of the interaction"
          />
        </div>

        <div className="form-group">
          <label htmlFor="follow_up_actions">Follow-up Actions</label>
          <textarea
            id="follow_up_actions"
            name="follow_up_actions"
            value={formData.follow_up_actions}
            onChange={handleChange}
            rows="3"
            placeholder="List any follow-up actions required"
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Logging Interaction...' : 'Log Interaction'}
          </button>
        </div>
      </form>

      <style jsx>{`
        .log-interaction-form {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        h2 {
          margin-bottom: 1.5rem;
          color: #333;
          font-size: 1.75rem;
        }

        .message {
          padding: 1rem;
          margin-bottom: 1.5rem;
          border-radius: 4px;
          font-weight: 500;
        }

        .message.success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .message.error {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        label {
          margin-bottom: 0.5rem;
          color: #555;
          font-weight: 500;
          font-size: 0.95rem;
        }

        .required {
          color: #e74c3c;
        }

        input[type="text"],
        input[type="date"],
        input[type="time"],
        select,
        textarea {
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          font-family: inherit;
          transition: border-color 0.2s;
        }

        input[type="text"]:focus,
        input[type="date"]:focus,
        input[type="time"]:focus,
        select:focus,
        textarea:focus {
          outline: none;
          border-color: #4a90e2;
          box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
        }

        textarea {
          resize: vertical;
          min-height: 80px;
        }

        .form-actions {
          margin-top: 1rem;
          display: flex;
          justify-content: flex-end;
        }

        .btn-primary {
          padding: 0.75rem 2rem;
          background-color: #4a90e2;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .btn-primary:hover:not(:disabled) {
          background-color: #357abd;
        }

        .btn-primary:disabled {
          background-color: #a0c4e8;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .log-interaction-form {
            padding: 1.5rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LogInteractionForm;
