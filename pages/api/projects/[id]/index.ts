import type { NextApiRequest, NextApiResponse } from "next";
import { Project } from "@/modules/projects/types";
import { MongoService } from "@/services/mongo";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { ResponseMessage } from "@/common/types";

export default withApiAuthRequired(function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project | ResponseMessage | string | null>,
) {
  const { id } = req.query;
  const method = req.method;
  if (typeof id !== "string") {
    res.status(400).json({ message: "Id must be a string" });
  } else {
    try {
      if (method === "DELETE") {
        MongoService.deleteProject(id).then((result) => {
          if (result && result.deletedCount) {
            res.status(202).json({ message: `Successfully removed project with id ${id}` });
          } else if (!result) {
            res.status(400).json({ message: `Failed to remove project with id ${id}` });
          } else if (!result.deletedCount) {
            res.status(404).json({ message: `Project with id ${id} does not exist` });
          }
        });
      } else if (method === "GET") {
        id.length === 24
          ? MongoService.getProject(id).then((project) => {
              project
                ? res.status(200).json(project)
                : res.status(404).json({ message: `Project with id ${id} does not exist` });
            })
          : res.status(400).json({ message: "Id must be 24 characters long" });
      } else if (method === "PUT") {
        const data = req.body as Project;

        MongoService.putProject(id, data).then((result) => {
          result
            ? res.status(200).json({ message: `Successfully updated project with id ${id}` })
            : res.status(304).json({ message: `Project with id: ${id} not updated` });
        });
      } else if (method === "PATCH") {
        const { name, description } = req.body;
        MongoService.patchProject(id, { name, description }).then((result) => {
          res.status(200).json({ message: `Successfully updated project with id ${id}` });
        });
      }
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: e.message });
    }
  }
});
