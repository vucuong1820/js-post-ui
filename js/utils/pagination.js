
export function initPagination({ elementId, defaultParams, onChange }) {
  // get element
  const ulPagination = document.getElementById(elementId);
  if (!ulPagination) return;

  // bind event click for prev button
  const prevLink = ulPagination.firstElementChild?.firstElementChild;
  if (prevLink) {
    prevLink.addEventListener("click", () => {
      e.preventDefault();

      const page = Number.parseInt(ulPagination.dataset.page);
      if (page <= 1) return;
      onChange(page - 1);
    });
  }
  //bind event click for next button
  const nextLink = ulPagination.lastElementChild?.lastElementChild;
  if (nextLink) {
    nextLink.addEventListener("click", (e) => {
      e.preventDefault();

      const page = Number.parseInt(ulPagination.dataset.page) || 1;
      const totalPages = ulPagination.dataset.totalPages;
      if (page >= totalPages) return;
      onChange(page + 1);
    });
  }
}

export function renderPagination(elementId, pagination) {
  const ulPagination = document.getElementById(elementId);
  if (!ulPagination) return;
  // clear all disable button
  ulPagination.firstElementChild.classList.remove("disabled");
  ulPagination.lastElementChild.classList.remove("disabled");

  const { _limit, _page, _totalRows } = pagination;
  const totalPages = Math.ceil(_totalRows / _limit);

  // bind to dataset of ul
  ulPagination.dataset.page = _page;
  ulPagination.dataset.totalPages = totalPages;

  // check to disable button
  if (_page <= 1) ulPagination.firstElementChild.classList.add("disabled");
  if (_page >= totalPages)
    ulPagination.lastElementChild.classList.add("disabled");
}
