// Subscribe High Score
import { useEffect, useState } from 'react';
import client from '../../utils/sanity';

export const useHighScoreSubscription = () => {
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const query = `*[_type == "highScore"][0]{score}`;

    // Initial fetch
    client.fetch(query).then(data => {
      if (data?.score !== undefined) setHighScore(data.score);
    });

    // Subscribe to updates
    const subscription = client.listen(query).subscribe(update => {
      const newScore = update.result?.score;
      if (newScore !== undefined) {
        setHighScore(newScore);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return highScore;
};