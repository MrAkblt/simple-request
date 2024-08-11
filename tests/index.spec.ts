import request from "../index";

jest.mock('../../../helpers/request2/macros', () => ({
	get: (url: string) => 1
}))
jest.mock('../../../helpers/request2/request', () => () => 2)

describe("Request2 - index", () => {
	it("Index should return request with macros", () => {
		expect(request.get("test")).toBe(1);
		expect(request({ url: 'test', method: 'GET' })).toBe(2)
	})
});
