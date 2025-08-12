// src/utils/get-project-data.ts
import client from './sanity';

const queries: Record<string, string> = {
  'data-viz': `*[_type=="mediaBlock" && slug.current=="data-viz"][0]{
    mediaOne{ alt,image,video{ "webmUrl": webm.asset->url, "mp4Url": mp4.asset->url, poster } }
  }`,
  'ice-scoop': `*[_type=="mediaBlock" && slug.current=="ice-scoop"][0]{
    mediaOne{ alt,image,video{ "webmUrl": webm.asset->url, "mp4Url": mp4.asset->url, poster } },
    mediaTwo{ alt,image,video{ "webmUrl": webm.asset->url, "mp4Url": mp4.asset->url, poster } }
  }`,
  'rotary-lamp': `*[_type=="mediaBlock" && title match "Rotary Lamp"][0]{
    mediaOne{ alt,image,video{ asset->{url} } },
    mediaTwo{ alt,image,video{ asset->{url} } }
  }`,
  // add others as I go
};

export async function getProjectData(key: string) {
  const q = queries[key];
  if (!q) return null;
  try {
    return await client.fetch(q);
  } catch (e) {
    console.error(`[getProjectData] ${key} failed:`, e);
    return null;
  }
}
