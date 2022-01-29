export const setTextContent = (parentElement, selector, text) => {
    if(!parentElement) return;

    const element = parentElement.querySelector(selector);
    element.textContent = text;
}

export const truncateText = (text, maxLength ) => {
    if(text.length <= maxLength ) return text;

    return `${text.slice(0, maxLength - 1)}...`
}

export const setFieldValues = (form, selector, value) => {
    if(!form) return;

    const field = form.querySelector(selector);
    field.value = value;
}

export const setBackgroundImg = (parent, selector, imageUrl) => {
    if(!parent) return;

    const element = parent.querySelector(selector);
    element.style.backgroundImage = `url("${imageUrl}")`;
}

