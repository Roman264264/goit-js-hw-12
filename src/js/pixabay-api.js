import axios from 'axios';


const BASE_URL = "https://pixabay.com/api/" ;
const API_KEY = "52318710-c8f94a6f7665a4ba5885a56a6" ;

export function getImagesByQuery(query) {
const params = {
key: API_KEY ,
q: query,
image_type: "photo" ,
orientation: "horizontal",
safesearch: true,
};
return axios
.get(BASE_URL, { params })
.then(response => response.data)
.catch(error => Promise.reject(error));
}

