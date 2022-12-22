import { TrashIcon, ClipboardIcon } from '@heroicons/react/solid'
import { Log } from "@/modules/logs/types";

type LogsSectionProps = {
    logs: Log[],
}

const LogsSection = ({ logs }: LogsSectionProps) => {

    return (
        <div className="m-10">
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {logs.map((log) => {
                    const date = new Date(log.created_at)
                    const dateFormatted = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`

                    return <li key={log._id} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                        <div className="w-full flex items-center justify-between p-6 space-x-6">
                            <div className="flex-1 truncate">
                                <p className="mt-1 text-gray-400 text-sm truncate">{dateFormatted}</p>
                                <p className="text-gray-900 text-base font-medium truncate">{log.name}</p>
                                <div className="flex items-center space-x-3 mt-4 mb-1">
                                    <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                                        {log.status}
                                    </span>
                                    {log.priority !== "None" && <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                                        {log.priority}
                                    </span>}
                                </div>

                                <ul className='list-disc text-sm ml-4'>
                                    {log.relevant_points.map((relevant_point) => {
                                        return <li className='space-y-2'>
                                            <span className='font-medium'>
                                                {relevant_point.name}</span>
                                            <ul className='list-circle ml-4 space-y-2'>

                                                {relevant_point.descriptors.map((descriptor) =>
                                                    <li>{descriptor}</li>)
                                                }
                                            </ul>

                                        </li>
                                    })}
                                </ul>



                            </div>
                        </div>
                        <div>
                            <div className="-mt-px flex divide-x divide-gray-200">
                                <div className="w-0 flex-1 flex">
                                    <button
                                        className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                                    >
                                        <ClipboardIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                        <span className="ml-3">Edit</span>
                                    </button>
                                </div>
                                <div className="-ml-px w-0 flex-1 flex">
                                    <button
                                        className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                                    >
                                        <TrashIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                        <span className="ml-3">Delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                })}
            </ul>

        </div>
    )
}

export default LogsSection;

