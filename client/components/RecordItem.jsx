import { Box, Text } from "native-base";
import { StyleSheet, Image } from "react-native";
import ButtonIcon from "./ButtonIcon";
import { weatherIconsDictionary } from "../constants";



const RecordItem = ({recordData}) => {

    const {
        mintemp,
        maxtemp,
        wind,
        weatherData
    } = recordData;

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
            <Image style={styles.weatherIcon} source={weatherIconsDictionary[weatherData[1]?.icon]} />
            <InfoBlock src={require('../assets/icons/tempIcon.png')} text={`${mintemp}° - ${maxtemp}°`} />
            <InfoBlock src={require('../assets/icons/blackWindIcon.png')} text={`${wind} km/h`} />
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