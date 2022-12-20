import type { NextApiRequest, NextApiResponse } from 'next'
import { Project } from '@/modules/projects/types'
import { MongoService } from '@/services/mongo'
import { withApiAuthRequired } from '@auth0/nextjs-auth0'

export default withApiAuthRequired(function handler(
    req: NextApiRequest,
    res: NextApiResponse<Log | { message: string } | string | null>
) {
    const { logId } = req.query
    const method = req.method
    if (typeof logId !== 'string') { res.status(400).json({ message: "Id must be a string" }); }
    else {
        try {
            if (method === 'DELETE') {
                MongoService.deleteLog(logId)
                    .then((result) => {
                        if (result && result.deletedCount) {
                            res.status(202).json({ message: `Successfully removed Log with Id ${logId}` });
                        } else if (!result) {
                            res.status(400).json({ message: `Failed to remove Log with Id ${logId}` });
                        } else if (!result.deletedCount) {
                            res.status(404).json({ message: `Log with Id ${logId} does not exist` });
                        }
                    })

            } else if (method === 'GET') {
                logId.length === 24
                    ? MongoService.getLog(logId)
                        .then((log) => {
                            log
                                ? res.status(200).json(log)
                                : res.status(404).json({ message: `Log with Id ${logId} does not exist` })
                        })
                    : res.status(400).json({ message: "Id must be 24 characters long" })

            } else if (method === 'PUT') {
                const data = req.body as Log

                // Todo validate data have the putLogo type before sending to MongoService

                MongoService.putLog(logId, data)
                    .then((result) => {
                        result
                            ? res.status(200).json({ message: `Successfully updated Log with Id ${logId}` })
                            : res.status(304).json({ message: `Log with id: ${logId} not updated` })
                    })

            } else if (method === 'PATCH') {
                const data = req.body

                // Todo validate data have the patchLogo type before sending to MongoService

                MongoService.patchLog(logId, data)
                    .then((result) => {
                        res.status(200).send(`Successfully updated log with id ${logId}`)
                    })
            }
        } catch (e) {
            console.error(e);
            res.status(400).json({ message: e.message });
        }

    }
})
