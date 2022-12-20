import type { NextApiRequest, NextApiResponse } from 'next'
import { FilterProject, Project } from '@/modules/projects/types'
import { MongoService } from '@/services/mongo'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project[] | Project | { message: string } | string | null>
) {

  const method = req.method

  try {

    if (method === 'GET') {

      const data = req.query as FilterProject;

      MongoService.listProjects(data)
        .then((project) => {
          res.status(200).json(project)
        })

    }
    else if (method === 'POST') {

      const { name, description } = req.body

      MongoService.createProject(name, description)
        .then((result) => {
          result
            ? res.status(201).json({ message: `Successfully created project with id ${projectId}` })
            : res.status(500).json({ message: `Failed to create project` })
        })

    }
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: e.message });
  }

}
