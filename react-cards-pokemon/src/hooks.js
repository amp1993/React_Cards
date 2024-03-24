import { JSON } from "express";
import React, {useState, useEffect} from "react";
import axios from 'axios';



/* Toggles between card facing up or down when button is clicked */
const useFlip = (initialState = true) => {
    const [state, setState] = useState(initialState);
    const flipState = () => {
        setState(state => !state)
    }
    return [state, flipState]
}



const useAxios = (keyInLS, baseUrl) => {
    const [response, setResponse] = useState(keyInLS);

    const addResponseData = async (format = data => data, restOfUrl = "") => {
        const response = await axios.get(`${baseUrl}${restOfUrl}`);
        setResponse(data => [...data, format(response.data)]);
    };


    const clearResponses = () => setResponse([]);

    return [response, addResponseData, clearResponses]
};



const useLocalstorage = (key, defaultVal = []) => {
    if (localStorage.getItem(key)) {
      initialValue = JSON.parse(localStorage.getItem(key));
    }
    const [value, setValue] = useState(initialValue);
  
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);
  
    return [value, setValue];
  }
  



export default {useFlip, useAxios, useLocalstorage};