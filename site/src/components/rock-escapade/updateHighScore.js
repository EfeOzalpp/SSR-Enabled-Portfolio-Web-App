// updateHighScore for block type g
import client from '../../utils/sanity';

export async function updateHighScore(newScore) {
  try {
    await client.createIfNotExists({
      _id: 'highscore',
      _type: 'highScore', // ensure casing matches schema
      score: 0,
    });

    const updated = await client
      .patch('highscore')
      .set({ score: newScore })
      .commit();

    console.log('High score updated:', updated.score);
    return updated.score;
  } catch (err) {
    console.error('Failed to update high score:', err);
    return null;
  }
}
