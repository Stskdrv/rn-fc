import { Box, Text } from "native-base";
import { StyleSheet, Image } from "react-native";
import ButtonIcon from "./ButtonIcon";



const RecordItem = () => {

    const InfoBlock = ({ src, text }) => {
        console.log(text);
        return (
            <Box
                flexDir='row'
                justifyContent='space-around'
            >
                <Image style={styles.infoIcon} source={src} />
                <Text
                    fontSize='sm'
                    fontWeight='300'
                    textAlign='center'
                    color='primary.200'
                >
                    {text}
                </Text>

            </Box>
        )
    }

    return (
        <Box
            alignSelf='center'
            alignItems='center'
            marginY='5'
            height='10'
            bgColor='primary.50'
            width='80%'
            flexDir='row'
            justifyContent='space-around'
            rounded='30%'
        >
            <Image style={styles.weatherIcon} source={require('../assets/icons/weatherIcons/113.png')} />
            <InfoBlock src={require('../assets/icons/tempIcon.png')} text='13°-18°' />
            <InfoBlock src={require('../assets/icons/blackWindIcon.png')} text='3 km/h' />
            <Box left='5'>
                <ButtonIcon handleClick={null} iconPath={require('../assets/icons/arrowIcon.png')} />
            </Box>
        </Box>
    )
};

const styles = StyleSheet.create({
    weatherIcon: {
        width: 40,
        height: 40,
    },
    infoIcon: {
        width: 20,
        height: 20,
    }
});


export default RecordItem;