
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { TaskManagmentState } from './context/taskManagementContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <TaskManagmentState>
      <App />
    </TaskManagmentState>
  </BrowserRouter>
)
