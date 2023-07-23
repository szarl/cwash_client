import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ClassConstructor, instanceToPlain, plainToInstance } from 'class-transformer';
import assign from 'lodash/assign';

class AjaxContext<T> {
    deserializationClass: ClassConstructor<T>;
    axiosArgs: any;
    serializeRequestData: boolean;
    args: Object = {};
}

export class AjaxBase {
    private hostName: string;
    private axiosGlobalOptions: AxiosRequestConfig;

    constructor(hostName: string = '', axiosGlobalOptions: AxiosRequestConfig = {}) {
        this.hostName = hostName;
        this.axiosGlobalOptions = axiosGlobalOptions;
    }

    async send<T>(method: string, url: string, data: object = {}, context: AjaxContext<T> = new AjaxContext): Promise<T | T[]> {
        const finalArgs = assign({
            url: this.hostName + url,
            method,
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
        }, this.axiosGlobalOptions, context.axiosArgs);

        if (data) {
            finalArgs.data = context.serializeRequestData ? instanceToPlain(data) : data;
        }

        return axios(finalArgs).catch((error) => {
            throw error;
        }).then((response: string | AxiosResponse<T>) => {
            const data = (<AxiosResponse>response).data;
            return context.deserializationClass ? plainToInstance(context.deserializationClass, data) : data;
        });
    }

    get<T>(url: string, context = new AjaxContext<T>(), data: object = {}): Promise<T | T[]> {
        context.args = ({ ...context.axiosArgs, params: data });
        return this.send<T>('get', url, {}, context);
    }

    post<T>(url: string, data: object, context = new AjaxContext<T>()): Promise<T | T[]> {
        return this.send<T>('post', url, data, context);
    }

    postFormData<T>(url: string, data: object, context = new AjaxContext<T>()): Promise<T | T[]> {
        context.args = ({ ...context.axiosArgs, headers: { 'Content-Type': 'multipart/form-data' } });
        return this.send<T>('post', url, data, context);
    }

    patch<T>(url: string, data: object, context = new AjaxContext<T>()): Promise<T | T[]> {
        return this.send('patch', url, data, context);
    }

    put<T>(url: string, data: object, context = new AjaxContext<T>()): Promise<T | T[]> {
        return this.send<T>('put', url, data, context);
    }

    delete<T>(url: string, data: object, context = new AjaxContext<T>()): Promise<T | T[]> {
        return this.send<T>('delete', url, data, context);
    }
}