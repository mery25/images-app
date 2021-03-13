import axios from "axios"

const HTTP_SUCCES_CODE = 200;

export async function getImages(page = 1, limit = 10) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${page}`,)
    
    if (response.status !== HTTP_SUCCES_CODE)
        throw new Error("Error retrieving images")

    return await response.data
}

