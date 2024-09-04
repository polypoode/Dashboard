import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='546039381904-a5l00vd8gn49hql4ain3sfq3bg0u1g0a.apps.googleusercontent.com'>
  <StrictMode>
    <App />
  </StrictMode>
  </GoogleOAuthProvider>
)
