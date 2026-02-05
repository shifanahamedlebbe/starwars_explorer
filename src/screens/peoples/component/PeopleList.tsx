import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';

import { Person } from 'store/people/type';

import Loading from '../../../components/Loading';

type Props = {
  peoples: Person[];
  renderItem: ({ item }: { item: Person }) => React.ReactElement | null;
  isFetching: boolean;
  loadMore?: () => void;
  keyExtractor?: (item: Person) => string;
};

const PeopleList: React.FC<Props> = ({
  peoples,
  renderItem,
  isFetching,
  loadMore,
  keyExtractor,
}) => {
  return (
    <FlatList
      data={peoples}
      keyExtractor={keyExtractor ?? ((i: Person) => i.url)}
      refreshing={isFetching}
      renderItem={renderItem}
      onEndReached={loadMore}
      ListEmptyComponent={
        <View style={styles.center}>
          <Text style={styles.emptyTitle}> No people found</Text>
        </View>
      }
      ListFooterComponent={isFetching ? <Loading /> : null}
    />
  );
};

export default PeopleList;

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 20 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: 'black' },
});
