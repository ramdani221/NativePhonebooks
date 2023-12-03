import React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadContact, loadPage} from '../actions/contacts';
import {FlatList, StyleSheet, View} from 'react-native';
import ContactData from './ContactData';

export default function ContactList({
  filter,
  setId,
  setShow,
}: {
  filter: {keyword: string; sort: string};
  navigation: any;
  setId: any;
  setShow: any;
}) {
  const contacts = useSelector((state: any) => state.contacts);
  const dispatch: any = useDispatch();
  const [pageNum, setPageNum] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  const handleScroll = () => {
    setIsLoading(true);
    if (contacts.page >= contacts.pages) {
      return setIsLoading(false);
    }
    dispatch(loadPage({...filter, page: pageNum, limit: contacts.limit}));
    setPageNum(pageNum + 1);
    setIsLoading(false);
  };

  useEffect(() => {
    dispatch(loadContact({...filter, limit: contacts.limit}));
    setPageNum(2);
  }, [dispatch, filter, contacts.limit]);

  return (
    <View style={style.list}>
      <FlatList
        contentContainerStyle={style.list}
        data={contacts.phonebooks}
        renderItem={({item}: {item: any}) => (
          <ContactData contact={item} setId={setId} setShow={setShow} />
        )}
        onEndReached={handleScroll}
        onEndReachedThreshold={0.3}
      />
      {isLoading && <p>Loading...</p>}
    </View>
  );
}

const style = StyleSheet.create({
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginBottom: 40,
  },
});
