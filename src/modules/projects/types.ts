import { User } from "../auth/types"

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
}

export interface CreateProjectAPI extends CreateProject {
  created_by: User,
}

export type PatchProject = {
  name?: string,
  description?: string,
}

export type PutProject = {
  name: string,
  description: string,

  created_at: string,
  updated_at: string,
  created_by: User,
}

export type FilterProject = {
  name?: string,
  creator?: string,
  created_at?: string,
}

export interface ProjectQuery {
  name?: { $regex: string },
  creator?: string,
  created_at?: { $gte: string }
  $or?: { [key: string]: { $regex: string } }[]
}

export type ProjectsPagination = {
  count: number,
  next: string | null,
  previous: string | null,
  results: Project[],
}