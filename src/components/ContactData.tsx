import React from 'react';
import {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faFloppyDisk,
  faPenSquare,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import {updateContact} from '../actions/contacts';
import {useNavigation} from '@react-navigation/native';

export default function ContactData({
  contact,
  setId,
  setShow,
}: {
  contact: any;
  setId: any;
  setShow: any;
}) {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const [isEdite, setIsEdite] = useState(false);
  const [newData, setNewData] = useState({
    name: contact.name,
    phone: contact.phone,
  });

  const save = () => {
    dispatch(updateContact(contact.id, newData));
    setIsEdite(!isEdite);
  };

  useEffect(() => {
    setNewData({name: contact.name, phone: contact.phone});
  }, [contact]);

  if (isEdite) {
    return (
      <View style={style.dataBox}>
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Avatar', {
                id: contact.id,
                avatar: contact.avatar,
              })
            }>
            <Image
              style={style.avatar}
              source={{
                uri: `http://192.168.1.50:3000/images/${
                  contact.avatar ? contact.avatar : 'user-tie-solid.png'
                }`,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={style.identity}>
          <View>
            <TextInput
              style={style.input}
              defaultValue={newData.name}
              onChangeText={newText => setNewData({...newData, name: newText})}
            />
          </View>
          <View>
            <TextInput
              style={style.input}
              defaultValue={newData.phone}
              onChangeText={newText => setNewData({...newData, phone: newText})}
            />
          </View>
          <View style={style.identityBtn}>
            <TouchableOpacity onPress={save}>
              <FontAwesomeIcon size={25} icon={faFloppyDisk} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={style.dataBox}>
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Avatar', {
                id: contact.id,
                avatar: contact.avatar,
              })
            }>
            <Image
              style={style.avatar}
              source={{
                uri: `http://192.168.1.50:3000/images/${
                  contact.avatar ? contact.avatar : 'user-tie-solid.png'
                }`,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={style.identity}>
          <View>
            <Text style={style.identityText}>{contact.name}</Text>
          </View>
          <View>
            <Text style={style.identityText}>{contact.phone}</Text>
          </View>
          <View style={style.identityBtn}>
            <TouchableOpacity onPress={() => setIsEdite(!isEdite)}>
              <FontAwesomeIcon size={25} icon={faPenSquare} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setId(contact.id);
                setShow(true);
              }}>
              <FontAwesomeIcon size={25} icon={faTrashCan} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  dataBox: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'grey',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    padding: 5,
  },
  identity: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 10,
  },
  identityText: {
    color: 'black',
    fontSize: 16,
  },
  identityBtn: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    objectFit: 'fill',
  },
  input: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    width: 150,
    color: 'black',
  },
});
