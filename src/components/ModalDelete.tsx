import React from 'react';
import {useDispatch} from 'react-redux';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {deleteContact} from '../actions/contacts';

export default function ModalDelete({id, setShow}: {id: any; setShow: any}) {
  const dispatch: any = useDispatch();
  return (
    <View style={style.modal}>
      <View style={style.modalDialog}>
        <View style={style.modalContent}>
          <View style={style.modalHeader}>
            <Text style={style.textHeader}>Delete Confirmation</Text>
          </View>
          <View style={style.modalBody}>
            <Text style={style.textBody}>
              Are you sure to remove this data?
            </Text>
          </View>
          <View style={style.modalFooter}>
            <TouchableOpacity
              style={style.button}
              onPress={() => {
                setShow(false);
              }}>
              <Text style={style.textBody}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.button}
              onPress={() => {
                dispatch(deleteContact(id));
                setShow(false);
              }}>
              <Text style={style.textBody}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  modal: {
    zIndex: 2,
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalDialog: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'gray',
    borderRadius: 7,
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 7,
  },
  modalHeader: {
    padding: 10,
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  textBody: {
    fontSize: 16,
  },
  modalFooter: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15,
  },
  modalBody: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  button: {
    backgroundColor: 'rgb(186, 133, 34)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
});
