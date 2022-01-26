export const setTextContent = (parentElement, selector, text) => {
    if(!parentElement) return;

    const element = parentElement.querySelector(selector);
    element.textContent = text;
}

export const truncateText = (text, maxLength ) => {
    if(text.length <= maxLength ) return text;

    return `${text.slice(0, maxLength - 1)}...`
}