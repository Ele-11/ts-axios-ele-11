

export type Method = 
'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'TRACE' | 'CONNECT'|
'get' | 'post' | 'put' | 'delete' | 'head' | 'options' | 'trace' | 'connect';


 
export interface AxiosRequestConfig {
    url: string;
    method?: Method;
    data?: any;
    params?: any;
    headers?: any;
}
