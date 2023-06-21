import { Box, Spinner, Text } from "native-base";
import { StyleSheet, View } from "react-native";


const LoaderSection = ({text}) => {
    return (
        <View style={styles.container}>
            <Box
                alignSelf="center"
                rounded='15'
                p='10'
                w='60%'
                mt='30%'
                bg="primary.200"
                shadow={9}
                shadowOffset={{ width: 0, height: 0 }}
                shadowOpacity={0.3}
                shadowRadius={4}
            >
                <Spinner alignSelf='center' size='lg' color='primary.100' />
                <Text
                    fontSize='lg'
                    fontWeight='500'
                    textAlign='center'
                    color='primary.50'
                    mt='10'
                >
                    {text}
                </Text>
            </Box>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282B34'
    }
});

export default LoaderSection;