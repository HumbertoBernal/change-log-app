import { Dispatch, Fragment, SetStateAction, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Dialog, Transition } from '@headlessui/react'
import { PatchProject, Project } from '@/modules/projects/types'

import { useNotificationContext } from '@/contexts/NotificationContext'
import { ProjectService } from '@/services/projects'

import LoadingSpinner from '@/common/components/LoadingSpinner'

type UpdateModalProps = {
    project: Project
    setUpdateProject: Dispatch<SetStateAction<Project | undefined>>
}

export default function UpdateModal({ project, setUpdateProject }: UpdateModalProps) {

    const [loading, setLoading] = useState<boolean>(false)
    const { register, getValues } = useForm<PatchProject>({
        defaultValues: { name: project.name, description: project.description },
    });
    const { setNotification } = useNotificationContext();

    const cancelButtonRef = useRef(null)

    const updateProject = async () => {
        const data = getValues()
        const [res, err] = await ProjectService.patch(project._id, data);

        if (err) {
            console.log(err.message)
            setNotification({ title: err.name, message: err.message, isError: true })
            setLoading(false)
            return
        }

        if (res) {
            setNotification({ title: 'Success', message: 'Project updated successfully', isError: false })
            setLoading(false)
            setUpdateProject(undefined)
        }
    }

    return (
        <Transition.Root show={!!project} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={() => setUpdateProject(undefined)}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">

                            <div className="mt-3 text-center sm:mt-5">
                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                    Edit Project
                                </Dialog.Title>
                            </div>
                            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                        Name
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <div className="max-w-lg flex rounded-md shadow-sm">

                                            <input
                                                {...register("name", {
                                                    required: false,
                                                })}
                                                type="text"
                                                autoComplete="username"
                                                className="flex-1 block w-full focus:ring-blue-500 focus:border-blue-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                        Description
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <textarea
                                            {...register("description", {
                                                required: false,
                                            })}
                                            rows={3}
                                            className="max-w-lg shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none  sm:col-start-2 sm:text-sm"
                                    onClick={() => {
                                        if (!loading) {
                                            setLoading(true)
                                            updateProject()
                                        }
                                    }}
                                >
                                    {loading ? <LoadingSpinner /> : 'Save'}
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:col-start-1 sm:text-sm"
                                    onClick={() => setUpdateProject(undefined)}
                                    ref={cancelButtonRef}
                                >
                                    Cancel
                                </button>
                            </div>

                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
