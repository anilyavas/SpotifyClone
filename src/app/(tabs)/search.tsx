import { FlatList,View,TextInput,SafeAreaView,StyleSheet,Text} from 'react-native';
import { tracks } from '../../../assets/data/tracks';
import TrackListItem from '../../components/TrackListItem';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';


export default function SearchScreen() {
  
const [search,setSearch]= useState("");

  return (
    <SafeAreaView>
    <View style={styles.header}>
      <FontAwesome name='search' size={16} color="grey" />
      <TextInput 
      value={search} 
      onChangeText={setSearch}
      style={styles.input} 
      placeholder='What do you want to listen to?'/>
      <Text onPress={() => setSearch("")} style={{color: "white"}}>Cancel</Text>
      </View>
     <FlatList 
     data={tracks} 
     renderItem={({item}) => <TrackListItem 
     track={item} />} 
     showsVerticalScrollIndicator={false}/>
     </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#121314",
    padding: 8,
    marginHorizontal: 10,
    borderRadius: 5,
    color: "white",

  },
})


