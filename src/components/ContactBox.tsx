import { useState } from "react";
import { StyleSheet, View } from "react-native";
import ContactList from "./ContactList";
import ContactBar from "./ContactBar";
import {Dimensions} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ContactBox({navigation}: any) {
    const [filter, setFilter] = useState({ keyword: '', sort: 'asc' });
    
    const filterContact = (keyword: string) => {
        setFilter({ ...filter, keyword });
    };
    
    const sortContact = (sort: string) => {
        setFilter({ ...filter, sort });
    };

    return (
        <SafeAreaView style={style.container}>
            <ContactBar filter={filterContact} sort={sortContact}/>
            <ContactList filter={filter} navigation={navigation} />
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        padding: 10,
        flex: 1,
        flexGrow: 1,
        gap: 10,
    }
})