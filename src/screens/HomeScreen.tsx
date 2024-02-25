import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { calculateSize } from "../utils/scale";
import { StatusBarHeight } from "../utils/status-bar-height";
import FullScreenCarousel from "../components/FullScreenCarousel";
import { updateData } from "../actions/ticketActions";
import { firebase } from "../utils/firebaseConfig";

const carouselData = [
  {
    title: "To do",
    key: "todo",
  },
  {
    title: "In Progress",
    key: "in-progress",
  },
  {
    title: "Done",
    key: "done",
  },
];

const HomeScreen: React.FC = () => {
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("tickets")
      .onSnapshot((querySnapshot) => {
        let data: any[] = [];
        querySnapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        console.log(data);
        dispatch(updateData(data)); // Dispatching to Redux store
      });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, marginTop: calculateSize(StatusBarHeight) }}
    >
      <FullScreenCarousel data={carouselData} user={user} />
    </SafeAreaView>
  );
};

export default HomeScreen;
