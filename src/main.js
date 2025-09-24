import "izitoast/dist/css/iziToast.min.css";
import iziToast from "izitoast";
import { getImagesByQuery } from "./js/pixabay-api.js";
import { createGallery, clearGallery, showLoader, hideLoader } from "./js/render-functions.js";


const formEl = document.querySelector('.form');
const inputEl = formEl.querySelector('input[name="search-text"]');

formEl.addEventListener('submit', onSearch);

function onSearch(evt) {
evt.preventDefault();

const query = inputEl.value.trim();

if (!query) {
    iziToast.warning({
    message: 'Please enter a search query!',
    position: 'topRight',
    });
    return;
}

clearGallery();
showLoader();

getImagesByQuery(query)
    .then(data => {
    if (data.hits.length === 0) {
        iziToast.info({
        message:
            'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        backgroundColor: '#ef5350',
        });
        return;
    }

    createGallery(data.hits);

    iziToast.success({
        title: 'Success',
        message: `Found ${data.totalHits} images.`,
        position: 'topRight',
    });
    })
    .catch(() => {
    iziToast.error({
        message:
        'Something went wrong while fetching images. Please try again later.',
        position: 'topRight',
        backgroundColor: '#ef5350',
});
    })
    .finally(() => {
hideLoader();
    });
}