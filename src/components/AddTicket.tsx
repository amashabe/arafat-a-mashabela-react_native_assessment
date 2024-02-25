import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Modal from "react-native-modal";
import { useDispatch } from "react-redux";
import { calculateSize } from "../utils/scale";
import { useSelector } from "react-redux";
import { setEditTicket, setModal } from "../actions/ticketActions";
import { firebase } from "../utils/firebaseConfig";

const AddTicket: React.FC = (props) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const { isModalVisible, editedTicket } = useSelector(
    (state: any) => state.ticket
  );
  const dispatch = useDispatch();

  const toggleModal = () => {
    dispatch(setModal(false));
    dispatch(setEditTicket(null));
    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    if (editedTicket) {
      setTitle(editedTicket?.title);
      setDescription(editedTicket?.description);
    }
  }, [editedTicket]);

  const handleSubmit = async () => {
    // dispatch({ type: "SET_LOADING", payload: true });
    if (editedTicket) {
      try {
        await firebase
          .firestore()
          .collection("tickets")
          .doc(editedTicket.id)
          .update({ title, description });
        console.log("Document successfully updated!");
      } catch (error) {
        console.error("Error updating document: ", error);
      } finally {
        toggleModal();
        // set loading spinner
      }
    } else {
      try {
        await firebase.firestore().collection("tickets").add({
          title,
          description,
          state: "TODO",
          user: null,
        });
        console.log("Document successfully added!");
      } catch (error) {
        console.error("Error adding document: ", error);
      } finally {
        toggleModal();
        //set loading spinner
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginStart: calculateSize(15),
        marginEnd: calculateSize(15),
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Modal isVisible={isModalVisible}>
          <View
            style={{
              backgroundColor: "white",
              padding: calculateSize(20),
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
              borderColor: "rgba(0, 0, 0, 0.1)",
            }}
          >
            <TouchableOpacity
              onPress={() => toggleModal()}
              style={{ alignSelf: "flex-end", marginBottom: calculateSize(15) }}
            >
              <Text style={{ fontSize: calculateSize(15), fontWeight: "bold" }}>
                X
              </Text>
            </TouchableOpacity>
            <TextInput
              secureTextEntry={false}
              onChangeText={setTitle}
              placeholder={"title"}
              autoComplete="off"
              autoCorrect={false}
              value={title}
              style={{
                color: "#000",
                borderColor: "#6D6D6D",
                borderWidth: calculateSize(1),
                borderRadius: calculateSize(3),
                width: "100%",
                paddingStart: calculateSize(10),
                height: calculateSize(50),
                marginBottom: calculateSize(15),
                fontSize: calculateSize(15),
              }}
            />

            <TextInput
              secureTextEntry={false}
              onChangeText={setDescription}
              placeholder={"description"}
              autoComplete="off"
              autoCorrect={false}
              value={description}
              multiline={true}
              style={{
                color: "#000",
                borderColor: "#6D6D6D",
                borderWidth: calculateSize(1),
                borderRadius: calculateSize(3),
                width: "100%",
                paddingStart: calculateSize(10),
                height: calculateSize(150),
                marginBottom: calculateSize(15),
                fontSize: calculateSize(15),
              }}
            />

            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                height: calculateSize(50),
                paddingTop: calculateSize(10),
                paddingBottom: calculateSize(10),
                backgroundColor: "#2085ff",
                borderRadius: calculateSize(3),
                justifyContent: "center",
                width: "100%",
                elevation: calculateSize(5),
                shadowOffset: {
                  width: calculateSize(1),
                  height: calculateSize(1),
                },
                shadowColor: "#656565",
                shadowOpacity: 1,
                alignItems: "center",
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
                {editedTicket ? "Update ticket" : "Add a ticket"}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default AddTicket;
