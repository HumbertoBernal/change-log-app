import { User } from "../auth/types"


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

export type FilterLog = {
  name?: string,
  status?: LogStatus,
  priority?: Priority,
}

export interface LogQuery extends FilterLog {
  $or?: { [key: string]: { $regex: string } }[]
}

export type Project = {
  _id: string,
  name: string,
  description: string,

  created_at: string,
  updated_at: string,
  created_by: User,
}

export type CreateProject = {
  name: string,
  description: string,

  created_at: string,
  updated_at: string,
  created_by: User,
}

export type PatchProject = {
  name?: string,
  description?: string,
}

export type FilterProject = {
  name?: string,
  creator?: string,
  created_at?: string,
}

export interface ProjectQuery extends FilterProject {
  $or?: { [key: string]: { $regex: string } }[]
}