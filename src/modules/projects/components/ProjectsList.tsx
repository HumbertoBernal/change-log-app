import LoadingSpinner from "@/common/components/LoadingSpinner";
import PaginationBlock from "@/common/components/PaginationBlock";
import { classNames } from "@/common/utils";
import { useNotificationContext } from "@/contexts/NotificationContext";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { Dispatch, Fragment, SetStateAction, useState } from "react"
import { FilterProject, Project, ProjectsPagination } from "../types"
import UpdateModal from "./UpdateModal";

type ProjectsListProps = {
    projectsPagination: ProjectsPagination | undefined,
    fetchProjects: (url?: string) => Promise<boolean | undefined>
    currentPageState: [number, Dispatch<SetStateAction<number>>]
}


export default function ProjectsList({ projectsPagination, fetchProjects, currentPageState }: ProjectsListProps) {

    const { setNotification } = useNotificationContext()

    const [updateProject, setUpdateProject] = useState<Project>()
    const [loading, setLoading] = useState<boolean>(false)

    const [currentPage, setCurrentPage] = currentPageState
    const [filter, setFilter] = useState<FilterProject>()


    const handleNextPage = async (page: number) => {
        if (projectsPagination && projectsPagination.next) {
            setLoading(true)
            const result = await fetchProjects(projectsPagination.next);
            setLoading(false)
            if (result) {
                setCurrentPage(page)
            } else {
                setNotification({ title: 'Error', message: 'Something went wrong', isError: true })
            }
        }
    };

    const handlePreviousPage = async (page: number) => {
        if (projectsPagination && projectsPagination.previous) {
            setLoading(true)
            const result = await fetchProjects(projectsPagination.previous);
            setLoading(false)
            if (result) {
                setCurrentPage(page)
            } else {
                setNotification({ title: 'Error', message: 'Something went wrong', isError: true })
            }
        }
    };

    return (
        <Fragment>
            {/* Projects list (only on smallest breakpoint) */}
            <div className="mt-10 sm:hidden">
                <div className="px-4 sm:px-6">
                    <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Projects</h2>
                </div>
                {loading
                    ? <div className="text-center m-5"> <LoadingSpinner /></div>
                    : <ul role="list" className="mt-3 border-t border-gray-200 divide-y divide-gray-100">
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
                    </ul>}
                {projectsPagination && <PaginationBlock
                    count={projectsPagination.count}
                    totalPages={Math.floor(projectsPagination.count / 5) + 1}
                    currentPage={currentPage}
                    handleNextPage={handleNextPage}
                    handlePreviousPage={handlePreviousPage}
                />}
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
                        {loading
                            ? <div className="m-8"> <LoadingSpinner /></div>
                            : <tbody className="bg-white divide-y divide-gray-100">
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
                                            <a onClick={() => setUpdateProject(project)} className="text-blue-600 hover:text-blue-900 cursor-pointer">
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>}
                    </table>
                </div>
                {projectsPagination && <PaginationBlock
                    count={projectsPagination.count}
                    totalPages={Math.floor(projectsPagination.count / 5) + 1}
                    currentPage={currentPage}
                    handleNextPage={handleNextPage}
                    handlePreviousPage={handlePreviousPage}
                />}
            </div>
            {updateProject && <UpdateModal setUpdateProject={setUpdateProject} project={updateProject} />}
        </Fragment>
    )
}