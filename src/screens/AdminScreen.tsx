import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { calculateSize } from "../utils/scale";
import { StatusBarHeight } from "../utils/status-bar-height";
import { setEditTicket, setModal, updateData } from "../actions/ticketActions";
import AddTicket from "../components/AddTicket";
import { firebase } from "../utils/firebaseConfig";
import store from "../utils/store";

interface Item {
  id: string;
  title: string;
  description: string;
  state: string;
  user: string | null;
}

const AdminScreen: React.FC = () => {
  const dispatch = useDispatch();

  const ticket = useSelector((state: any) => state.ticket);

  const renderItem = ({ item }: { item: Item }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 2 }}>
        <Button title="Edit" onPress={() => handleEdit(item)} />
        <Button title="Delete" onPress={() => handleDelete(item.id)} />
      </View>
    </View>
  );

  const handleEdit = (item: Item) => {
    dispatch(setEditTicket(item));
  };

  const handleDelete = async (id: string) => {
    try {
      await firebase.firestore().collection("tickets").doc(id).delete();
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

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

  const addTicket = () => {
    dispatch(setModal(true));
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop: calculateSize(StatusBarHeight),
        marginStart: calculateSize(15),
        marginEnd: calculateSize(15),
      }}
    >
      <FlatList
        style={{ flex: 1 }}
        data={ticket?.data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <AddTicket />
      <TouchableOpacity
        onPress={() => addTicket()}
        style={{
          height: calculateSize(50),
          paddingTop: calculateSize(10),
          paddingBottom: calculateSize(10),
          backgroundColor: "#2085ff",
          borderRadius: calculateSize(3),
          justifyContent: "center",
          width: "100%",
          elevation: calculateSize(5),
          shadowOffset: { width: calculateSize(1), height: calculateSize(1) },
          shadowColor: "#656565",
          shadowOpacity: 1,
          alignItems: "center",
          position: "absolute",
          margin: 0,
          right: 0,
          bottom: calculateSize(5),
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: calculateSize(15),
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Add a ticket
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminScreen;
