import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const axiosClient = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '' : 'https://teamdev.shop',
});

axiosClient.defaults.withCredentials = true;

class API {
  async CALL<T>({
    method,
    url,
    data = null,
  }: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      const response = await axiosClient({
        url,
        method,
        data,
      });
      return response;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        // Unauthorized error handling
      }

      console.error('# client-error-axios: ', error);
      return error.response;
    }
  }

  GET<T>(url: string): Promise<AxiosResponse<T>> {
    return this.CALL<T>({
      method: 'GET',
      url,
    });
  }

  POST<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return this.CALL<T>({
      method: 'POST',
      url,
      data,
    });
  }

  PUT<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return this.CALL<T>({
      method: 'PUT',
      url,
      data,
    });
  }

  DELETE<T>(url: string): Promise<AxiosResponse<T>> {
    return this.CALL<T>({
      method: 'DELETE',
      url,
    });
  }

  PATCH<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return this.CALL<T>({
      method: 'PATCH',
      url,
      data,
    });
  }
}

export default new API();
