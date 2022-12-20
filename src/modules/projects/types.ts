import { User } from "../auth/types"


export enum LogStatus {
  TODO = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3,
  IN_REVIEW = 4,
  ACCEPTED = 5,
  REJECTED = 6,
  DONE = 7,
}

export enum Priority {
  NONE = 0,
  LOW = 1,
  NORMAL = 2,
  HIGH = 3,
  URGENT = 4,
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