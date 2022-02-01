import { setBackgroundImg, toast } from ".";
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
    ["title", "author"].forEach((name) => setFieldError(form, name, ""));

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
      toast.error(`Error: ${validationError.message}`)
      setFieldError(form, name, validationError.message);
      errorLog[name] = true;
    }

    
  }
  // was-validated
  const isValid = form.checkValidity();
  if (!isValid) form.classList.add("was-validated");

  return isValid;
}

export  function initPostForm({ formId, defaultValues, onSubmit }) {
  const form = document.getElementById(formId);
  if (!form) return;

  setFormValues(form, defaultValues);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formValues = getFormValues(form);
    formValues.id = defaultValues.id;

    const isValid = await validateForm(form,formValues);
    if (!isValid) return;

    onSubmit(formValues)
  });
}
