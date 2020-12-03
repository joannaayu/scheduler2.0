import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import UserContext from '../UserContext';
import CourseList from '../components/CourseList';
import CourseEditScreen from './CourseEditScreen';

const Banner = ({ title }) => (
  <Text style={styles.banner}>{ title || '[loading ...]' }</Text>
);

const ScheduleScreen = ({navigation}) => {
  const user = useContext(UserContext);
  const [schedule, setSchedule] = useState({title: '', courses:[] });
  const canEdit = user && user.role === 'admin';

  const view = (course) => {
    navigation.navigate(canEdit ? 'CourseEditScreen' : 'CourseDetailScreen', { course });
    };

  const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';

  useEffect(() => {
    const fetchSchedule =  async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setSchedule(json);
    }
    fetchSchedule();
    }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} view={view} />
    </SafeAreaView>
  );
}

const fetchSchedule = async () => {
    const response = await fetch(url);
    if (!response.ok) throw response;
    const json = await response.json();
    setSchedule(json);
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  banner: {
    color: '#888',
    fontSize: 32,
  },
});

export default ScheduleScreen;
