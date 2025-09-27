import "izitoast/dist/css/iziToast.min.css";
import iziToast from "izitoast";
import { getImagesByQuery } from "./js/pixabay-api.js";
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton, } from "./js/render-functions.js";

let query = '';
let page = 1;
let totalHits = 0;
const PER_PAGE = 15;

const formEl = document.querySelector('.form');
const inputEl = formEl.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');
const galleryContainer = document.querySelector('.gallery');

formEl.addEventListener('submit', async (event) => {
    event.preventDefault();
    const value = inputEl.value.trim();
    if (!value) {
    iziToast.info({ title: 'Info', message: 'Please enter a search query.' });
    return;
    }

    if (value !== query) {
    query = value;
    page = 1;
    clearGallery();
    hideLoadMoreButton();
    }

    try {
    showLoader();
    const data = await getImagesByQuery(query, page);
    hideLoader();

    if (!data.hits || data.hits.length === 0) {
        iziToast.warning({ title: 'No results', message: 'No images found. Try another query.' });
        hideLoadMoreButton();
        return;
    }

    if (page === 1) {
        totalHits = data.totalHits || 0;
        iziToast.success({ title: 'Success', message: `Hooray! We found ${totalHits} images.` });
    }


    createGallery(data.hits);

      const alreadyLoaded = page * PER_PAGE;
    if (alreadyLoaded < totalHits) {
        showLoadMoreButton();
    } else {

        hideLoadMoreButton();
        iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
        });
    }

    } catch (error) {
    hideLoader();
    iziToast.error({ title: 'Error', message: 'Something went wrong. See console.' });
    console.error('Error fetching images:', error);
    }
});

loadMoreBtn.addEventListener('click', async () => {
    page += 1;

    try {
    showLoader();
    const data = await getImagesByQuery(query, page);
    hideLoader();

    if (!data.hits || data.hits.length === 0) {
        hideLoadMoreButton();
        iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
        });
        return;
    }

    createGallery(data.hits);

    const card = galleryContainer.querySelector('.photo-card');
    if (card) {
        const { height: cardHeight } = card.getBoundingClientRect();

        window.scrollBy({
          top: cardHeight * 2,
        left: 0,
        behavior: 'smooth',
        });
    }

      const alreadyLoaded = page * PER_PAGE;
    if (alreadyLoaded >= (data.totalHits || 0)) {
        hideLoadMoreButton();
        iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
        });
    } else {
        showLoadMoreButton();
    }
    } catch (error) {
    hideLoader();
    iziToast.error({ title: 'Error', message: 'Failed to load more images.' });
    console.error('Load more error:', error);
    }
});