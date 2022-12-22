import type { NextApiRequest, NextApiResponse } from 'next'
import { FilterLog, Log } from '@/modules/projects/types'
import { MongoService, NUMBER_PER_PAGE } from '@/services/mongo'
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'

interface Query extends FilterLog {
    page?: number
}

export default withApiAuthRequired(async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Log[] | Log | { message: string } | string | null>
) {

    const { user } = await getSession(req, res);
    const { id } = req.query
    const method = req.method
    if (typeof id !== 'string') { res.status(400).json({ message: "Id must be a string" }); }

    try {

        if (method === 'GET') {

            const data = req.query as Query;
            const { page } = data;
            const actualPage = page ? parseInt(page) : 1;

            MongoService.listLogs({...data, project_id: id}, actualPage - 1)
                .then((results) => {

                    const maxPages = Math.ceil(results.count / NUMBER_PER_PAGE)
                    delete data.page
                    const query = Object.keys(data).map(key => `${key}=${data[key]}`).join('&')

                    const response = {
                        count: results.count,
                        next: actualPage < maxPages ? `/api/projects/${id}/logs?page=${actualPage + 1}&${query}` : null,
                        previous: actualPage > 1 ? `/api/projects/${id}/logs?page=${actualPage - 1}&${query}` : null,
                        results: results.findResult
                    }

                    res.status(200).json(response)
                })

        }
        else if (method === 'POST') {

            const { name, relevant_points, status, priority } = req.body
            const { id } = req.query

            // Todo validate data have the CreateLog type before sending to MongoService
            const createLogData: CreateLogAPI = {
                name,
                project_id: id,
                relevant_points,
                status,
                priority,
                created_by: { name: user.name, email: user.email },
            }

            MongoService.createLog(createLogData)
                .then((result) => {
                    result
                        ? res.status(201).json({ message: `Successfully created log with id ${result}` })
                        : res.status(500).json({ message: `Failed to create log` })
                })

        }
    } catch (e) {
        console.error(e);
        res.status(400).json({ message: e.message });
    }

})
