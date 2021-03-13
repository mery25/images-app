import axios from "axios"

export async function getImages(page = 1, limit = 10) {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${page}`)
        const data =  await response.data
        return data.map(({ url : src, title: alt }) => ({ src, alt }))
    } catch(error) {
        console.log(error)
        throw new Error("Error retrieving images")
    }
}