import request from "./request";

const macros = {
	get: <T = any>(url: string, options?: any) => request<T>({ url, ...options }),

	post: <T = any>(url: string, data: any, options: any) =>
		request<T>({ url, ...options, data, method: 'POST' }),

	put: <T = any>(url: string, data: any, options: any) =>
		request<T>({ url, ...options, data, method: 'PUT' }),

	delete: <T = any>(url: string, options?: any) =>
		request<T>({ url, ...options, method: 'DELETE' }),
}

export default macros;
