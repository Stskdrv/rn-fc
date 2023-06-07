import apiClient from "./apiClient";




export const createRecord = ({description, mintemp, maxtemp, wind}) => {
    const params = {
        description,
        mintemp,
        maxtemp,
        wind,
    };

    return apiClient.post('record/', params);
};