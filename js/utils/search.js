import debounce from "lodash.debounce"

export function initSearch({ elementId, defaultParams, onChange}){

    const searchInput = document.getElementById(elementId);
    if(!searchInput) return;

    // set default values 
    if(defaultParams.get('title_like')) searchInput.value = defaultParams.get('title_like');

    // bind event
    const debounceSearch = debounce((e) => onChange?.(e.target.value) , 500 )
    searchInput.addEventListener('input',debounceSearch)
}