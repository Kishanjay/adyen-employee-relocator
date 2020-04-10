import { SearchResultImage } from '@/types';
import Client, { searchResponseTransformator } from './Clients/QwantImageSearchClient';

export default {
  search(query: string): Promise<SearchResultImage[]> {
    return Client.request({
      url: '',
      method: 'GET',
      params: {
        q: query,
      },
    }).then(searchResponseTransformator);
  },
};
