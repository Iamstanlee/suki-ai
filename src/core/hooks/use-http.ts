import { useMemo } from 'react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { apiUrl } from '@/core/constants';

export const useHttp = () => {
  const http = useMemo(() => {
    return axios.create({
      baseURL: apiUrl,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
  }, []);

  return {
    get: async <T>(url: string) => {
      try {
        const response = await http.get<T>(url);
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(error.response?.data.message);
        }
        throw error;
      }
    },
    post: async <T>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig<any>,
    ) => {
      try {
        const response = await http.post<T>(url, data, config);
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(error.response?.data.message ?? error.message);
        }
        throw error;
      }
    },
    put: async <T>(url: string, data?: any) => {
      try {
        const response = await http.put<T>(url, data);
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(error.response?.data.message);
        }
        throw error;
      }
    },
    delete: async <T>(url: string) => {
      try {
        const response = await http.delete<T>(url);
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(error.response?.data.message);
        }
        throw error;
      }
    },
  };
};
