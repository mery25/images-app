import { getImages } from "../../api/api"
import mockAxios from "axios"
import { 
    SUCCESFUL_RESPONSE_WITH_DEFAULT_PARAMS,
    SUCCESFUL_RESPONSE_WITH_PAGE_PARAM,
    SUCCESFUL_RESPONSE_WITH_LIMIT_PARAM,
    SUCCESFUL_RESPONSE,
    ERROR_RESPONSE
} from "./data/responses"

jest.mock("axios")

const URL_WITH_DEFAULT_PARAMS = "https://jsonplaceholder.typicode.com/photos?_limit=10&_page=1"
const URL_WITH_PAGE_PARAM = "https://jsonplaceholder.typicode.com/photos?_limit=10&_page=2"
const URL_WITH_LIMIT_PARAM = "https://jsonplaceholder.typicode.com/photos?_limit=3&_page=1"
const DEFAULT_PAGE_PARAM = 1;

describe('retrieve images', () => {

    it('should be called api using the default params', async () => {
        const mockFn = mockAxios.get.mockResolvedValue(SUCCESFUL_RESPONSE_WITH_DEFAULT_PARAMS)

        await getImages()

        expect(mockFn).toBeCalledTimes(1)
        expect(mockFn).toBeCalledWith(URL_WITH_DEFAULT_PARAMS)

    })

    it('should be called api passing page param', async () => {
        const mockFn = mockAxios.get.mockResolvedValue(SUCCESFUL_RESPONSE_WITH_PAGE_PARAM)

        const PAGE_NUM = 2;
        await getImages(PAGE_NUM)

        expect(mockFn).toBeCalledTimes(1)
        expect(mockFn).toBeCalledWith(URL_WITH_PAGE_PARAM)

    })

    it('should be called api passing limit param', async () => {
        const mockFn = mockAxios.get.mockResolvedValue(SUCCESFUL_RESPONSE_WITH_LIMIT_PARAM)

        const LIMIT_NUM = 3;
        await getImages(DEFAULT_PAGE_PARAM, LIMIT_NUM)

        expect(mockFn).toBeCalledTimes(1)
        expect(mockFn).toBeCalledWith(URL_WITH_LIMIT_PARAM)

    })

    it('should retrieve images from api', async () => {
        mockAxios.get.mockResolvedValue(SUCCESFUL_RESPONSE)

        const LIMIT = 2;
        const PAGE = 3;
        const images = await getImages(PAGE, LIMIT)

        expect(images).not.toBeNull()
        expect(images.length).toBe(LIMIT)
        expect(images[0]).toStrictEqual(expect.objectContaining(
        {
            id: 21,
            alt: "duis id aliquip adipisicing laboris mollit Lorem",
            src: "https://via.placeholder.com/600/laborum"
        }))
        expect(images[1]).toStrictEqual(expect.objectContaining(
        {
            id: 22,
            alt: "tempor exercitation anim veniam anim ea excepteur",
            src: "https://via.placeholder.com/600/reprehenderit",
        }))

    })

    it('should throw an error', async () => {
        mockAxios.get.mockRejectedValue(ERROR_RESPONSE)

        try {
            await getImages()
        } catch(error) {
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe("Error retrieving images")
        }

    })

    afterEach(() => jest.clearAllMocks)

})