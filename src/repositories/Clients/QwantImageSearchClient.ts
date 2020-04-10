// Warning this client doesn't works differently due to its CORS policy

import axios from 'axios';
import qs from 'qs';

import { SearchResultImage } from '@/types';

const baseURL = 'https://api.qwant.com/api/search/images';

const defaultParams = {
  count: 9,
  uiv: 4,
  t: 'images',
};

const client = axios.create({
  baseURL: `https://api.scraperapi.com/?api_key=57fce81e173fb271dcf43ffb4e6eee3e&url=${baseURL}`,
});

// Since we're using a proxy to bypass CORS the query params
// should be part of the url
client.interceptors.request.use((config) => {
  const params = Object.assign(defaultParams, config.params);

  // eslint-disable-next-line no-param-reassign
  config.url += `?${qs.stringify(params)}`;
  // eslint-disable-next-line no-param-reassign
  config.params = {};

  return config;
});

export default client;

interface SearchResponseData {
  data: {
    result: {
      total: number;
      items: {
        title: string;
        thumbnail: string;
        media_fullsize: string;
        media_preview: string;
      }[];
    };
  };
}

export const searchResponseTransformator = ({ data }: { data: SearchResponseData }):
SearchResultImage[] => {
  const images = data.data.result.items;
  const result: SearchResultImage[] = images.map((i) => {
    const image: SearchResultImage = { title: i.title, imageURL: i.thumbnail };
    return image;
  });
  return result;
};
