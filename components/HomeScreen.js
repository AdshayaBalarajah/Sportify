import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { Card, ActivityIndicator, FAB } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useClickContext } from "../context/ClickContext";

const categories = [
  { id: 1, name: "Cardio", icon: "run" },
  { id: 2, name: "Strength", icon: "weight-lifter" },
  { id: 3, name: "Yoga", icon: "meditation" },
  { id: 4, name: "Pilates", icon: "yoga" },
  { id: 5, name: "Stretching", icon: "stretch-to-page-outline" },
];

const HomeScreen = ({ route }) => {
  const [headerPressed, setHeaderPressed] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const { clickCount, incrementCount } = useClickContext();
  const { username } = route.params || { username: "Guest" }; // Fetch username passed from LoginScreen

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch("http://192.168.8.154:5000/api/exercises");
        const data = await response.json();
        setExercises(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exercises:", error);
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <TouchableOpacity
          style={[
            styles.header,
            headerPressed && { backgroundColor: "#4b0082" },
          ]}
          activeOpacity={0.8}
          onPressIn={() => setHeaderPressed(true)}
          onPressOut={() => setHeaderPressed(false)}
        >
          <Text style={styles.greeting}>Hi {username} !</Text>
          <Text style={styles.subtitle}>
            It's time to challenge your limits.
          </Text>
        </TouchableOpacity>

        {/* Exercise Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
          contentContainerStyle={styles.categoryContent}
        >
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryItem}>
              <MaterialCommunityIcons
                name={category.icon}
                size={40}
                color="#FFD700"
                style={styles.categoryIcon}
              />
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Exercise Cards */}
        <Text style={styles.sectionTitle}>Exercise Details</Text>
        <View style={styles.cardContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#FFD700" />
          ) : exercises.length > 0 ? (
            exercises.map((exercise) => (
              <TouchableOpacity key={exercise.id} onPress={incrementCount}>
                <Card style={styles.card}>
                  <Card.Cover
                    source={{ uri: exercise.image }}
                    style={styles.cardImage}
                  />
                  <Card.Content>
                    <Text style={styles.cardTitle}>{exercise.name}</Text>
                    <Text style={styles.cardSubtitle}>{exercise.duration}</Text>
                    <Text style={styles.cardDescription}>
                      {exercise.description}
                    </Text>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noDataText}>No exercises available.</Text>
          )}
        </View>
      </ScrollView>

      {/* Floating Button */}
      <FAB style={styles.fab} icon="counter" label={clickCount.toString()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e2d",
    padding: 16,
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: "left",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#896CFE",
  },
  subtitle: {
    fontSize: 16,
    color: "#a8a8a8",
    marginTop: 5,
  },
  categoryContainer: {
    marginVertical: 20,
  },
  categoryContent: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 16,
  },
  categoryIcon: {
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
    margin: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    marginTop: 20,
    textAlign: "left",
  },
  cardContainer: {
    paddingBottom: 16,
    alignItems: "center",
  },
  card: {
    width: "100%",
    marginBottom: 16,
    backgroundColor: "#2a2a38",
    borderRadius: 8,
    overflow: "hidden",
  },
  cardImage: {
    height: 220,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700",
    marginTop: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#a8a8a8",
    marginVertical: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: "#cfcfcf",
  },
  noDataText: {
    color: "#cfcfcf",
    fontSize: 16,
    marginTop: 20,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFD700",
  },
});

export default HomeScreen;
