import { View, Text,StyleSheet,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import FormikPostUploader from './FormikPostUploader'

const AddNewPost = ({navigation}) => {
  return (
    <View style={styles.container}>
       <Header navigation={navigation}/>
       <FormikPostUploader  navigation={navigation}/>
    </View>
  
  )
}

const Header=({navigation})=>(
<View style={styles.headerContainer}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Image source={{uri:'https://img.icons8.com/ios/512/circled-left-2.png'}} style={{height:40,width:40}}/>
        </TouchableOpacity>
        <Text style={styles.header}>NEW POST</Text>
        <Text></Text>
    </View>
)
export default AddNewPost

const styles=StyleSheet.create({
    container:{
     marginHorizontal:10,
  
    },
    headerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:40,
  
    }
    ,
    header:{
        fontWeight:'700',
        fontSize:20,
        marginRight:23,
    }
})