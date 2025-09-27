import axios from 'axios';


const BASE_URL = "https://pixabay.com/api/" ;
const API_KEY = "52318710-c8f94a6f7665a4ba5885a56a6" ;
const PER_PAGE = 15;

export async function getImagesByQuery(query, page = 1) {
const params = {
key: API_KEY ,
q: query,
image_type: "photo" ,
orientation: "horizontal",
safesearch: true,
page,
per_page: PER_PAGE,
};
try {
    const response = await axios.get(BASE_URL, {params})
    return response.data;
} catch (error) {
    throw error ;
}

}

