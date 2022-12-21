import asyncWrapper from "@/common/utils";
import { CreateProject, PatchProject, Project, PutProject, ResponseMessage, ProjectsPagination } from "@/modules/projects/types";
import { AxiosError, AxiosResponse } from "axios";
import API from "src/api/axios";

const getAll = async () => {
    return asyncWrapper<AxiosResponse<ProjectsPagination>, AxiosError>(API.get("projects/"));
};

const get = async (id: string) => {
    return asyncWrapper<AxiosResponse<Project>, AxiosError>(API.get(`projects/${id}`));
};

const create = async (project: CreateProject) => {
    return asyncWrapper<AxiosResponse<ResponseMessage>, AxiosError>(API.post("projects/", project));
};

const patch = async (id: string, project: PatchProject) => {
    return asyncWrapper<AxiosResponse<ResponseMessage>, AxiosError>(API.patch(`projects/${id}`, project));
};

const put = async (id: string, project: PutProject) => {
    return asyncWrapper<AxiosResponse<ResponseMessage>, AxiosError>(API.patch(`projects/${id}`, project));
};

const remove = async (id: string) => {
    return asyncWrapper<AxiosResponse<ResponseMessage>, AxiosError>(API.patch(`projects/${id}`));
};

export const ProjectService = {
    getAll,
    get,
    create,
    put,
    patch,
    remove
};
