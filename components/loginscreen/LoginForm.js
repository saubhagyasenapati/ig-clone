import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-elements";

import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";

const LoginForm = ({navigation}) => {
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required()
      .min(6, "Your Password has to have at least 6 characters"),
  });
  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid })=>(
          <>
        <View style={[styles.inputField,{
          borderColor:values.email.length<1||Validator.validate(values.email)?'#ccc':'red',
        }]}>
          <TextInput
            placeholderTextColor="#444"
            placeholder="Phone number,Username or Email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
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
        <View
          style={{ alignItems: "flex-end", marginTop: 5, marginBottom: 30 }}
        >
          <TouchableOpacity>
            <Text style={{ color: "#6BB0F5" }}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <Pressable  onPress={handleSubmit} style={styles.button(isValid)}><Text>Log In</Text></Pressable>
        <View style={styles.signupcontainer}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={()=>navigation.push('SignUpScreen')}>
            <Text style={{ color: "#6BB0F5" }}> Sign Up</Text>
          </TouchableOpacity>
        </View>
        </>
        )}
      </Formik>
    </View>
  );
};

export default LoginForm;

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
