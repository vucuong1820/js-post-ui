import axiosClient from "./api/axiosClient"
import postApi from "./api/postApi"

console.log('hello from main.js')

async function main(){
    const queryParams = {
        _page: 1,
        _limit: 5,
    }

    const response = await postApi.getAll(queryParams)
    console.log(response)

    postApi.update({
        id: 'sktwi1cgkkuif36dj',
        title: 'Dicta molestiae aut123'
    })
}


main()