import React from "react";
import { StyleSheet, View } from "react-native";
import ScreenTitle from "../components/ScreenTitle";
import RecordItem from "../components/RecordItem";
import { Box } from "native-base";
import ButtonIcon from "../components/ButtonIcon";



const RecordListScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <ScreenTitle title='Here are all your records:' />
            <RecordItem />
            <Box position='absolute' alignSelf='center' bottom='5'>
                <ButtonIcon handleClick={() => navigation.navigate('Home')} iconPath={require('../assets/icons/homeIcon.png')} />
            </Box>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282B34'
    },
});



export default RecordListScreen;