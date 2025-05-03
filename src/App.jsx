import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LiveCaptionApp from './LiveCaptionApp'
import VoiceInput from './components/voice-input'

function App() {
  const [count, setCount] = useState(0)

  return (
    <VoiceInput/>
  )
}

export default App
