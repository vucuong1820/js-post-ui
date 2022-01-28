function showModal(element) {
  if (!window.bootstrap) return;

  const modal = new window.bootstrap.Modal(element);
  modal.show();
}
export function registerLightbox({
  modalId,
  imgSelector,
  prevSelector,
  nextSelector,
}) {
  const modalElement = document.getElementById(modalId);
  if (!modalElement) return;
  const imgModal = modalElement.querySelector(imgSelector);
  const prevButton = modalElement.querySelector(prevSelector);
  const nextButton = modalElement.querySelector(nextSelector);
  if (!imgModal || !prevButton || !nextButton) return;
 
  // check if modal is registered or not
  if(modalElement.dataset.registered) return;

  // variables
  let albumList = [];
  let currentIndex = 0;
 // show img at index
  function showImgAtIndex(index) {
    imgModal.src = albumList[index].src;
  }
  // handle click img -> event delegation
  document.addEventListener("click", (e) => {
    const { target } = e;
    if (target.tagName !== "IMG" || !target.dataset.album) return;
    albumList = document.querySelectorAll(
      `img[data-album="${target.dataset.album}"`
    );
    currentIndex = [...albumList].findIndex((img) => img === target);
    showImgAtIndex(currentIndex);
    showModal(modalElement);
  });

  prevButton.addEventListener("click", () => {
      currentIndex = Math.abs((currentIndex - 1) % albumList.length);
      showImgAtIndex(currentIndex)
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % albumList.length;
    showImgAtIndex(currentIndex)
  });

  // confirm modal is registered
  modalElement.dataset.registered = 'true';
}
