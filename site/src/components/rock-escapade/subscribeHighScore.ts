import {useEffect, useState} from 'react';
import client from '../../utils/sanity';

type Doc = { _id: string; score: number };

const ID = 'highscore';
const QUERY = `*[_id == $id][0]{ _id, score }`;

export const useHighScoreSubscription = () => {
  const [highScore, setHighScore] = useState<number>(0);

  useEffect(() => {
    const params = {id: ID};

    client.fetch<Doc | null>(QUERY, params).then((doc) => {
      if (typeof doc?.score === 'number') setHighScore(doc.score);
    });

    const sub = client
      .listen(QUERY, params, {includeResult: true, visibility: 'query'})
      .subscribe((ev: any) => {
        const next = ev?.result?.score;
        if (typeof next === 'number') setHighScore(next);
      });

    return () => sub.unsubscribe?.();
  }, []);

  return highScore;
};
