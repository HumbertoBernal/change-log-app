import type { NextApiRequest, NextApiResponse } from 'next'
import { Project } from '@/modules/projects/types'
import { MongoService } from '@/services/mongo'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Project | { message: string } | string | null>
) {
    const { id } = req.query
    const method = req.method
    if (typeof id !== 'string') { res.status(400).json({ message: "Id must be a string" }); }
    else {
        if (method === 'DELETE') {
            MongoService.deleteProject(id)
                .then((projectId) => {
                    if (projectId === null) {
                        res.status(500).json({ message: "Internal Server Error" });
                    } else {
                        res.status(200).send(`Successfully deleted project with id ${projectId}`)
                    }
                })
                .catch((e) => { console.error(e); })

        } else if (method === 'GET') {
            MongoService.getProject(id)
                .then((project) => {
                    res.status(200).json(project)
                })
                .catch((e) => {
                    console.error(e);
                    res.status(500).json({ message: "Internal Server Error" });
                })
        } else if (method === 'PUT') {
            const { name, description } = req.body
            MongoService.updateProjects(id, {name, description})
                .then((projectId) => {
                    res.status(200).send(`Successfully updated project with id ${projectId}`)
                })
                .catch((e) => {
                    console.error(e);
                    res.status(500).json({ message: "Internal Server Error" });
                })
        }
    }
} 
