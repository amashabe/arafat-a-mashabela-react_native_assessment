import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { calculateSize } from '../utils/scale';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface CarouselItem {
  title: string;
  key: string
}

interface FullScreenCarouselProps {
  data: CarouselItem[];
}

const FullScreenCarousel: React.FC<FullScreenCarouselProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const renderItem = ({ item }: { item: CarouselItem; index: number }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        sliderHeight={screenHeight}
        itemWidth={screenWidth}
        hasParallaxImages
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotColor="#777777"
        dotStyle={styles.paginationDot}
        inactiveDotColor="#C5C5C5"
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={false}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: calculateSize(8),
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  title: {
    color: '#5B5B5B',
    fontSize: calculateSize(20),
    fontWeight: 'bold',
    position: 'absolute',
    top: calculateSize(15),
    left: calculateSize(15),
  },
  paginationContainer: {
    position: 'absolute',
    bottom: calculateSize(0),
    alignSelf: 'center',
  },
  paginationDot: {
    width: calculateSize(10),
    height: calculateSize(10),
    borderRadius: calculateSize(5),
    marginHorizontal: calculateSize(0),
  },
});

export default FullScreenCarousel;
