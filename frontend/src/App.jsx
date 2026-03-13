import './App.css'
import LogInteractionForm from './components/LogInteractionForm'
import AIAssistantChat from './components/AIAssistantChat'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>HCP CRM System</h1>
      </header>
      <main className="app-main">
        <div className="content-wrapper">
          <div className="form-section">
            <LogInteractionForm />
          </div>
          <div className="chat-section">
            <AIAssistantChat />
          </div>
        </div>
      </main>

      <style jsx>{`
        .app {
          min-height: 100vh;
          background: #f5f7fa;
        }

        .app-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1.5rem 2rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .app-header h1 {
          margin: 0;
          font-size: 1.75rem;
          font-weight: 600;
        }

        .app-main {
          padding: 2rem;
          max-width: 1800px;
          margin: 0 auto;
        }

        .content-wrapper {
          display: flex;
          align-items: flex-start;
        }

        .form-section {
          flex: 3;
          min-width: 0;
        }

        .chat-section {
          flex: 1;
          position: sticky;
          top: 2rem;
          min-width: 0;
        }

        @media (max-width: 1200px) {
          .content-wrapper {
            flex-direction: column;
          }

          .form-section,
          .chat-section {
            flex: 1;
            width: 100%;
          }

          .chat-section {
            position: static;
          }
        }
      `}</style>
    </div>
  )
}

export default App
