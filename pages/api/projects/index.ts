import type { NextApiRequest, NextApiResponse } from 'next'
import { Project } from '@/modules/projects/types'
import { MongoService } from '@/services/mongo'
import Error from 'next/error'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project[] | Project | { message: string } | string | null>
) {

  const method = req.method

  if (method === 'GET') {
    MongoService.listProjects()
      .then((project) => {
        res.status(200).json(project)
      })
      .catch((e) => {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
      })
    }
    else if (method === 'POST') {
      
      const { name, description } = req.body
      
    MongoService.createProject(name, description)
    .then((projectId) => {
      res.status(201).send(`Successfully created project with id ${projectId}`)
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ message: "Internal Server Error" });
    })
  }

}
