import { useState } from 'react';
import axios from 'axios';

import { API } from './constants';

export default ({ userID }) => {
    const [testConf, setTestConf] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchBloodTestConfig = async (userID) => {
        if (userID) {
            try {
                setIsLoading(true)
                let index = 0;
                const result = [];
                await axios.get(API.baseURL)
                    .then(response => {
                        response.data.bloodTestConfig.forEach((item) => {
                            result.push({
                                id: index++,
                                name: item.name,
                                threshold: item.threshold
                            })
                        })
                    })
                setTestConf(result)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                // console.error('There was an error!', error);
                setErrorMessage('Something went wrong!');
            }
        }
    };

    return [fetchBloodTestConfig, testConf, isLoading, errorMessage];
};
