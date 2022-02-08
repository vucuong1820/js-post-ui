import postApi from "./api/postApi";
import {initPagination ,initSearch, renderPostList, renderPagination, toast, registerModal} from "./utils"
async function handleFilterChange(filterName, filterValue){
    try {
        const url = new URL(window.location);
        if(filterName) url.searchParams.set(filterName, filterValue);        
        // set default page = 1 for search
        
        if(filterName === 'title_like') url.searchParams.set('_page', 1);

        history.pushState({},'',url)

        // re-fetch data -> re-render
        const { data, pagination} = await postApi.getAll(url.searchParams);
        renderPostList('postList', data);
        renderPagination('postsPagination',pagination);
        
    } catch (error) {
        console.log('Failed to handle filter change: ',error)
    }
}

function handlePostDelete(){
    document.addEventListener('post-delete', (e) => {
        const post = e.detail
        registerModal({
            post,
            title: 'Delete post',
            message: `Are you sure to delete post ${post.title}`,
            onChange: handleFilterChange,
        })
    })
}

(async () => { 
    try {
        const url = new URL(window.location);
        // check default value for searchParams
        if(!url.searchParams.get('_limit')) url.searchParams.set('_limit',6);
        if(!url.searchParams.get('_page')) url.searchParams.set('_page',1);
        history.pushState({},'',url)
        const queryParams = url.searchParams;
        handlePostDelete()

        initPagination({
            elementId: 'postsPagination',
            defaultParams: queryParams,
            onChange: (page) => handleFilterChange('_page',page)
        });
        initSearch({
            elementId: 'searchInput',
            defaultParams: queryParams,
            onChange: (value) => handleFilterChange('title_like',value)
        });

        const { data, pagination} = await postApi.getAll(queryParams);

        renderPostList('postList',data);
        renderPagination('postsPagination',pagination);

    } catch (error) {
        console.log('Get All failed: ', error)
    }
})()