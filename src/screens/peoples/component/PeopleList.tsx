import React from 'react';
import { FlatList } from 'react-native';

import { Person } from 'store/people/type';

import Loading from '../../../components/Loading';

type Props = {
  items: Person[];
  renderItem: ({ item }: { item: Person }) => React.ReactElement | null;
  isFetching: boolean;
  loadMore?: () => void;
  keyExtractor?: (item: Person) => string;
};

const PeopleList: React.FC<Props> = ({ items, renderItem, isFetching, loadMore, keyExtractor }) => {
  return (
    <FlatList
      data={items}
      keyExtractor={keyExtractor ?? ((i: Person) => i.url)}
      refreshing={isFetching}
      renderItem={renderItem}
      onEndReached={loadMore}
      ListFooterComponent={isFetching ? <Loading /> : null}
    />
  );
};

export default PeopleList;
