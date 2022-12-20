import { FilterProject, ProjectQuery, LogQuery } from "./types";

export const getProjectQuery = (filter?: FilterProject) => {
    const queryObject: ProjectQuery = {};

    if (!filter) {
        return queryObject;
    }

    if (filter.name) {
        queryObject["name"] = filter.name;
    }

    if (filter.creator) {
        queryObject["$or"] = [{ "created_by.name": { $regex: filter.creator} }, { "created_by.email": { $regex: filter.creator} }]
    }

    if (filter.created_at) {
        queryObject["created_at"] = filter.created_at;
    }

    return queryObject;
}

export const getLogQuery = (filter?: FilterLog) => {
    const queryObject: LogQuery = {};

    if (!filter) {
        return queryObject;
    }

    if (filter.name) {
        queryObject["name"] = filter.name;
    }

    if (filter.status) {
        queryObject["status"] = filter.status;
    }

    if (filter.priority) {
        queryObject["priority"] = filter.priority;
    }

    return queryObject;
}