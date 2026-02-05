import React, { useMemo, useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAddPeopleMutation, useLazyGetPeopleQuery } from 'services/peoples/index';
import { useAppSelector } from 'store/storeHooks';
import { Person } from 'store/people/type';

import Loading from '../../components/Loading';
import SearchBar from '../../components/SearchBar';
import PeopleAddForm from './component/PeopleAddForm';
import { RootStackParamList } from '../../navigation';

const PeopleList = lazy(() => import('./component/PeopleList'));
const Popup = lazy(() => import('../../components/Popup'));

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

type ListItemProps = { item: Person; onPress: (url: string) => void };

const PeopleListItem = React.memo(
  function PeopleListItem({ item, onPress }: ListItemProps) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => onPress(item.url)}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.year}>{item.birth_year || item.height}</Text>
      </TouchableOpacity>
    );
  },
  (prev, next) =>
    prev.item.url === next.item.url &&
    prev.item.name === next.item.name &&
    prev.item.birth_year === next.item.birth_year
);

const PeopleListScreen: React.FC<Props> = ({ navigation }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Test error boundry works
  // const [crash, setCrash] = React.useState(false);

  // if (crash) {
  //   throw new Error('Crashed after click');
  // }

  const [getPeople, { data, error, isLoading, isFetching }] = useLazyGetPeopleQuery();
  const [addPeople] = useAddPeopleMutation();

  const peoples = useAppSelector(s => s.people.peoples);

  useEffect(() => {
    getPeople({ page: page });
  }, [page, getPeople]);

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return peoples;
    return peoples.filter(p => {
      const name = (p.name || '').toLowerCase();
      return name.includes(q);
    });
  }, [peoples, search]);

  const items = filteredItems;

  const loadMore = useCallback(() => {
    // This stops when filtering locally, FlatList is firing onEndReached when all the item become visible.
    if (search.trim().length > 0) return;
    if (isFetching) return;
    if (!data?.next) return;

    setPage(p => p + 1);
  }, [search, isFetching, data?.next]);

  const clickOpenDetail = useCallback(
    (url: string) => {
      const id = url.split('/')[1] || '';
      navigation.navigate('Detail', { id });
    },
    [navigation]
  );

  const submitCreate = async (name: string, birth: string) => {
    const local: Person = {
      name: name,
      birth_year: birth,
      url: `local-${Date.now()}`,
    };

    // Call dummy endpoint to create new people
    addPeople(local);
    setModalVisible(false);
  };

  const renderItem = useCallback(
    ({ item }: { item: Person }) => <PeopleListItem item={item} onPress={clickOpenDetail} />,
    [clickOpenDetail]
  );

  return (
    <SafeAreaView style={[styles.container]} edges={['right', 'bottom', 'left']}>
      <View style={styles.header}>
        <SearchBar
          value={search}
          placeholder="Search by name"
          onChange={setSearch}
          onClear={() => setSearch('')}
        />
        <TouchableOpacity style={styles.createButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.createButton} onPress={() => setCrash(true)}>
          <Text style={styles.createButtonText}>Error</Text>
        </TouchableOpacity> */}
      </View>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <View style={styles.center}>
          <Text>Error loading data</Text>
        </View>
      ) : (
        <Suspense fallback={null}>
          <PeopleList
            items={items}
            renderItem={renderItem}
            isFetching={isFetching}
            loadMore={loadMore}
            keyExtractor={item => item.url}
          />
        </Suspense>
      )}

      {modalVisible && (
        <Suspense fallback={<Loading />}>
          <Popup
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            title="Create Person">
            <SafeAreaView style={styles.modal}>
              <PeopleAddForm
                onCancel={() => setModalVisible(false)}
                onSubmit={(name, birth) => {
                  submitCreate(name, birth);
                }}
              />
            </SafeAreaView>
          </Popup>
        </Suspense>
      )}
    </SafeAreaView>
  );
};

export default PeopleListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eee' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  createButton: {
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  createButtonText: { color: 'white' },
  item: {
    padding: 16,
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  title: { fontSize: 16, fontWeight: '700', color: '#111' },
  year: { color: '#666', marginTop: 4 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modal: { flex: 1, padding: 16 },
});
