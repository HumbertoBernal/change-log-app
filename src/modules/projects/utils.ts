import { FilterProject, ProjectQuery } from "./types";

export const getQuery = (filter?: FilterProject) => {
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
