import { Handler } from 'aws-lambda';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { env } from '$amplify/env/spotify';

const api = SpotifyApi.withClientCredentials(env.CLIENT_ID, env.CLIENT_SECRET);

export const handler: Handler = async (event, context) => {
  const items = await api.search('The Beatles', ['artist']);
  return items.artists;
};
