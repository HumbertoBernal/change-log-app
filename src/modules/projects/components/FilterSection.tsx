import { UseFormReturn } from "react-hook-form";
import { FilterProject } from "../types";


type FilterSectionProps = {
    useFilterForm: UseFormReturn<FilterProject, any>,
    handleSearchFilter: () => void
}

const FilterSection = ({ useFilterForm, handleSearchFilter }: FilterSectionProps) => {
    const { register, reset } = useFilterForm;

    const handleClearFilters = () => {
        reset({ 
            creator: "",
            name: "",
            created_at: ""
        });
    }

    return <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-3 px-4 sm:flex sm:items-center sm:px-6 lg:px-8">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Filters
                <span className="sr-only">, active</span>
            </h3>

            <div aria-hidden="true" className="hidden w-px h-5 bg-gray-300 sm:block sm:ml-4" />

            <div className="mt-2 sm:mt-0 sm:ml-4">
                <div className="-m-1 flex flex-wrap items-center space-x-0 md:space-x-2">
                    <div className="sm:flex sm:items-center">
                        <label htmlFor="searchCreator" className="text-sm font-medium text-gray-700">Project Name</label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2 ml-4">
                            <div className="max-w-lg flex rounded-md shadow-sm">

                                <input
                                    {...register("name", {
                                        required: false,
                                    })}
                                    type="text"
                                    autoComplete="off"
                                    className="flex-1 block w-full focus:ring-blue-500 focus:border-blue-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="sm:flex sm:items-center">
                        <label htmlFor="searchCreator" className="text-sm font-medium text-gray-700">Created by </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2 ml-4">
                            <div className="max-w-lg flex rounded-md shadow-sm">

                                <input
                                    {...register("creator", {
                                        required: false,
                                    })}
                                    type="text"
                                    autoComplete="off"
                                    className="flex-1 block w-full focus:ring-blue-500 focus:border-blue-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="sm:flex sm:items-center">
                        <label htmlFor="searchCreator" className="text-sm font-medium text-gray-700">Created after</label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2 ml-4">
                            <div className="max-w-lg flex rounded-md shadow-sm">
                                <input
                                    {...register("created_at", {
                                        required: false,
                                    })}
                                    type="date"
                                    autoComplete="off"
                                    className="flex-1 block w-full focus:ring-blue-500 focus:border-blue-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="sm:flex sm:items-center md:mt-0">
                        <button
                            onClick={handleClearFilters}
                            type="button"
                            className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md  bg-white  sm:order-1 sm:ml-3"
                        >
                            Clear
                        </button>
                        <button
                            onClick={handleSearchFilter}
                            type="button"
                            className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-600  sm:order-1 sm:ml-3"
                        >
                            Search
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>


}

export default FilterSection;