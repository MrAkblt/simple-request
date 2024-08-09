export interface ResponseType<T> extends Response {
  data: T;
}
export interface ErrorType<T = any> extends Error {
  response?: ResponseType<T>;
}

export async function request<T = any>(options: any): Promise<ResponseType<T>> {
  if (options.data) {
    options.headers = { ...options.header, 'Content-Type': 'application/json'}
    options.body = JSON.stringify(options.data);
  }
  let _response = await fetch(options.url, options);
  let response = Object.assign(_response, { data: {} }) as ResponseType<T>
  try {
    const data = await _response.json();
    response = Object.assign(response, { data })
  } catch (error) {}

  if (!response.ok) {
    const error: ErrorType<T> = new Error(response.statusText);
    error.response = response;
    throw error;
  }

  return response;
}

request.get = <T = any>(url: string, options?: any) => request<T>({ url, ...options });
request.post = <T = any>(url: string, data: any, options: any = {}) =>
  request<T>({ url, ...options, data, method: 'POST' });

request.put = <T = any>(url: string, data: any, options: any = {}) =>
  request<T>({ url, ...options, data, method: 'PUT' });

request.delete = <T = any>(url: string, options: any = {}) =>
  request<T>({ url, ...options, method: 'DELETE' });
