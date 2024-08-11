import request from "../request";

global.fetch = jest.fn() as jest.Mock;

describe("Request2 - request", () => {
	it("request success case", async () => {
		const mockResData = { a: 1 };
    (global.fetch as jest.Mock).mockResolvedValue({ json: () => Promise.resolve(mockResData), ok: true });
		const response = await request({ url: 'test', method: 'POST', data: { x: 'test' } })
		expect(response.data).toBe(mockResData)
	}) 
	
	it("response data should be empty object when json throw error", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ json: () => Promise.reject(), ok: true });
		const response = await request({ url: 'test', method: 'POST', data: { x: 'test' } })
		expect(response.data).toEqual({})
	})

	it("throw error when respone is not ok", async () => {
		const mockResData = { a: 1 };
    (global.fetch as jest.Mock).mockResolvedValue({ json: () => Promise.resolve(mockResData), ok: false });
		try {
			await request({ url: 'test', method: 'POST', data: { x: 'test' } })
		} catch(error: any) {
			expect(error?.message).toBe(JSON.stringify(mockResData));
		}
	})
})