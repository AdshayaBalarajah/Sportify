import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, TextInput, Button, IconButton } from "react-native-paper";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (text) => {
    const passwordRegex =
      /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;

    if (!passwordRegex.test(text)) {
      setPasswordError(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special symbol"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = () => {
    if (!emailError && !passwordError && email && password) {
      const username = email.split("@")[0]; // Extract username from email
      Alert.alert("Success", "Logged in successfully!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Home", { username }),
        },
      ]);
    } else {
      Alert.alert("Error", "Please fix the errors before submitting");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <Text style={styles.description}>
        Log in to access your workouts, track progress, and stay on top of your
        fitness goals!
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Username or Email</Text>
        <TextInput
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            validateEmail(text);
          }}
          mode="outlined"
          style={styles.input}
          error={!!emailError}
          theme={{ colors: { background: "#FFF", primary: "#9C27B0" } }}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            validatePassword(text);
          }}
          mode="outlined"
          style={styles.input}
          secureTextEntry
          error={!!passwordError}
          theme={{ colors: { background: "#FFF", primary: "#9C27B0" } }}
        />
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
      </View>

      <Text style={styles.forgotPassword}>Forgot Password?</Text>

      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.loginButton}
        contentStyle={styles.loginButtonContent}
      >
        Log In
      </Button>

      <Text style={styles.orSignUp}>or sign up with</Text>
      <View style={styles.socialIcons}>
        <IconButton icon="google" size={30} onPress={() => {}} />
        <IconButton icon="facebook" size={30} onPress={() => {}} />
        <IconButton icon="fingerprint" size={30} onPress={() => {}} />
      </View>

      <Text style={styles.signUp}>
        Don’t have an account?{" "}
        <Text
          style={styles.signUpLink}
          onPress={() => navigation.navigate("SignUp")}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#1e1e2d",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 10,
    alignSelf: "center",
    marginTop: 80,
  },
  description: {
    fontSize: 14,
    color: "#BBB",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    backgroundColor: "#B3A0FF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  inputLabel: {
    color: "black",
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#FFF",
    marginBottom: 10,
    borderRadius: 5,
    height: 40,
    fontSize: 14,
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
  forgotPassword: {
    color: "#BBB",
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#333",
    borderRadius: 5,
    width: "60%",
    alignSelf: "center",
  },
  loginButtonContent: {
    height: 45,
  },
  orSignUp: {
    color: "#BBB",
    textAlign: "center",
    marginVertical: 20,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  signUp: {
    color: "#DDD",
    textAlign: "center",
  },
  signUpLink: {
    color: "#FFD700",
    fontWeight: "bold",
  },
});
