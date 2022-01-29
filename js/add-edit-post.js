import postApi from "./api/postApi";
import { initPostForm } from "./utils";

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

    console.log("default Values:", defaultValues);
    initPostForm({
      formId: 'postForm',
      defaultValues,
      onSubmit: (values) => console.log('submit values:',values)
    })
  } catch (error) {
      console.log('failed to fetch edit post api:',error);
  }
})();
