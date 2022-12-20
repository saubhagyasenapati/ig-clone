import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-elements";

import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";

const SignUpForm = ({navigation}) => {
  const SignUpFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    username:Yup.string().required().min(4,'A username is required'),
    password: Yup.string()
      .required()
      .min(6, "Your Password has to have at least 6 characters"),
  });
  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "",username:"", password: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={SignUpFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid })=>(
          <>
        <View style={[styles.inputField,{
          borderColor:values.email.length<1||Validator.validate(values.email)?'#ccc':'red',
        }]}>
          <TextInput
            placeholderTextColor="#444"
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          ></TextInput>
        </View>
        <View style={[styles.inputField,{
          borderColor:values.username.length<1||values.username.length>4?'#ccc':'red',
        }]}>
        <TextInput
            placeholderTextColor="#444"
            placeholder="Username"
            autoCapitalize="none"
            textContentType="username"
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
          ></TextInput>
        </View>

        <View style={[styles.inputField,
        {
          borderColor:1>values.password.length||values.password.length>=6?'#ccc':'red',
        }]}>
          <TextInput
            placeholderTextColor="#444"
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            secureTextEntry={true}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          ></TextInput>
        </View>
        <Pressable  onPress={handleSubmit} style={styles.button(isValid)}><Text>Log In</Text></Pressable>
        <View style={styles.signupcontainer}>
          <Text>Have an account already?</Text>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Text style={{ color: "#6BB0F5" }}> Log In</Text>
          </TouchableOpacity>
        </View>
        </>
        )}
      </Formik>
    </View>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
  },
  inputField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#FAFAFA",
    marginBottom: 10,
    borderWidth: 1,
  },
  signupcontainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 50,
  },
  button:isValid=>({
    backgroundColor:isValid?'#0096F6':'#9ACAF7',
    alignItems:'center',
    justifyContent:'center',
    minHeight:42,
    borderRadius:4,
  }),
});
