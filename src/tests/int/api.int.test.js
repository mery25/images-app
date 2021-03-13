import { getImages } from "../../api/api"
import mockAxios from "axios"
import { SUCCESFUL_RESPONSE_WITH_DEFAULT_PARAMS } from "./data/responses"
jest.mock("axios")

const URL_WITH_DEFAULT_PARAMS = "https://jsonplaceholder.typicode.com/photos?_limit=10&_page=1"

describe('retrieve images', () => {

    it('should be called api using the default params', async () => {
        const mockFn = mockAxios.get.mockResolvedValue(SUCCESFUL_RESPONSE_WITH_DEFAULT_PARAMS)

        await getImages()

        expect(mockFn).toBeCalledTimes(1)
        expect(mockFn).toBeCalledWith(URL_WITH_DEFAULT_PARAMS)

    })

})