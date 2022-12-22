import asyncWrapper from "@/common/utils";
import { LogsPagination, Log, CreateLog, PatchLog, PutLog } from "@/modules/logs/types";
import { ResponseMessage } from "@/common/types";
import { AxiosError, AxiosResponse } from "axios";
import API from "src/api/axios";


const getAll = async (project_id: string ) => {
    return asyncWrapper<AxiosResponse<LogsPagination>, AxiosError>(API.get(`api/projects/${project_id}/logs/`));
};

const get = async (project_id: string, id: string) => {
    return asyncWrapper<AxiosResponse<Log>, AxiosError>(API.get(`api/projects/${project_id}/logs/${id}`));
};

const create = async (project_id: string, project: CreateLog) => {
    return asyncWrapper<AxiosResponse<ResponseMessage>, AxiosError>(API.post(`api/projects/${project_id}/logs/`, project));
};

const patch = async (project_id: string, id: string, log: PatchLog) => {
    return asyncWrapper<AxiosResponse<ResponseMessage>, AxiosError>(API.patch(`api/projects/${project_id}/logs/${id}`, log));
};

const put = async (project_id: string, id: string, log: PutLog) => {
    return asyncWrapper<AxiosResponse<ResponseMessage>, AxiosError>(API.put(`api/projects/${project_id}/logs/${id}`, log));
};

const remove = async (project_id: string, id: string) => {
    return asyncWrapper<AxiosResponse<ResponseMessage>, AxiosError>(API.delete(`api/projects/${project_id}/logs/${id}`));
};

const getFromUrl = async (url: string) => {
    return asyncWrapper<AxiosResponse<LogsPagination>, AxiosError>(API.get(url));
}

export const LogService = {
    getAll,
    get,
    create,
    put,
    patch,
    remove,
    getFromUrl, 
};
