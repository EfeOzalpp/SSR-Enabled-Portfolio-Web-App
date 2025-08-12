// src/utils/sanity.ts
import { createClient, type SanityClient } from '@sanity/client';

const client: SanityClient = createClient({
  projectId: 'uyghamp6',
  dataset: 'production',
  apiVersion: '2023-01-01',
  token: process.env.REACT_APP_SANITY_TOKEN,
  useCdn: false,
});

export default client;
