import styles from './Results.module.css'

const LETTERS = ['A', 'B', 'C', 'D']

export default function Results({ questions, answers, onRetry }) {
  const correct = answers.filter(a => a.chosen === a.correct).length
  const wrong   = answers.filter(a => a.chosen !== a.correct && a.chosen !== null).length
  const total   = questions.length
  const pct     = Math.round((correct / total) * 100)

  const { grade, color, msg } = getGrade(pct)

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.courseTag}>CSCE 314 &mdash; Trees, Folds &amp; Instances</div>
        <h1 className={styles.title}>Results</h1>
      </div>

      {/* Score circle */}
      <div className={styles.scoreCard}>
        <div className={styles.circle} style={{ '--ring-color': color }}>
          <span className={styles.scoreBig}>{correct}</span>
          <span className={styles.scoreOf}>/ {total}</span>
        </div>
        <div className={styles.gradeLabel} style={{ color }}>{grade}</div>
        <div className={styles.pct}>{pct}%</div>
        <p className={styles.msg}>{msg}</p>

        <div className={styles.breakdown}>
          <div className={styles.bItem}>
            <span className={styles.bNum} style={{ color: '#4ade80' }}>{correct}</span>
            <span className={styles.bLabel}>Correct</span>
          </div>
          <div className={styles.bDivider} />
          <div className={styles.bItem}>
            <span className={styles.bNum} style={{ color: '#f87171' }}>{wrong}</span>
            <span className={styles.bLabel}>Wrong</span>
          </div>
          <div className={styles.bDivider} />
          <div className={styles.bItem}>
            <span className={styles.bNum} style={{ color: '#94a3b8' }}>{total - correct - wrong}</span>
            <span className={styles.bLabel}>Skipped</span>
          </div>
        </div>
      </div>

      {/* Review */}
      <div className={styles.reviewSection}>
        <h2 className={styles.reviewTitle}>Review</h2>
        {questions.map((q, i) => {
          const a = answers[i]
          const isCorrect = a?.chosen === q.answer
          return (
            <div key={i} className={`${styles.reviewCard} ${isCorrect ? styles.rcCorrect : styles.rcWrong}`}>
              <div className={styles.rcHeader}>
                <span className={styles.rcNum}>Q{i + 1}</span>
                <span className={styles.rcQ}>{q.text.split('\n')[0]}</span>
                <span className={`${styles.rcIcon} ${isCorrect ? styles.iconGreen : styles.iconRed}`}>
                  {isCorrect ? '✓' : '✗'}
                </span>
              </div>
              <div className={styles.rcAnswers}>
                <span className={styles.rcLabel}>Your answer:</span>
                <span className={`${styles.rcAnswer} ${isCorrect ? styles.ansGreen : styles.ansRed}`}>
                  {a?.chosen != null ? `${LETTERS[a.chosen]}. ${q.options[a.chosen]}` : '—'}
                </span>
                {!isCorrect && (
                  <>
                    <span className={styles.rcLabel}>Correct:</span>
                    <span className={`${styles.rcAnswer} ${styles.ansGreen}`}>
                      {LETTERS[q.answer]}. {q.options[q.answer]}
                    </span>
                  </>
                )}
              </div>
              <p className={styles.rcExplain}>{q.explanation}</p>
            </div>
          )
        })}
      </div>

      <button className={styles.retryBtn} onClick={onRetry}>
        Retake Quiz
      </button>
    </div>
  )
}

function getGrade(pct) {
  if (pct >= 90) return { grade: 'A', color: '#4ade80', msg: 'Outstanding — trees, folds, instances. You know it all!' }
  if (pct >= 80) return { grade: 'B', color: '#a3e635', msg: 'Solid work. A few gaps, but mostly there.' }
  if (pct >= 70) return { grade: 'C', color: '#facc15', msg: 'Decent. Re-read slide 5 and trace through the treeFold examples by hand.' }
  if (pct >= 60) return { grade: 'D', color: '#fb923c', msg: 'You got the basics but need more review.' }
  return { grade: 'F', color: '#f87171', msg: 'Head back to the slides — you\'ve got this next time.' }
}
