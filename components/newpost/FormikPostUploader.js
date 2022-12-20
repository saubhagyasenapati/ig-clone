import { View, Text, TextInput, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button } from "react-native-elements";
import validUrl from "valid-url";
const PLACEHOLDER_IMG =
  "https://soho.edu.rs/wp-content/plugins/instagram-feed/img/thumb-placeholder.png";
const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A URL is required"),
  caption: Yup.string().max(2200, "Caption has reached the maximum character"),
});

const FormikPostUploader = ({navigation}) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(values) => {console.log(values)
      console.log("Your Post was Uploaded succesfully")
      navigation.goBack()
    }
      }
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View style={styles.container}>
            <Image source={{ uri: validUrl.isUri(thumbnailUrl)?thumbnailUrl: PLACEHOLDER_IMG }} style={styles.img} />
       <View style={{flex:1,marginLeft:12}}>
       <TextInput
              placeholder="Write a Caption..."
              multiline={true}
              style={{ fontSize: 19 }}
              onChangeText={handleChange('caption')}
              onBlur={handleBlur('caption')}
              value={values.caption}

            />
       </View>
          
          </View>
          <View>
          <TextInput 
          onChange={(e)=>setThumbnailUrl(e.nativeEvent.text)}
            placeholder="Enter Image Url" 
            style={{ fontSize: 18 }}
            onChangeText={handleChange('imageUrl')}
              onBlur={handleBlur('imageUrl')}
              value={values.imageUrl}
            />
            {errors.imageUrl &&(
                <Text style={{fontsize:10,color:'red'}}>{errors.imageUrl}</Text>
            )}
              <Button onPress={handleSubmit} title='Share'  disabled={!isValid}/>
          </View>
        
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;

const styles = StyleSheet.create({
    container:{
    marginTop:20,
    margin:10 ,
    justifyContent:'space-between',
    flexDirection:'row'
    },
  img: {
    width: 120,
    height: 120,
  },
});
