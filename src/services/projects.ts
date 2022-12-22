import asyncWrapper from "@/common/utils";
import { CreateProject, PatchProject, Project, PutProject, ResponseMessage, ProjectsPagination } from "@/modules/projects/types";
import { AxiosError, AxiosResponse } from "axios";
import API from "src/api/axios";


const getAll = async () => {
    return asyncWrapper<AxiosResponse<ProjectsPagination>, AxiosError>(API.get("api/projects/"));
};

const get = async (id: string) => {
    return asyncWrapper<AxiosResponse<Project>, AxiosError>(API.get(`api/projects/${id}`));
};

const create = async (project: CreateProject) => {
    return asyncWrapper<AxiosResponse<ResponseMessage>, AxiosError>(API.post("api/projects/", project));
};

const patch = async (id: string, project: PatchProject) => {
    return asyncWrapper<AxiosResponse<ResponseMessage>, AxiosError>(API.patch(`api/projects/${id}`, project));
};

const put = async (id: string, project: PutProject) => {
    return asyncWrapper<AxiosResponse<ResponseMessage>, AxiosError>(API.put(`api/projects/${id}`, project));
};

const remove = async (id: string) => {
    return asyncWrapper<AxiosResponse<ResponseMessage>, AxiosError>(API.delete(`api/projects/${id}`));
};

const getFromUrl = async (url: string) => {
    return asyncWrapper<AxiosResponse<ProjectsPagination>, AxiosError>(API.get(url));
}

export const ProjectService = {
    getAll,
    get,
    create,
    put,
    patch,
    remove,
    getFromUrl, 
};
