import { setBackgroundImg } from ".";
import { setFieldValues } from "./common";

function setFormValues(form, values){
    
    setFieldValues(form, '[name="title"]', values?.title)
    setFieldValues(form, '[name="author"]', values?.author)
    setFieldValues(form, '[name="description"]', values?.description)

    setFieldValues(form, '[name="imageUrl"]', values?.imageUrl)
    setBackgroundImg(document, '#postHeroImage', values?.imageUrl)

}
function getFormValues(form){
    const formValues = {}
    // S1: loop through name array
    // const nameArray = ['title','author','description','imageUrl'];
    // nameArray.forEach(name => {
    //     const field = form.querySelector(`[name="${name}"]`)
    //     if(field) formValues[name] = field.value;
    // })

    // S2: using formData
    const data = new FormData(form)

    for( const [key,value] of data) {
        formValues[key] = value
    }

    return formValues
}
export function initPostForm({formId, defaultValues, onSubmit}){
    const form = document.getElementById(formId);
    if(!form) return;

    setFormValues(form, defaultValues)

    form.addEventListener('submit',(e) => {
        e.preventDefault();

        const formValues = getFormValues(form)
        console.log('form values:',formValues)
    })
}