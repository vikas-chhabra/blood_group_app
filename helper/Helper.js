import 'whatwg-fetch';
import {Alert} from 'react-native';

const baseUrl='http://bloodbankapi.herokuapp.com/api/'
const Helper=(url,method,body)=>{
    return(
        fetch(baseUrl+url,{
            method:method,
            headers:{
                'Content-Type':'application/json'
            },
            body:body
        })
        .then((response)=>{
            return response.json();
        })
        .catch((err)=>{
            Alert.alert("Something went wrong please try again later")
            return err;
        })
    );
}

export default Helper;
