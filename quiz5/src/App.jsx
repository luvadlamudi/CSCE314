import { useState } from 'react'
import { questions } from './questions'
import Quiz from './Quiz'
import Results from './Results'
import './App.css'

export default function App() {
  const [answers, setAnswers] = useState([])
  const [done, setDone] = useState(false)

  function handleFinish(ans) {
    setAnswers(ans)
    setDone(true)
  }

  function handleRetry() {
    setAnswers([])
    setDone(false)
  }

  return (
    <div className="app">
      {done
        ? <Results questions={questions} answers={answers} onRetry={handleRetry} />
        : <Quiz questions={questions} onFinish={handleFinish} />
      }
    </div>
  )
}
