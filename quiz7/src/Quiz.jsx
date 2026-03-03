import { useState } from 'react'
import styles from './Quiz.module.css'

const LETTERS = ['A', 'B', 'C', 'D']

export default function Quiz({ questions, onFinish }) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)   // chosen option index
  const [revealed, setRevealed] = useState(false)  // feedback shown
  const [answers, setAnswers] = useState([])        // [{chosen, correct}]

  const q = questions[index]
  const total = questions.length
  const progress = ((index) / total) * 100

  function choose(optIdx) {
    if (revealed) return
    setSelected(optIdx)
  }

  function confirm() {
    if (selected === null || revealed) return
    setRevealed(true)
  }

  function next() {
    const newAnswers = [...answers, { chosen: selected, correct: q.answer }]
    if (index + 1 >= total) {
      onFinish(newAnswers)
    } else {
      setAnswers(newAnswers)
      setIndex(index + 1)
      setSelected(null)
      setRevealed(false)
    }
  }

  function optionState(i) {
    if (!revealed) return selected === i ? 'selected' : 'idle'
    if (i === q.answer) return 'correct'
    if (i === selected && selected !== q.answer) return 'wrong'
    return 'idle'
  }

  const isLast = index + 1 >= total
  const isCorrect = revealed && selected === q.answer

  return (
    <div className={styles.wrap}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.courseTag}>CSCE 314 &mdash; Midterm Prep</span>
        <span className={styles.counter}>{index + 1} / {total}</span>
      </div>

      {/* Progress */}
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>

      {/* Card */}
      <div className={styles.card}>
        <div className={styles.cardTop}>
          <span className={styles.qBadge}>Q{index + 1}</span>
          <span className={`${styles.typeBadge} ${q.type === 'tf' ? styles.tf : styles.mcq}`}>
            {q.type === 'tf' ? 'True / False' : 'Multiple Choice'}
          </span>
        </div>

        <p className={styles.questionText}>{q.text.includes('\n')
          ? q.text.split('\n').map((line, i) =>
              line.startsWith('f ') || line.startsWith('  ') || line.startsWith('omit') || line.startsWith('keep') || line.startsWith('a =') || line.startsWith('b =') || line.startsWith('c =')
                ? <code key={i} className={styles.inlineBlock}>{line}</code>
                : <span key={i}>{line}<br /></span>
            )
          : q.text
        }</p>

        {/* Options */}
        <div className={styles.options}>
          {q.options.map((opt, i) => {
            const state = optionState(i)
            return (
              <button
                key={i}
                className={`${styles.option} ${styles[state]}`}
                onClick={() => choose(i)}
                disabled={revealed}
              >
                <span className={styles.letter}>{LETTERS[i]}</span>
                <span className={styles.optText}>{opt}</span>
                {state === 'correct' && <span className={styles.icon}>✓</span>}
                {state === 'wrong'   && <span className={styles.icon}>✗</span>}
              </button>
            )
          })}
        </div>

        {/* Feedback */}
        {revealed && (
          <div className={`${styles.feedback} ${isCorrect ? styles.feedbackCorrect : styles.feedbackWrong}`}>
            <span className={styles.feedbackIcon}>{isCorrect ? '🎯' : '💡'}</span>
            <span>{q.explanation}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        {!revealed ? (
          <button
            className={styles.btnPrimary}
            onClick={confirm}
            disabled={selected === null}
          >
            Check Answer
          </button>
        ) : (
          <button className={styles.btnPrimary} onClick={next}>
            {isLast ? 'See Results →' : 'Next Question →'}
          </button>
        )}
      </div>

      {/* Dot nav */}
      <div className={styles.dots}>
        {questions.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === index ? styles.dotActive : i < index ? styles.dotDone : ''}`}
          />
        ))}
      </div>
    </div>
  )
}
