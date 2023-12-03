import React from 'react';
import {useState} from 'react';
import {StyleSheet} from 'react-native';
import ContactList from './ContactList';
import ContactBar from './ContactBar';
import {Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ModalDelete from './ModalDelete';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ContactBox({navigation}: any) {
  const [filter, setFilter] = useState({keyword: '', sort: 'asc'});
  const [id, setId] = useState(0);
  const [show, setShow] = useState(false);

  const filterContact = (keyword: string) => {
    setFilter({...filter, keyword});
  };

  const sortContact = (sort: string) => {
    setFilter({...filter, sort});
  };

  return (
    <>
      {show && <ModalDelete id={id} setShow={setShow} />}
      <SafeAreaView style={style.container}>
        <ContactBar filter={filterContact} sort={sortContact} />
        <ContactList
          filter={filter}
          navigation={navigation}
          setShow={setShow}
          setId={setId}
        />
      </SafeAreaView>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    padding: 10,
    flex: 1,
    flexGrow: 1,
    gap: 10,
  },
});
