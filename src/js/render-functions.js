import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const galleryEl = document.querySelector(".gallery");
const loaderEl = document.querySelector(".loader");

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});


export function createGallery(images) {
  if (!Array.isArray(images) || images.length === 0) return;

  const markup = images
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
<li class="gallery__item">
  <a class="gallery__link" href="${largeImageURL}">
    <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item"><b>Likes</b> <span>${likes}</span></p>
    <p class="info-item"><b>Views</b> <span>${views}</span></p>
    <p class="info-item"><b>Comments</b> <span>${comments}</span></p>
    <p class="info-item"><b>Downloads</b> <span>${downloads}</span></p>
  </div>
</li>`;
    })
    .join("");

  galleryEl.insertAdjacentHTML("beforeend", markup);

  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = "";
}

export function showLoader() {
  if (loaderEl) loaderEl.classList.remove("is-hidden");
}

export function hideLoader() {
  if (loaderEl) loaderEl.classList.add("is-hidden");
}