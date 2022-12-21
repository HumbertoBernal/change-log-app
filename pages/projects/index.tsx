import { Fragment, useEffect, useState } from "react";
import { ProjectsPagination } from "@/modules/projects/types";
import { ProjectService } from "@/services/projects";

import MainLayout from "@/layouts/MainLayout";
import CreateModal from "@/modules/projects/components/CreateModal";
import ProjectsList from "@/modules/projects/components/ProjectsList";
import LoadingSpinner from "@/common/components/LoadingSpinner";


const ProjectsPage = () => {
  const [projectsPagination, setProjectsPagination] = useState<ProjectsPagination>()
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)
  const currentPageState = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true)

  const fetchProjects = async (url?: string) => {

    const [res, err] = url ? await ProjectService.getFromUrl(url) : await ProjectService.getAll();

    if (err) {
      console.log(err)
      setLoading(false)
      return false
    }

    if (res) {
      setProjectsPagination(res.data)
      setLoading(false)
      return true
    }
  }

  useEffect(() => { fetchProjects() }, [])

  useEffect(() => {
    if (openCreateModal === undefined) {
      fetchProjects()
    }
  }, [openCreateModal])

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
              onClick={() => setOpenCreateModal(true)}
              type="button"
              className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
            >
              Create
            </button>
          </div>
        </div>
        {loading
          ? <div className="flex justify-center m-8"><LoadingSpinner /> </div>
          : <ProjectsList projectsPagination={projectsPagination} fetchProjects={fetchProjects} currentPageState={currentPageState} />}
        <CreateModal open={openCreateModal} setOpen={setOpenCreateModal} />
      </Fragment>

    </MainLayout>
  )
}

export default ProjectsPage;
