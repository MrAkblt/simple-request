import macros from "../macros";
import request from "../request";

jest.mock("../request");

describe("Request2 - macros", () => {
	beforeEach(() => {
    jest.clearAllMocks(); // Her testten önce mock'ları temizle
  });
	
	it("get", async () => {
		const mockUrl = 'mockUrl';
		const mockOptions = { headers: { x: 2 } };
		await macros.get(mockUrl, mockOptions)
    expect(request).toHaveBeenCalledWith({ url: mockUrl, ...mockOptions });
	})

	it("post", async () => {
		const mockUrl = 'mockUrl';
		const mockData = { v: 1 };
		const mockOptions = { headers: { x: 2 } };
		await macros.post(mockUrl, mockData, mockOptions)
    expect(request).toHaveBeenCalledWith({ url: mockUrl, data: mockData, ...mockOptions, method: 'POST' });
	})

	it("put", async () => {
		const mockUrl = 'mockUrl';
		const mockData = { v: 1 };
		const mockOptions = { headers: { x: 2 } };
		await macros.put(mockUrl, mockData, mockOptions)
    expect(request).toHaveBeenCalledWith({ url: mockUrl, data: mockData, ...mockOptions, method: 'PUT' });
	})

	it("delete", async () => {
		const mockUrl = 'mockUrl';
		const mockOptions = { headers: { x: 2 } };
		await macros.delete(mockUrl, mockOptions)
    expect(request).toHaveBeenCalledWith({ url: mockUrl, ...mockOptions, method: 'DELETE' });
	})
})