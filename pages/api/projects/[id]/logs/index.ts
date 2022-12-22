import type { NextApiRequest, NextApiResponse } from "next";
import { FilterLog, Log, LogsPagination, CreateLogAPI } from "@/modules/logs/types";
import { MongoService, NUMBER_PER_PAGE } from "@/services/mongo";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

interface Query extends FilterLog {
  page?: string;
}

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Log[] | Log | { message: string } | LogsPagination | null>,
) {
  const session = await getSession(req, res);
  const user = session?.user;
  const { id } = req.query;
  const method = req.method;
  if (typeof id !== "string") {
    res.status(400).json({ message: "Id must be a string" });
  } else if (!user) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    try {
      if (method === "GET") {
        const data = req.query as Query;
        const { page } = data;
        const actualPage = page ? parseInt(page) : 1;

        MongoService.listLogs(actualPage - 1, { ...data, project_id: id }).then((results) => {
          const maxPages = Math.ceil(results.count / NUMBER_PER_PAGE);
          delete data.page;
          const query = Object.keys(data)
            // @ts-ignore
            .map((key) => `${key}=${data[key]}`)
            .join("&");

          const response = {
            count: results.count,
            next:
              actualPage < maxPages
                ? `/api/projects/${id}/logs?page=${actualPage + 1}&${query}`
                : null,
            previous:
              actualPage > 1 ? `/api/projects/${id}/logs?page=${actualPage - 1}&${query}` : null,
            results: results.findResult,
          };

          res.status(200).json(response);
        });
      } else if (method === "POST") {
        const { name, relevant_points, status, priority } = req.body;

        // Todo validate data have the CreateLog type before sending to MongoService
        const createLogData: CreateLogAPI = {
          name,
          project_id: id,
          relevant_points,
          status,
          priority,
          created_by: { name: user.name, email: user.email },
        };

        MongoService.createLog(createLogData).then((result) => {
          result
            ? res.status(201).json({ message: `Successfully created log with id ${result}` })
            : res.status(500).json({ message: `Failed to create log` });
        });
      }
    } catch (e) {
      console.error(e);
      const error = e as Error;
      res.status(400).json({ message: error.message });
    }
  }
});
