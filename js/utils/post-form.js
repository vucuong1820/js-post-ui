import { randomNumber, setBackgroundImg, toast } from ".";
import { setFieldValues } from "./common";
import { setTextContent } from "./common";
import * as yup from "yup";

function setFormValues(form, values) {
  setFieldValues(form, '[name="title"]', values?.title);
  setFieldValues(form, '[name="author"]', values?.author);
  setFieldValues(form, '[name="description"]', values?.description);

  setFieldValues(form, '[name="imageUrl"]', values?.imageUrl);
  setBackgroundImg(document, "#postHeroImage", values?.imageUrl);
}
function getFormValues(form) {
  const formValues = {};
  // S1: loop through name array
  // const nameArray = ['title','author','description','imageUrl'];
  // nameArray.forEach(name => {
  //     const field = form.querySelector(`[name="${name}"]`)
  //     if(field) formValues[name] = field.value;
  // })

  // S2: using formData
  const data = new FormData(form);

  for (const [key, value] of data) {
    formValues[key] = value;
  }

  return formValues;
}

function getValidateSchema() {
  return yup.object().shape({
    title: yup.string().required("Please enter title"),
    author: yup
      .string()
      .required("Please enter author")
      .test(
        "at-least-two-words",
        "Please enter at least two words",
        (value) => value.trim().split(" ").length >= 2
      ),
    description: yup.string(),
    imageUrl: yup.string().required('Please random an image URL').url('URL is not valid')
  });
}
function setFieldError(form, name, error) {
  const element = form.querySelector(`[name="${name}"]`);
  if (element) {
    element.setCustomValidity(error);
    setTextContent(element.parentElement, ".invalid-feedback", error);
  }
}

async function validateForm(form, formValues) {
  // find errors
  try {
    // reset previous error
    ["title", "author","imageUrl"].forEach((name) => setFieldError(form, name, ""));

    // get schema
    const schema = getValidateSchema();
    await schema.validate(formValues, { abortEarly: false });
  } catch (error) {
    const errorLog = {};

    for (const validationError of error.inner) {
      const name = validationError.path;
      // ignore if the field is already logged
      if (errorLog[name]) continue;

      // set error message and confirm the error of field is logged
      toast.error(`Error: ${validationError.message}`);
      setFieldError(form, name, validationError.message);
      errorLog[name] = true;
    }
  }
  // was-validated
  const isValid = form.checkValidity();
  if (!isValid) form.classList.add("was-validated");

  return isValid;
}

function compareDefaultAndNewValues(defaultValues, newValues) {
  let isMatch = false;

  ["title", "author", "description","imageUrl"].forEach((name) => {
    const inputElement = document.querySelector(`[name="${name}"]`)
    inputElement.addEventListener('input',(e) => {
      if(defaultValues[name] === e.target.value) isMatch = true;
    })
  });
  console.log(isMatch);

  return isMatch;
}

function randomImage(){

  const imageUrl = `https://picsum.photos/id/${randomNumber(1000)}/1368/400`

  setFieldValues(document, '[name="imageUrl"]', imageUrl);
  setBackgroundImg(document, "#postHeroImage", imageUrl);

}

function renderImageSource(form, selectedValue){
  const controlList = form.querySelectorAll('[data-id="imageSource"]')
  controlList.forEach(control => {
    control.hidden = control.dataset.imageSource !== selectedValue;
  })
}

function initImageSource(form){
  const radioList = form.querySelectorAll('[name="imageSource"]')
  radioList.forEach(radio => {
    radio.addEventListener('change',(e) => {
      renderImageSource(form, e.target.value)
    })
  })
}
function initImageUpload(form){
  const uploadInput = form.querySelector('#uploadImg')
  if(!uploadInput) return;
  uploadInput.addEventListener('change',(e) => {
    const previewImageUrl = URL.createObjectURL(e.target.files[0])
    setBackgroundImg(document, "#postHeroImage", previewImageUrl);
  })
}

export function initPostForm({ formId, defaultValues, onSubmit }) {
  const form = document.getElementById(formId);
  const saveButton = form.querySelector('[name="submit"]');
  const randomImgBtn = document.getElementById('postChangeImage')
  saveButton.disabled = true;

  if (!form) return;
  setFormValues(form, defaultValues);

  // disable button if values are not change
  ["title", "author", "description"].forEach((name) => {
    const inputElement = document.querySelector(`[name="${name}"]`)
    inputElement.addEventListener('input',(e) => {
      saveButton.disabled = defaultValues[name] === e.target.value ? true : false;
    })
  });

  // show/hide button choose image source
  initImageSource(form)
  
  // preview image when upload
  initImageUpload(form)

  // bind event for random img url
  if(randomImgBtn){
    randomImgBtn.addEventListener('click', () => {
      randomImage()
    })
  }

  // bind event for submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const formValues = getFormValues(form);
    formValues.id = defaultValues.id;

    const isValid = await validateForm(form, formValues);
    if (!isValid) return;

    await onSubmit(formValues);

    // disable button after submit
    saveButton.disabled = true;
  });
}
