import { getImages } from "../../api/api"
import mockAxios from "axios"
import { 
    SUCCESFUL_RESPONSE_WITH_DEFAULT_PARAMS,
    SUCCESFUL_RESPONSE_WITH_PAGE_PARAM,
    SUCCESFUL_RESPONSE_WITH_LIMIT_PARAM
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

    afterEach(() => jest.clearAllMocks)

})