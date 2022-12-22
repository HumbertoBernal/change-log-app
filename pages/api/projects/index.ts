import type { NextApiRequest, NextApiResponse } from "next";
import {
  FilterProject,
  Project,
  ResponseMessage,
  ProjectsPagination,
} from "@/modules/projects/types";
import { MongoService, NUMBER_PER_PAGE } from "@/services/mongo";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

interface Query extends FilterProject {
  page?: string;
}

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project[] | Project | ResponseMessage | ProjectsPagination | null>,
) {
  const session = await getSession(req, res);
  const user = session?.user;
  const method = req.method;

  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    try {
      if (method === "GET") {
        const data = req.query as Query;
        const { page } = data;
        const actualPage = page ? parseInt(page) : 1;

        MongoService.listProjects(data, actualPage - 1).then((results) => {
          const maxPages = Math.ceil(results.count / NUMBER_PER_PAGE);
          delete data.page;
          const query = Object.keys(data)
            // @ts-ignore
            .map((key) => `${key}=${data[key]}`)
            .join("&");

          const response = {
            count: results.count,
            next: actualPage < maxPages ? `/api/projects?page=${actualPage + 1}&${query}` : null,
            previous: actualPage > 1 ? `/api/projects?page=${actualPage - 1}&${query}` : null,
            results: results.findResult,
          };

          res.status(200).json(response);
        });
      } else if (method === "POST") {
        const { name, description } = req.body;
        const created_by = { name: user.name, email: user.email };

        MongoService.createProject({ name, description, created_by }).then((result) => {
          result
            ? res.status(201).json({ message: `Successfully created project with id ${result}` })
            : res.status(500).json({ message: `Failed to create project` });
        });
      }
    } catch (e) {
      console.error(e);
      const error = e as Error;
      res.status(400).json({ message: error.message });
    }
  }
});
