/* Sort by function and image fetch for the UI-cards */
import sanityClient from '../../utils/sanity';

export const fetchImages = async (sortOption = 'default') => {
  let orderClause = '';

  switch (sortOption) {
    case 'titleAsc':
      orderClause = '| order(title asc)';
      break;
    case 'titleDesc':
      orderClause = '| order(title desc)';
      break;
    case 'dateAsc':
      orderClause = '| order(_createdAt asc)';
      break;
    case 'dateDesc':
      orderClause = '| order(_createdAt desc)';
      break;
    default:
      orderClause = '';
  }

  const query = `*[_type == "imageAsset"] ${orderClause} {
    _id,
    title,
    description,
    image1,
    image2,
    caption1,
    alt1,
    alt2,
    url1,
    iconName
  }`;

  try {
    const data = await sanityClient.fetch(query);
    return data; // don't process URLs here
  } catch (error) {
    console.error('Error fetching images', error);
    return [];
  }
};

export default fetchImages;
