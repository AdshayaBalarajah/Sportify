import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";

export default function SignUpScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateFullName = (text) => {
    if (text.trim() === "") {
      setFullNameError("Full name is required");
    } else {
      setFullNameError("");
    }
  };

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

  const validateConfirmPassword = (text) => {
    if (text !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSignUp = () => {
    if (
      !fullNameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError &&
      fullName &&
      email &&
      password &&
      confirmPassword
    ) {
      // Show success alert
      Alert.alert("Success", "Signed up successfully", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);

      // Clear all input fields after successful sign-up
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      Alert.alert("Error", "Please fix the errors before submitting");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.welcome}>Welcome</Text>
      <Text style={styles.description}>
        Create an account to get started with our app.
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Full Name</Text>
        <TextInput
          value={fullName}
          onChangeText={(text) => {
            setFullName(text);
            validateFullName(text);
          }}
          mode="outlined"
          style={styles.input}
          error={!!fullNameError}
          theme={{ colors: { background: "#FFF", primary: "#9C27B0" } }}
        />
        {fullNameError ? (
          <Text style={styles.errorText}>{fullNameError}</Text>
        ) : null}

        <Text style={styles.inputLabel}>Email</Text>
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

        <Text style={styles.inputLabel}>Confirm Password</Text>
        <TextInput
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            validateConfirmPassword(text);
          }}
          mode="outlined"
          style={styles.input}
          secureTextEntry
          error={!!confirmPasswordError}
          theme={{ colors: { background: "#FFF", primary: "#9C27B0" } }}
        />
        {confirmPasswordError ? (
          <Text style={styles.errorText}>{confirmPasswordError}</Text>
        ) : null}
      </View>

      <Button
        mode="contained"
        onPress={handleSignUp}
        style={styles.signupButton}
        contentStyle={styles.signupButtonContent}
      >
        Sign Up
      </Button>

      <Text style={styles.orLogin} onPress={() => navigation.navigate("Login")}>
        Already have an account? <Text style={styles.loginLink}>Login</Text>
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
    marginTop: 60,
  },
  welcome: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
    alignSelf: "center",
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
  signupButton: {
    backgroundColor: "#333",
    borderRadius: 5,
    width: "60%",
    alignSelf: "center",
  },
  signupButtonContent: {
    height: 45,
  },
  orLogin: {
    color: "#BBB",
    textAlign: "center",
    marginVertical: 20,
  },
  loginLink: {
    color: "#FFD700",
    fontWeight: "bold",
  },
});
