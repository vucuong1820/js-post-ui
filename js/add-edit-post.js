import postApi from "./api/postApi";
import { initPostForm, toast } from "./utils";
function formatFormValues(formValues){
  const payload = {...formValues};

  if(payload.imageSource === 'picsum'){
    delete payload.imageUpload
  }else delete payload.imageUrl;

  delete payload.imageSource
  return payload
}
async function handleAddEditFormSubmit(formValues){
  console.log([formValues, formatFormValues(formValues)]);

  // try {
  //   // check edit or add
  //   const savedPost = formValues.id ? await postApi.update(formValues) : await postApi.add(formValues);

  //   // show toast message
  //   toast.success('Save post sucessfully!')
  //   // redirect to detail page
  //   setTimeout(() => {
  //     window.location.assign(`/post-detail.html?id=${savedPost.id}`)
  //   }, 2000)

  // } catch (error) {
  //   console.log('Error when submit:', error);
  // }
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
      formId: 'postForm',
      defaultValues,
      onSubmit: handleAddEditFormSubmit,
    })
  } catch (error) {
      console.log('failed to fetch edit post api:',error);
  }
})();
