import React from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addContact} from '../actions/contacts';
import {useNavigation} from '@react-navigation/native';

export default function AddContact() {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const [newContact, setNewContact] = useState({name: '', phone: ''});
  const submit = () => {
    dispatch(addContact(newContact));
    navigation.goBack();
  };

  return (
    <View style={style.container}>
      <TextInput
        style={style.input}
        placeholderTextColor={'black'}
        placeholder="name"
        onChangeText={newText => setNewContact({...newContact, name: newText})}
      />
      <TextInput
        style={style.input}
        placeholderTextColor={'black'}
        placeholder="phone"
        onChangeText={newText => setNewContact({...newContact, phone: newText})}
      />
      <View style={style.btnBox}>
        <TouchableOpacity style={style.button} onPress={submit}>
          <Text style={style.text}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.button}
          onPress={() => navigation.navigate('Home')}>
          <Text style={style.text}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    backgroundColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    color: 'black',
    fontSize: 16,
  },
  btnBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  button: {
    backgroundColor: 'rgb(186, 133, 34)',
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    flexGrow: 1,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
  },
});
