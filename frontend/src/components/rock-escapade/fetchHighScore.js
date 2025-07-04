// fetchHighScore
import client from '../../utils/sanity';

export const fetchHighScore = async () => {
  const query = `*[_type == "highScore"][0]{
    score
  }`;

  const data = await client.fetch(query);
  return data?.score || 0;
};
