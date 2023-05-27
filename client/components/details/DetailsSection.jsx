import React from "react";
import { FlatList, Text } from "react-native";
import DetailsData from "./DetailsData";
import { StyleSheet } from "react-native";
import { Box } from "native-base";

const DetailsSection = ({ detailsData }) => {
    
    const data = Object.entries(detailsData).map(([name, value]) => ({ name, value }));

    return (
        <Box
            mt='3'
            alignSelf='center'
            rounded='15'
            p='3'
            w='100%'
            bg='primary.200'
            shadow={9}
            shadowOffset={{ width: 0, height: 0 }}
            shadowOpacity={0.3}
            shadowRadius={4}>
            <Text style={styles.detailsTextTitle}> Details </Text>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return (
                        <DetailsData name={item.name} value={item.value} />
                    )
                }}
            />
        </Box>
    );
};

const styles = StyleSheet.create({
    detailsTextTitle: {
        marginBottom: 5,
        textDecorationLine: 'underline',
        color: 'white',
        fontSize: 17,
        alignSelf: 'center'
    }
});

export default DetailsSection;
