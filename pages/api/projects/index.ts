import type { NextApiRequest, NextApiResponse } from 'next'
import { FilterProject, Project } from '@/modules/projects/types'
import { MongoService, NUMBER_PER_PAGE } from '@/services/mongo'

interface Query extends FilterProject {
  page?: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project[] | Project | { message: string } | string | null>
) {

  const method = req.method

  try {

    if (method === 'GET') {

      const data = req.query as Query;
      const { page } = data;
      const actualPage = page ? parseInt(page) : 1;

      MongoService.listProjects(data, actualPage - 1)
        .then((results) => {

          const maxPages = Math.ceil(results.count / NUMBER_PER_PAGE)
          delete data.page
          const query = Object.keys(data).map(key => `${key}=${data[key]}`).join('&')

          const response = {
            count: results.count,
            next: actualPage < maxPages ? `/api/projects?page=${actualPage + 1}&${query}` : null,
            previous: actualPage > 1 ? `/api/projects?page=${actualPage - 1}&${query}` : null,
            results: results.findResult
          }

          res.status(200).json(response)
        })

    }
    else if (method === 'POST') {

      const { name, description } = req.body

      MongoService.createProject(name, description)
        .then((result) => {
          result
            ? res.status(201).json({ message: `Successfully created project with id ${result}` })
            : res.status(500).json({ message: `Failed to create project` })
        })

    }
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: e.message });
  }

}
