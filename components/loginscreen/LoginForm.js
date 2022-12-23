import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";
// import firebase from "../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const LoginForm = ({ navigation }) => {
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required()
      .min(6, "Your Password has to have at least 6 characters"),
  });

  const onLogin = async (email, password) => {
    try {
      const auth = getAuth();
      const login = await signInWithEmailAndPassword(auth, email, password);
      if (login) {
        console.log("Firebase Login Successful", email, password);
        navigation.push("HomeScreen");
      }
      // await firebase.auth().signInWithEmailAndPassword(email,password)
    } catch (error) {
      Alert.alert(
        "My Lord",
        error.message + "\n\n...What would you Like to Do next?",
        [
          {
            text: "OKAY",
            onPress: () => console.log("OKKKK"),
            style: "cancel",
          },
          {
            text: "Sign Up",
          },
        ]
      );
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          onLogin(values.email, values.password);
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || Validator.validate(values.email)
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="Phone number,Username or Email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              ></TextInput>
            </View>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.password.length || values.password.length >= 6
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
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
            <Pressable onPress={handleSubmit} style={styles.button(isValid)}>
              <Text>Log In</Text>
            </Pressable>
            <View style={styles.signupcontainer}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.push("SignUpScreen")}>
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
  button: (isValid) => ({
    backgroundColor: isValid ? "#0096F6" : "#9ACAF7",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
  }),
});
