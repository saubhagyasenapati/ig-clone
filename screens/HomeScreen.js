import { View, Text,SafeAreaView,StyleSheet, ScrollView} from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Stories from '../components/Stories'
import Post from '../components/Post'
import { POSTS } from '../Data/postdata'
import BottomTabs from '../components/BottomTabs'
import { bottomTabsIcon } from '../components/BottomTabs'
const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
       <Header navigation={navigation}/>
       <Stories/>
       <ScrollView>
         {POSTS.map((post,index)=>
         (
          <Post post={post} key={index}/>
         ) 
         )}
       </ScrollView>
      <BottomTabs icons={bottomTabsIcon} />
    </SafeAreaView>
  )
}

const styles=StyleSheet.create({
  container:{
  backgroundColor:'white',
  flex:1,
  }
})
export default HomeScreen