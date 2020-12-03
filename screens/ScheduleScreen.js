import React from 'react';
import firebaseApp from '../firebase';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import UserContext from '../UserContext';
import CourseList from '../components/CourseList';

const Banner = ({ title }) => (
  <Text style={styles.banner}>{ title || '[loading ...]' }</Text>
);

const db = firebaseApp.database().ref();

const fixCourses = json => ({
    ...json,
    courses: Object.values(json.courses)
  });

const ScheduleScreen = ({navigation}) => {
  const user = useContext(UserContext);
  const [schedule, setSchedule] = useState({title: '', courses:[] });
  const canEdit = user && user.role === 'admin';

  const view = (course) => {
    navigation.navigate(canEdit ? 'CourseEditScreen' : 'CourseDetailScreen', { course });
    };

useEffect(() => {
    const db = firebaseApp.database().ref();
    const handleData = snap => {
        if (snap.val()) setSchedule(fixCourses(snap.val()));
    }
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
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
