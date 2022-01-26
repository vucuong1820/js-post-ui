import postApi from "./api/postApi";
import { setTextContent } from "./utils/common";
import dayjs from "dayjs";

function renderPostDetail(post){
    if(!post) return;

    // render title
    // render author
    // render description
    // render timespan
    setTextContent(document,'#postDetailTitle',post.title)
    setTextContent(document,'#postDetailAuthor',post.author)
    setTextContent(document,'#postDetailDescription',post.description)
    setTextContent(document,'#postDetailTimeSpan',dayjs(post.updateAt).format('- DD/MM/YYYY HH:mm'))

    // render image
    const heroImage = document.getElementById('postHeroImage')
    if(heroImage){
        heroImage.style.backgroundImage = `url("${post.imageUrl}")`
        heroImage.addEventListener('error',() => {
            heroImage.style.backgroundImage = `url("http://via.placeholder.com/1368x400?text=Thumbnail+Not+Found")`
        })
    }
    // render edit button
    const editPageLink = document.getElementById('goToEditPageLink')
    if(editPageLink) {
        editPageLink.innerHTML = '<i class="fas fa-edit"></i> Edit Post'
        editPageLink.href = `/add-edit-post.html?id=${post.id}`
    }
}


(async () => {
    try {
        const searchParams = new URLSearchParams(window.location.search)
        const postId = searchParams.get('id')
        if(!postId) return;
        const post = await postApi.getById(postId)
        renderPostDetail(post)
    } catch (error) {
        console.log('failed to fetch api post detail: ',error)
    }
})()