import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function TaskDetailScreen() {
  const { task } = useLocalSearchParams();
  const parsedTask = task ? JSON.parse(task as string) : null;

  if (!parsedTask) return <Text style={styles.errorText}>❌ Task not found.</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{parsedTask.title}</Text>
        <Text style={styles.subTitle}>📋 Task Details</Text>
        <Text style={styles.desc}>{parsedTask.fullDescription}</Text>
        <Text style={styles.points}>🏆 Points: <Text style={styles.bold}>{parsedTask.points}</Text></Text>

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit Task</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f2f5fa',
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginBottom: 6,
  },
  desc: {
    fontSize: 15,
    color: '#444',
    marginBottom: 16,
    lineHeight: 22,
  },
  points: {
    fontSize: 16,
    color: '#007bff',
    marginBottom: 24,
  },
  bold: {
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    flex: 1,
    textAlign: 'center',
    marginTop: 100,
    fontSize: 18,
    color: '#e63946',
  },
});
