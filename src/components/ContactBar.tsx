import React from 'react';
import {
  faArrowDownAZ,
  faArrowDownZA,
  faMagnifyingGlass,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function ContactBar({filter, sort}: {filter: any; sort: any}) {
  const navigation: any = useNavigation();
  const [btnShow, setBtnShow] = useState(false);
  const btnClick = (type: string) => {
    sort(type);
    setBtnShow(!btnShow);
  };

  return (
    <View style={style.barBox}>
      {!btnShow && (
        <TouchableOpacity style={style.btnBar} onPress={() => btnClick('desc')}>
          <FontAwesomeIcon size={25} icon={faArrowDownZA} />
        </TouchableOpacity>
      )}
      {btnShow && (
        <TouchableOpacity style={style.btnBar} onPress={() => btnClick('asc')}>
          <FontAwesomeIcon size={25} icon={faArrowDownAZ} />
        </TouchableOpacity>
      )}
      <View style={style.searchBar}>
        <FontAwesomeIcon size={25} icon={faMagnifyingGlass} />
        <TextInput
          style={style.input}
          onChangeText={newText => filter(newText)}
        />
      </View>
      <TouchableOpacity
        style={style.btnBar}
        onPress={() => navigation.navigate('Add')}>
        <FontAwesomeIcon size={25} icon={faUserPlus} />
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  barBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  searchBar: {
    width: '75%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  input: {
    padding: 0,
    width: '85%',
    color: 'black',
  },
  btnBar: {
    borderWidth: 1,
    backgroundColor: 'rgb(186, 133, 34)',
    padding: 5,
    borderRadius: 5,
  },
});
