import React from 'react';
import { SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { calculateSize } from '../utils/scale';
import { StatusBarHeight } from '../utils/status-bar-height';
import FullScreenCarousel from '../components/FullScreenCarousel';

const carouselData = [
  {
    title: 'To do',
    key: "todo"
  },
  {
    title: 'In Progress',
    key: "in-progress"
  },
  {
    title: 'Done',
    key: "done"
  }
];


const HomeScreen: React.FC = () => {
  const user = useSelector((state: any) => state.auth.user);

  return (
    <SafeAreaView style={{ flex: 1, marginTop: calculateSize(StatusBarHeight) }}>
      <FullScreenCarousel data={carouselData} />
    </SafeAreaView>
  );
};

export default HomeScreen;
