import client from '../../utils/sanity';

type HS = { _id: string; _rev: string; score: number };
const ID = 'highscore';

// Cast once to keep TS happy across client versions
const c: any = client;

export async function updateHighScore(newScore: number) {
  try {
    await c.createIfNotExists({_id: ID, _type: 'highScore', score: 0});
    const doc: HS | null = await c.getDocument(ID);
    const current = doc?.score ?? 0;
    if (newScore <= current) return current;

    const updated: HS = await c
      .patch(ID)
      .ifRevisionId(doc!._rev)
      .set({score: newScore})
      .commit();

    return updated?.score ?? newScore;
  } catch (err) {
    console.error('[HS] update failed:', err);
    return null;
  }
}
