import { StyleSheet, TouchableOpacity, View } from "react-native";
import ScreenTitle from "../components/ScreenTitle";
import { useEffect, useState } from "react";
import { getUserName } from "../services/apiClient";
import { Box, Image, Text } from "native-base";
import moment from "moment";
import ButtonIcon from "../components/ButtonIcon";
import { useNavigation, useRoute } from "@react-navigation/native";
import WeatherSection from "../components/weather/WeatherSection";
import { BASE_IMG_URL } from "../constants";


const RecordDetailsScreen = () => {
    const navigation = useNavigation();

    const { weatherData, description, imgSrc } = useRoute().params;
    console.log(BASE_IMG_URL + imgSrc);

    const [userName, setUserName] = useState('friend');
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    const togglePreview = () => setIsPreviewMode(!isPreviewMode);

    useEffect(() => {
        const handleUserName = async () => {
            try {
                setUserName(await getUserName());
            } catch (error) {
                console.log('Error fetching username from AsyncStorage:', error);
            }
        }
        handleUserName();
    }, []);

    const renderPreview = () => {
        
        return (
            <TouchableOpacity onPress={togglePreview}>
                <Box
                    alignSelf="center"
                    rounded='15'
                    p='3'
                    mt='3'
                    w='100%'
                    bg="primary.200"
                    shadow={9}
                    shadowOffset={{ width: 0, height: 0 }}
                    shadowOpacity={0.3}
                    shadowRadius={4}
                    justifyContent='center'
                >
                    <Image
                        alignSelf='center'
                        w='100%'
                        h='500'
                        rounded='20'
                        source={{ uri: BASE_IMG_URL + imgSrc }}
                        fallbackSource={require('../assets/icons/imgAltIcon.png')}
                        alt='Image not found' />
                </Box>
            </TouchableOpacity>
        )
    }


    return (
        <View style={styles.container}>
            <ScreenTitle title={`Hey, ${userName}! How are you?`} />
            <Text
                pt='4'
                color='primary.100'
                fontSize='20'
                textAlign='center'
            >
                {`It was ${moment('2023-06-11T19:16:12.022+00:00').format("MMM, Do")}`}
            </Text>
            {
                isPreviewMode ? renderPreview() : (
                    <View style={styles.middleSection} >
                        <View style={styles.infoSection} >
                            <WeatherSection weatherData={weatherData} />
                            <Text
                                mt='2'
                                color='primary.50'
                                fontSize='18'
                            >
                                Your outfit on this day:
                            </Text>
                            <Box
                                mt='2'
                                alignSelf='center'
                                rounded='15'
                                p='3'
                                bg='primary.200'
                                shadow={9}
                                shadowOffset={{ width: 0, height: 0 }}
                                shadowOpacity={0.3}
                                shadowRadius={4}
                            >

                                <Text
                                    textAlign='center'
                                    color='primary.50'
                                    fontSize='17'
                                >
                                    {description || 'You have not added anything here.'}
                                </Text>
                            </Box>
                        </View>
                        <TouchableOpacity onPress={togglePreview}>


                            <Image
                                w='175'
                                h='100%'
                                rounded='10'
                                source={
                                    !imgSrc?.length ? require('../assets/placeHolderImg.png') : { uri: BASE_IMG_URL + imgSrc }
                                }
                                fallbackSource={require('../assets/placeHolderImg.png')}
                                alt='Image not found' 
                            />


                        </TouchableOpacity>
                    </View>
                )
            }

            <Box flexDir='row' justifyContent='space-around' mt='7'>
                <ButtonIcon handleClick={() => navigation.navigate('List')} iconPath={require('../assets/icons/backIcon.png')} />
                <ButtonIcon handleClick={() => navigation.navigate('Home')} iconPath={require('../assets/icons/homeIcon.png')} />
                {/* {isNewRecordLoading === LOADING.PENDING ?
                    <Spinner color='primary.100' size="lg" /> :
                    <ButtonIcon disabled={isLoading !== LOADING.FULFILLED || error || !description} handleClick={handleCreateNewRecord} iconPath={require('../assets/icons/saveIcon.png')} />
                } */}
            </Box>

        </View>
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282B34'
    },
    middleSection: {
        marginTop: 10,
        height: '70%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    infoSection: {
        width: '50%'
    }
})

export default RecordDetailsScreen;