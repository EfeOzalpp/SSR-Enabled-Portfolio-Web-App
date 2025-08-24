// lib/fetchUser.ts
import sanityClient from '../../utils/sanity';

export const fetchImages = async (sortOption = 'default') => {
  let orderClause = '';
  switch (sortOption) {
    case 'titleAsc':  orderClause = '| order(title asc)'; break;
    case 'titleDesc': orderClause = '| order(title desc)'; break;
    case 'dateAsc':   orderClause = '| order(_createdAt asc)'; break;
    case 'dateDesc':  orderClause = '| order(_createdAt desc)'; break;
  }

  const query = `*[_type == "imageAsset"] ${orderClause} {
    _id,
    title,
    description,
    image1,         // keep full Sanity image object
    image2,         // same
    caption1,
    alt1,
    alt2,
    iconName
  }`;

  try {
    const data = await sanityClient.fetch(query);
    return data; // pass raw; AppMedia will render responsively
  } catch (error) {
    console.error('Error fetching images', error);
    return [];
  }
};
