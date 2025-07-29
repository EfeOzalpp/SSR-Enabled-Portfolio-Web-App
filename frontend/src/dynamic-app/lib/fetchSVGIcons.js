/* Fetch SVG icons */
import sanityClient from '../../utils/sanity';

export default async function fetchSVGIcons() {
  const query = '*[_type == "svgIcon"]{title, icon}';
  const icons = await sanityClient.fetch(query);
  return icons;
}

