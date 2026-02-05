import { Person } from 'store/people/type';

export type PeopleListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
};
