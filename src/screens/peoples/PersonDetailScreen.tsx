import React, { Suspense, useEffect, useState } from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAppSelector } from 'store/storeHooks';

import Loading from '../../components/Loading';
import { RootStackParamList } from '../../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const PersonDetailScreen: React.FC<Props> = ({ route }) => {
  const { id } = route.params;

  // get people by passed param id
  const person = useAppSelector(s =>
    s.people.peoples.find(p => {
      if (!p || !p.url) return false;
      if (p.url === id) return true;
      const parts = p.url.split('/').filter(Boolean);
      return parts[parts.length - 1] === id;
    })
  );

  const [films, setFilms] = useState<string[]>([]);

  // used AbortController to. cancel ongoing requst when user unmount or leave the page so it will avoid dom update after moving to other screens

  useEffect(() => {
    const films = person?.films;
    if (!films) return;
    const controller = new AbortController();

    (async () => {
      try {
        // use all settle to handle both success and error then filter success scenarions by below filter
        const results = await Promise.allSettled(
          films.map(async (f: string) => {
            const res = await fetch(f, { signal: controller.signal });
            const json = await res.json();
            return json.title;
          })
        );

        const titles = results
          .filter((r): r is PromiseFulfilledResult<string> => r.status === 'fulfilled')
          .map(r => r.value);

        setFilms(titles);
      } catch (e: any) {
        if (e.name !== 'AbortError') {
          console.log('get films name error', e);
        }
      }
    })();

    // Clean up function
    return () => {
      controller.abort();
    };
  }, [person]);

  if (!person) return <Loading />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.title}>{person.name}</Text>
      <Text style={styles.row}>Height: {person.height}</Text>
      <Text style={styles.row}>Birth Year: {person.birth_year}</Text>
      <Text style={[styles.row, { marginTop: 12, fontWeight: '700' }]}>Films</Text>
      <Suspense fallback={<Loading />}>
        {films.length === 0 ? (
          <Text style={styles.row}>No films loaded</Text>
        ) : (
          films.map((t, i) => (
            <Text key={i} style={styles.row}>
              • {t}
            </Text>
          ))
        )}
      </Suspense>
    </ScrollView>
  );
};

export default PersonDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  row: { fontSize: 16, marginBottom: 6 },
});
