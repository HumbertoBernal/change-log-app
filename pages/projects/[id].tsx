import { Fragment, useEffect, useState } from "react";
import { FilterLog, LogsPagination } from "@/modules/logs/types";
import { LogService } from "@/services/logs";

import MainLayout from "@/layouts/MainLayout";
import LoadingSpinner from "@/common/components/LoadingSpinner";
import CreateModal from "@/modules/logs/components/CreateModal";
import DeleteModal from "@/modules/logs/components/DeleteModal";
import LogsSection from "@/modules/logs/components/LogsSection";
import { useRouter } from 'next/router'

import { HomeIcon } from '@heroicons/react/solid'
import Link from "next/link";

const LogPage = () => {

  const router = useRouter()
  const { id } = router.query

  const [logsPagination, setLogsPagination] = useState<LogsPagination>()
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const currentPageState = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true)

  const pages = [
    { name: 'Projects', href: '/projects', current: false },
    { name: typeof id === 'string' ? id : 'Not Fount', href: '/projects/' + id, current: true },
  ]

  const fetchLogs = async (url?: string) => {

    if (typeof id !== 'string') {
      setLoading(false)
      return false
    }

    const [res, err] = url ? await LogService.getFromUrl(url) : await LogService.getAll(id);

    if (err) {
      console.log(err)
      setLoading(false)
      return false
    }

    if (res) {
      setLogsPagination(res.data)
      setLoading(false)
      return true
    }
  }

  const reloadLogs = () => {
    setLoading(true)
    fetchLogs()
    currentPageState[1](1)
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  useEffect(() => {
    if (openCreateModal === undefined) {
      setLoading(true)
      fetchLogs()
    }
  }, [openCreateModal])

  return (
    <MainLayout >
      <Fragment>
        {/* Page title & actions */}
        <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate"> Project details</h1>
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

        <div className="m-5">
          <nav className="flex" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-4">
              <li>
                <div>
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                    <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">Home</span>
                  </a>
                </div>
              </li>
              {pages.map((page) => (
                <li key={page.name}>
                  <div className="flex items-center">
                    <svg
                      className="flex-shrink-0 h-5 w-5 text-gray-300"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                    </svg>
                    <Link
                      href={page.href}
                      className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                      aria-current={page.current ? 'page' : undefined}
                    >
                      {page.name}
                    </Link>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {loading
          ? <div className="flex justify-center m-8"><LoadingSpinner /> </div>
          : < LogsSection logsPagination={logsPagination} reloadLogs={reloadLogs} />
        }
        <CreateModal open={openCreateModal} setOpen={setOpenCreateModal} projectId={typeof id === 'string' ? id : ''} reloadLogs={reloadLogs} />
      </Fragment>

    </MainLayout>
  )
}

export default LogPage;
