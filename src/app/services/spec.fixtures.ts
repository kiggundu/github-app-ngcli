import { User } from './github-adapter.service';

export const mockSearchResponse: {items: User[]} = {
  items: [
    {
      login: 'fredtest',
      avatar_url: 'http://example.com',
      html_url: 'http://example.com',
    },
    {
      login: 'bentest',
      avatar_url: 'http://example.com',
      html_url: 'http://example.com',
    }
  ]
};
