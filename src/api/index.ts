import { isArray } from "lodash";
import axios, { AxiosResponse } from "axios";
import { API_URLS } from "@/constants";

const cookieValue = 'auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAzNzg3Mjg1LTVjZTUtNGE0My1hY2M1LWZjMGExZDg5N2I0NSIsImVtYWlsIjoiYW5ocGhhbjE5MDkxM0BnbWFpbC5jb20iLCJ3c19pZCI6Imlnb3RhaSIsIndvcmtzcGFjZV9pZCI6Imlnb3RhaSIsImV4cCI6MTc0NTUyMjU4M30.wECSDmEQ8WbT5LkRZjcHGQKuQwVFdUAR8AvQhC_P__c; auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI5MmVlYWZiLThjYmEtMzBkMC02YTI4LTRlOGU2NjUwNGE2OSIsImVtYWlsIjoibmV2ZXJkaWUwMjAzQGdtYWlsLmNvbSIsIndzX2lkIjoidmlldHRlbC1kaWdpdGFsIiwid29ya3NwYWNlX2lkIjoidmlldHRlbC1kaWdpdGFsIiwiZXhwIjoxNzQ4NzU1NTU4fQ.HPTdxTVDEyAoPrfglZoYOae0-AIfTUO0349QxteTt0A; session=eyJib3RfaWRfMWFjYTU4OWUtYzUyMy00ZjlmLTg4ZTEtOWU2NzFiMmI1NDJlIjogImM5ZjVlODYwLWE0MDktNDE4Ni04MmI4LTU5YzI2OTk5ODNkMSJ9.ZmfB9A.2ItibthtJ5y1oSR5V3oSlP715os'

const api = axios.create({
  baseURL: API_URLS.BASE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Cookie': cookieValue,
  },
});

api.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  async (error) => {
    if (error.response?.data?.message) {
      if (isArray(error.response?.data?.message)) {
        // TODO: Handle array of error message
      }
    }
    if (error.response?.status === 401 || error.response?.status === 403) {
    }

    return Promise.reject(error.response?.data);
  }
);

export { api };
