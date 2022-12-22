import { User } from "@/modules/auth/types";

export enum LogStatus {
    TODO = "To do",
    IN_PROGRESS = "In progress",
    COMPLETED = "Completed",
    IN_REVIEW = "In review",
    ACCEPTED = "Accepted",
    REJECTED = "Rejected",
    DONE = "Done",
}

export enum Priority {
    NONE = "None",
    LOW = "Low",
    NORMAL = "Normal",
    HIGH = "High",
    URGENT = "Urgent",
}

export type RelevantPoint = {
    name: string,
    descriptors: string[],
}

export type Log = {
    id: string,
    project_id: string,
    name: string,
    relevant_points: RelevantPoint[],
    status: LogStatus,
    priority: Priority,

    created_at: string,
    updated_at: string
    created_by: User,
}

export type CreateLog = {
    project_id: string,
    name: string,
    relevant_points: RelevantPoint[],
    status: LogStatus,
    priority: Priority,
}

export type PutLog = {
    project_id: string,
    name: string,
    relevant_points: RelevantPoint[],
    status: LogStatus,
    priority: Priority,
}

export type PatchLog = {
    project_id: string,
    name: string,
    relevant_points: RelevantPoint[],
    status: LogStatus,
    priority: Priority,
}


export interface CreateLogAPI extends CreateLog {
    created_by: User,
}

export type FilterLog = {
    name?: string,
    status?: LogStatus,
    priority?: Priority,
}

export interface LogQuery extends FilterLog {
    $or?: { [key: string]: { $regex: string } }[]
}

export type LogsPagination = {
    count: number,
    next: string | null,
    previous: string | null,
    results: Log[],
}