import React from 'react';
import {faCamera, faImage} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {updateAvatar} from '../actions/contacts';

export default function UpdateAvatar() {
  const store: any = useRoute();
  const navigation = useNavigation();
  const dispatch: Function = useDispatch();
  const [showAvt, setShowAvt] = useState(true);
  const [file, setFile]: [any, any] = useState<any>(null);

  const onSend = () => {
    const formData = new FormData();
    formData.append('avatar', {
      name: file.assets[0].fileName,
      size: file.assets[0].fileSize,
      type: file.assets[0].type,
      uri: file.assets[0].uri,
    });
    dispatch(updateAvatar(store.params.id, formData));
    navigation.goBack();
  };

  const onButtonPress: Function = useCallback(
    (type: string, options: any) => {
      if (type === 'capture') {
        launchCamera(options, data => {
          if (!data?.didCancel) {
            setFile(data);
            setShowAvt(false);
          }
        });
      } else {
        launchImageLibrary(options, data => {
          if (!data?.didCancel) {
            setFile(data);
            setShowAvt(false);
          }
        });
      }
    },
    [setFile],
  );
  return (
    <View style={style.avatarBox}>
      <View style={style.btnSelect}>
        <TouchableOpacity
          style={style.btnTop}
          onPress={() => navigation.goBack()}>
          <Text style={style.text}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.btnTop} onPress={onSend}>
          <Text style={style.text}>Save</Text>
        </TouchableOpacity>
      </View>
      {showAvt && (
        <Image
          style={style.img}
          source={{
            uri: `http://192.168.1.50:3000/images/${
              store.params.avatar ? store.params.avatar : 'user-tie-solid.png'
            }`,
          }}
        />
      )}
      {file?.assets && (
        <Image style={style.img} source={{uri: file?.assets[0].uri}} />
      )}
      <View style={style.btnSelect}>
        <TouchableOpacity
          style={style.btn}
          onPress={() =>
            onButtonPress('capture', {
              saveToPhotos: true,
              mediaType: 'photo',
              includeBase64: false,
            })
          }>
          <FontAwesomeIcon size={25} icon={faCamera} />
        </TouchableOpacity>
        <TouchableOpacity
          style={style.btn}
          onPress={() =>
            onButtonPress('library', {
              selectionLimit: 1,
              mediaType: 'photo',
              includeBase64: false,
            })
          }>
          <FontAwesomeIcon size={25} icon={faImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  avatarBox: {
    margin: 10,
    padding: 10,
    backgroundColor: 'grey',
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius: 5,
    gap: 15,
    alignItems: 'center',
  },
  btnSelect: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  btn: {
    backgroundColor: 'rgb(186, 133, 34)',
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  btnTop: {
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
  img: {
    width: 350,
    height: 350,
    resizeMode: 'center',
  },
});
