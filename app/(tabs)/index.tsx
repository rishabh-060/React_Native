import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  Platform,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const dummyTasks = [
  {
    id: '1',
    title: 'Redesign Landing Page',
    shortDescription: 'Modernize layout and hero section',
    fullDescription: 'Revamp the landing page with a clean, modern layout. Ensure mobile responsiveness, add CTA buttons, and optimize loading speed. Include animation for hero section.',
    points: 75,
  },
  {
    id: '2',
    title: 'Bug Fix: Profile Upload',
    shortDescription: 'Fix image upload crash on profile',
    fullDescription: 'Investigate and fix the app crash when a user tries to upload an image to their profile. Ensure JPEG/PNG compatibility and add validation feedback.',
    points: 40,
  },
  {
    id: '3',
    title: 'Add Push Notifications',
    shortDescription: 'Implement local push alerts',
    fullDescription: 'Use Firebase or Expo Notifications to schedule daily reminders for incomplete tasks. Allow toggling via settings screen.',
    points: 90,
  },
  {
    id: '4',
    title: 'Refactor Navigation Flow',
    shortDescription: 'Simplify navigation structure',
    fullDescription: 'Refactor the current navigation stack to reduce nesting. Improve transition animations between screens and update route names for clarity.',
    points: 55,
  },
  {
    id: '5',
    title: 'Create Leaderboard Screen',
    shortDescription: 'Show top contributors with avatars',
    fullDescription: 'Design and build a leaderboard UI showing users ranked by total points. Include profile pics, ranks, and points. Ensure pagination or infinite scroll.',
    points: 65,
  },
  {
    id: '6',
    title: 'Dark Mode Integration',
    shortDescription: 'Theme toggle & color palette',
    fullDescription: 'Introduce a dark theme toggle in settings. Update all screens to support dark mode with smooth transition animations and accessible contrast levels.',
    points: 80,
  },
];


export default function HomeScreen() {
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const router = useRouter();

  const toggleExpand = (taskId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedTaskId(prev => (prev === taskId ? null : taskId));
  };

  const navigateToDetail = (task: any) => {
    router.push({
      pathname: '/task-detail',
      params: { task: JSON.stringify(task) },
    });
  };

  const renderItem = ({ item }: { item: any }) => {
    const isExpanded = expandedTaskId === item.id;

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => navigateToDetail(item)}>
        <View style={styles.cardHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.shortDescription}</Text>
          </View>
          <View style={styles.rightHeader}>
            <View style={styles.pointsBadge}>
              <Text style={styles.pointsText}>{item.points} pts</Text>
            </View>
            <TouchableOpacity onPress={() => toggleExpand(item.id)}>
              <Ionicons
                name={isExpanded ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="#333"
              />
            </TouchableOpacity>
          </View>
        </View>
        {isExpanded && (
          <View style={styles.cardDetails}>
            <Text style={styles.detailText}>📘 {item.fullDescription}</Text>
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📝 Task List</Text>
      <FlatList
        data={dummyTasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fc',
    padding: 16,
    paddingTop: 50,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  list: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    marginBottom: 2,
  },
  
  cardSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  pointsBadge: {
    backgroundColor: '#e0f7ec',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginRight: 4,
  },
  pointsText: {
    color: '#1abc9c',
    fontWeight: '600',
    fontSize: 13,
  },
  cardDetails: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 12,
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
