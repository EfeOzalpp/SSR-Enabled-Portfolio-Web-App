import React, { useEffect, useMemo, useRef } from 'react'
import BlockGGameOver from '../../components/rock-escapade/block-g-game-over'
import { updateHighScore } from '../../components/rock-escapade/updateHighScore'

type Props = {
  score: number | null
  highScore: number
  onRestart: () => void
  onHide: () => void
}

const GameOverController: React.FC<Props> = ({ score, highScore, onRestart, onHide }) => {
  const visible = score != null
  const isNewHigh = useMemo(() => (score ?? -Infinity) > highScore, [score, highScore])
  const submittedRef = useRef(false)

  useEffect(() => {
    if (!visible) {
      submittedRef.current = false
      return
    }
    if (score == null) return

    if (isNewHigh && !submittedRef.current) {
      submittedRef.current = true
      updateHighScore(score).catch((err) => console.error('[HS] update failed:', err))
    }
  }, [visible, score, isNewHigh])

  if (!visible || score == null) return null

  const handleRestart = () => {
    onRestart()
    onHide()
  }

  return (
    <BlockGGameOver
      onRestart={handleRestart}
      visibleTrigger={1}
      coins={score}
      newHighScore={isNewHigh}
    />
  )
}

export default GameOverController
