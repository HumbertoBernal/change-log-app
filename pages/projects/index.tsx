import { Fragment, useEffect, useState } from "react";
import { classNames } from '@/common/utils'
import { Project, ProjectsPagination } from "@/modules/projects/types";
import { ProjectService } from "@/services/projects";
import { ChevronRightIcon } from '@heroicons/react/solid'

import MainLayout from "@/layouts/MainLayout";
import UpdateModal from "@/modules/projects/components/UpdateModal";
import { useNotificationContext } from '@/contexts/NotificationContext'


const ProjectsPage = () => {
  const [projectsPagination, setProjectsPagination] = useState<ProjectsPagination>()
  const [updateProject, setUpdateProject] = useState<Project>()

  const handleEdit = (project: Project) => {
    setUpdateProject(project)
  }

  const fetchProjects = async () => {
    const [res, err] = await ProjectService.getAll();

    if (err) {
      console.log(err)
      return
    }

    if (res) {
      setProjectsPagination(res.data)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    if (updateProject === undefined) {
      fetchProjects()
    }
  }, [updateProject])


  return (
    <MainLayout>
      <Fragment>
        {/* Page title & actions */}
        <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">Home</h1>
          </div>
          <div className="mt-4 flex sm:mt-0 sm:ml-4">

            <button
              type="button"
              className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
            >
              Create
            </button>
          </div>
        </div>

        {/* Projects list (only on smallest breakpoint) */}
        <div className="mt-10 sm:hidden">
          <div className="px-4 sm:px-6">
            <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Projects</h2>
          </div>
          <ul role="list" className="mt-3 border-t border-gray-200 divide-y divide-gray-100">
            {projectsPagination && projectsPagination.results.map((project) => (
              <li key={project._id}>
                <a href="#" className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6">
                  <span className="flex items-center truncate space-x-3">
                    <span
                      className={classNames('bg-pink-600 w-2.5 h-2.5 flex-shrink-0 rounded-full')}
                      aria-hidden="true"
                    />
                    <span className="font-medium truncate text-sm leading-6">
                      {project.name}
                    </span>
                  </span>
                  <ChevronRightIcon
                    className="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects table (small breakpoint and up) */}
        <div className="hidden mt-8 sm:block">
          <div className="align-middle inline-block min-w-full border-b border-gray-200">
            <table className="min-w-full">
              <thead>
                <tr className="border-t border-gray-200">
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span className="lg:pl-2">Project</span>
                  </th>
                  <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last updated
                  </th>
                  <th className="table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created by
                  </th>
                  <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" />
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {projectsPagination && projectsPagination.results.map((project) => (
                    <tr key={project._id}>
                      <td className="px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex items-center space-x-3 lg:pl-2">
                          <div
                            className={classNames('bg-pink-500 flex-shrink-0 w-2.5 h-2.5 rounded-full')}
                            aria-hidden="true"
                          />
                          <a href="#" className="truncate hover:text-gray-600">
                            <span>
                              {project.name}
                            </span>
                          </a>
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                        {new Date(project.created_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 font-medium">
                        {project.created_by.name}

                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <a onClick={() => handleEdit(project)} className="text-blue-600 hover:text-blue-900 cursor-pointer">
                          Edit
                        </a>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {updateProject && <UpdateModal setUpdateProject={setUpdateProject} project={updateProject} />}
      </Fragment>

    </MainLayout>
  )
}

export default ProjectsPage;
