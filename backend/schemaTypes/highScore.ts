// schemas/highScore.js
export default {
  name: 'highScore',
  title: 'High Score',
  type: 'document',
  fields: [
    {
      name: 'score',
      title: 'Score',
      type: 'number',
      initialValue: 0,
    },
  ],
};
