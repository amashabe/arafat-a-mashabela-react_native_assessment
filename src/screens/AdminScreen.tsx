import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { calculateSize } from '../utils/scale';
import { StatusBarHeight } from '../utils/status-bar-height';
import { setModal } from '../actions/ticketActions';
import AddTicket from '../components/AddTicket';

const AdminScreen: React.FC = () => {
    const dispatch = useDispatch();

    const addTicket = () => {
        dispatch(setModal(true));
    };

    return (
        <View style={{ flex: 1, marginTop: calculateSize(StatusBarHeight), marginStart: calculateSize(15), marginEnd: calculateSize(15) }}>
            <AddTicket />
            <TouchableOpacity
                onPress={() => addTicket()}
                style={{
                    height: calculateSize(50),
                    paddingTop: calculateSize(10),
                    paddingBottom: calculateSize(10),
                    backgroundColor: '#2085ff',
                    borderRadius: calculateSize(3),
                    justifyContent: 'center',
                    width: "100%",
                    elevation: calculateSize(5),
                    shadowOffset: { width: calculateSize(1), height: calculateSize(1) },
                    shadowColor: "#656565",
                    shadowOpacity: 1,
                    alignItems: 'center',
                    position: 'absolute',
                    margin: 0,
                    right: 0,
                    bottom: calculateSize(5),
                }}>
                <Text style={{ color: "white", fontSize: calculateSize(15), fontWeight: "bold", textAlign: 'center' }}>Add a ticket</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AdminScreen;
