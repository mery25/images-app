import axios from "axios"

export async function getImages(start = 0, limit = 10) {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_start=${start}`)
        const data =  await response.data
        return data.map(({ id, url : src, title: alt }) => ({ id, src, alt }))
    } catch(error) {
        console.log(error)
        throw new Error("Error retrieving images")
    }
}