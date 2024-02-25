import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  FlatList,
  Button,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { calculateSize } from "../utils/scale";
import { useSelector } from "react-redux";
import { firebase } from "../utils/firebaseConfig";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface CarouselItem {
  title: string;
  key: string;
}

interface FullScreenCarouselProps {
  data: CarouselItem[];
  user: any;
}

interface ListItem {
  id: string;
  title: string;
  description: string;
  state: string;
  user: string | null;
}

const States = ["TODO", "IN-PROGRESS", "DONE"];

const FullScreenCarousel: React.FC<FullScreenCarouselProps> = ({
  data,
  user,
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const ticket = useSelector((state: any) => state.ticket);
  console.log(user.userId);

  const renderListItem = ({ item }: { item: ListItem }) => {
    return (
      <View
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          padding: 10,
          borderBottomWidth: 1,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text>{item.title}</Text>
          <Text>{item.description}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
          {item.user != user.userId && (
            <Button
              title="Assign to me"
              onPress={() => handleAssigneToMe(item.id)}
            />
          )}
          {item.user == user.userId && (
            <Text style={{ fontWeight: "600" }}>Move Ticket:</Text>
          )}
          {item.state != "TODO" && item.user == user.userId && (
            <Button
              title="Previous"
              onPress={() =>
                handleChangeState(
                  item,
                  item.state == "DONE" ? "IN-PROGRESS" : "TODO"
                )
              }
            />
          )}
          {item.state != "DONE" && item.user == user.userId && (
            <Button
              title="Next"
              onPress={() =>
                handleChangeState(
                  item,
                  item.state == "TODO" ? "IN-PROGRESS" : "DONE"
                )
              }
            />
          )}
        </View>
      </View>
    );
  };

  const handleAssigneToMe = async (id: string) => {
    try {
      await firebase
        .firestore()
        .collection("tickets")
        .doc(id)
        .update({ user: user.userId });
      console.log("Ticket assigned!");
    } catch (error) {
      console.error("Error assigning ticket: ", error);
    } finally {
      // set loading spinner
    }
  };

  const handleChangeState = async (ticket: ListItem, nextState: string) => {
    try {
      await firebase
        .firestore()
        .collection("tickets")
        .doc(ticket.id)
        .update({ state: nextState });
      console.log("Ticket moved:", nextState);
    } catch (error) {
      console.error("Error moving ticket: ", error);
    } finally {
      // set loading spinner
    }
  };

  const renderItem = ({ item }: { item: CarouselItem; index: number }) => {
    const listOfTickets = ticket?.data?.filter(
      (d: any) => d.state.toUpperCase() === item.key.toUpperCase()
    );
    console.log(item.key, listOfTickets);
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <FlatList
          style={{ flex: 1 }}
          data={listOfTickets}
          renderItem={renderListItem}
          keyExtractor={(i: any) => i.id}
        />
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
    backgroundColor: "#fff",
  },
  slide: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: calculateSize(8),
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  title: {
    color: "#5B5B5B",
    fontSize: calculateSize(20),
    fontWeight: "bold",
    // position: "absolute",
    marginBottom: 10,
    top: calculateSize(15),
    left: calculateSize(15),
  },
  paginationContainer: {
    position: "absolute",
    bottom: calculateSize(0),
    alignSelf: "center",
  },
  paginationDot: {
    width: calculateSize(10),
    height: calculateSize(10),
    borderRadius: calculateSize(5),
    marginHorizontal: calculateSize(0),
  },
});

export default FullScreenCarousel;
