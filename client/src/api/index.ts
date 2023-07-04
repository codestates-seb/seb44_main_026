import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export const axiosClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
});

axiosClient.defaults.withCredentials = true;

class API {
  private async CALL({
    method,
    url,
    data = null,
  }: AxiosRequestConfig): Promise<AxiosResponse> {
    try {
      const response: AxiosResponse = await axiosClient({
        url,
        method,
        data,
      });

      return response;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized error
      }

      console.error('# client-error-axios: ', error);
      return error.response;
    }
  }

  public GET(url: string): Promise<AxiosResponse> {
    return this.CALL({
      method: 'GET',
      url,
    });
  }

  public POST({ url, ...params }: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.CALL({
      method: 'POST',
      url,
      ...params,
    });
  }

  public PUT({ url, ...params }: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.CALL({
      method: 'PUT',
      url,
      ...params,
    });
  }

  public DELETE({
    url,
    ...params
  }: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.CALL({
      method: 'DELETE',
      url,
      ...params,
    });
  }

  public PATCH({ url, ...params }: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.CALL({
      method: 'PATCH',
      url,
      ...params,
    });
  }
}

export default new API();
