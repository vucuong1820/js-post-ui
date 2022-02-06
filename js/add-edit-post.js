import postApi from "./api/postApi";
import { initPostForm, toast } from "./utils";

function formatFormValues(formValues) {
  const payload = { ...formValues };

  if (payload.imageSource === "picsum") {
    delete payload.imageUpload;
  } else delete payload.imageUrl;

  delete payload.imageSource;
  return payload;
}

function jsonToFormData(jsonObj) {
  const formData = new FormData();

  for (const key in jsonObj) {
    formData.set(key, jsonObj[key]);
  }

  return formData;
}

async function handleAddEditFormSubmit(formValues) {
  try {
    const payload = formatFormValues(formValues);
    const formData = jsonToFormData(payload);

    // check edit or add
    const savedPost = formValues.id
      ? await postApi.updateFormData(formData)
      : await postApi.addFormData(formData);

    // show toast message
    toast.success("Save post sucessfully!");
    // redirect to detail page
    setTimeout(() => {
      window.location.assign(`/post-detail.html?id=${savedPost.id}`);
    }, 2000);
  } catch (error) {
    console.log("Error when submit:", error);
  }
}
//MAIN
(async () => {
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const postId = searchParams.get("id");

    const defaultValues = postId
      ? await postApi.getById(postId)
      : {
          id: "",
          author: "",
          title: "",
          description: "",
          imageUrl: "",
        };
    initPostForm({
      formId: "postForm",
      defaultValues,
      onSubmit: handleAddEditFormSubmit,
    });
  } catch (error) {
    console.log("failed to fetch edit post api:", error);
  }
})();
