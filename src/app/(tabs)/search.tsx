import {
  FlatList,
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import TrackListItem from '../../components/TrackListItem';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

const query = gql`
  query MyQuery($q: String!) {
    search(q: "q") {
      tracks {
        items {
          id
          name
          album {
            id
            name
            images {
              height
              url
              width
            }
            artists {
              id
              name
            }
          }
        }
      }
    }
  }
`;

export default function SearchScreen() {
  const [search, setSearch] = useState('');

  const { data, loading, error } = useQuery(query, {
    variables: { q: search },
  });

  const tracks = data?.search?.tracks?.items || [];

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <FontAwesome name='search' size={16} color='grey' />
        <TextInput
          value={search}
          onChangeText={setSearch}
          style={styles.input}
          placeholder='What do you want to listen to?'
        />
        <Text onPress={() => setSearch('')} style={{ color: 'white' }}>
          Cancel
        </Text>
      </View>

      {loading && <ActivityIndicator />}
      {error && <Text>Failed to fetch tracks</Text>}

      <FlatList
        data={tracks}
        renderItem={({ item }) => <TrackListItem track={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#121314',
    padding: 8,
    marginHorizontal: 10,
    borderRadius: 5,
    color: 'white',
  },
});
