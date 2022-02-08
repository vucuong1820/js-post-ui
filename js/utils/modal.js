import { toast } from ".";
import postApi from "../api/postApi";

export const registerModal = ({ post, title, message, onChange}) => {
    const modalElement = document.getElementById('modal')
    const modal = new window.bootstrap.Modal(modalElement);

    modal.show();
    
    // set title & message
    const titleElement = modalElement.querySelector('.modal-title')
    titleElement.textContent = title;

    const body = modalElement.querySelector('.modal-body')
    body.textContent = message;
    

    // close modal
    const closeBtnList = modalElement.querySelectorAll('.close')
    if(!closeBtnList) return;
    closeBtnList.forEach((closeBtn) => {
        closeBtn.addEventListener('click', () => {
            modal.hide();
        })
    })

    // confirm delete post
    const confirmBtn = modalElement.querySelector('.confirm')
    if(confirmBtn) {
        confirmBtn.addEventListener('click',async () => {
            // modal.hide();
            try {                 
                await postApi.remove(post.id)
                await onChange();
                modal.hide();
    
            } catch (error) {
                console.log('failed to delete post:',error);
                toast.error(error)
            }
        })
    }
    
    
    
    
}