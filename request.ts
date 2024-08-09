export interface ResponseType extends Response {
  data?: any;
}
export interface ErrorType extends Error {
  response?: ResponseType;
}

export async function request(options: any): Promise<ResponseType> {
  if (options.data) {
		options.headers = { ...options.header, 'Content-Type': 'application/json'}
    options.body = JSON.stringify(options.data);
  }
  const response: ResponseType = await fetch(options.url, options);
  try {
    response.data = await response.json();
  } catch (error) {}

  if (!response.ok) {
    const error: ErrorType = new Error(response.statusText);
    error.response = response;
    throw error;
  }


  return response as ResponseType;
}

request.get = (url: string, options?: any) => request({ url, ...options });
request.post = (url: string, data: any, options: any = {}) =>
  request({ url, ...options, data, method: 'POST' });

request.put = (url: string, data: any, options: any = {}) =>
  request({ url, ...options, data, method: 'PUT' });

request.delete = (url: string, options: any = {}) =>
  request({ url, ...options, method: 'DELETE' });
