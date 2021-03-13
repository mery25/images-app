import { getImages } from "../../api/api"
import mockAxios from "axios"
import { 
    SUCCESFUL_RESPONSE_WITH_DEFAULT_PARAMS,
    SUCCESFUL_RESPONSE_WITH_PAGE_PARAM
} from "./data/responses"
jest.mock("axios")

const URL_WITH_DEFAULT_PARAMS = "https://jsonplaceholder.typicode.com/photos?_limit=10&_page=1"
const URL_WITH_PAGE_PARAM = "https://jsonplaceholder.typicode.com/photos?_limit=10&_page=2"

describe('retrieve images', () => {

    it('should be called api using the default params', async () => {
        const mockFn = mockAxios.get.mockResolvedValue(SUCCESFUL_RESPONSE_WITH_DEFAULT_PARAMS)

        await getImages()

        expect(mockFn).toBeCalledTimes(1)
        expect(mockFn).toBeCalledWith(URL_WITH_DEFAULT_PARAMS)

    })

    it('should be called api using a set page param', async () => {
        const mockFn = mockAxios.get.mockResolvedValue(SUCCESFUL_RESPONSE_WITH_PAGE_PARAM)

        const PAGE_NUM = 2;
        await getImages(PAGE_NUM)

        expect(mockFn).toBeCalledTimes(1)
        expect(mockFn).toBeCalledWith(URL_WITH_PAGE_PARAM)

    })

    afterEach(() => jest.clearAllMocks)

})