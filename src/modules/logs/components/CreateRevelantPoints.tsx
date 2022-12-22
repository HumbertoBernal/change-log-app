import { Control, useFieldArray, useForm, UseFormRegister } from "react-hook-form"
import { CreateLog, RelevantPoint } from "../types"


type CreateRelevantPointsProps = {
    setValue: (value: RelevantPoint[]) => void,
    register: UseFormRegister<CreateLog>,
    control: Control<CreateLog>,

}

const CreateRelevantPoints = ({ setValue, control, register }: CreateRelevantPointsProps) => {
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "relevant_points", // unique name for your Field Array
    });
    console.log(fields)

    return (
        <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xs py-2 px-4 rounded "
                onClick={() => { append({ name: '', descriptors: [''] }) }}>
                Add Relevant Point
            </button>
            {fields.map((field, index) => {

                return <div key={field.id} className="">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Name #{index + 1}
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="max-w-lg flex rounded-md shadow-sm">

                                <input
                                    {...register(`relevant_points.${index}.name`)}
                                    type="text"
                                    className="flex-1 block w-full focus:ring-blue-500 focus:border-blue-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Descriptors:
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="max-w-lg flex rounded-md shadow-sm">

                                {field.descriptors.map((name, index) => <input key={name}
                                    {...register(`relevant_points.${index}.descriptors.${index}`)}
                                    type="text"
                                    className="flex-1 block w-full focus:ring-blue-500 focus:border-blue-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                />)}
                            </div>
                        </div>
                    </div>
                    <div className="my-2">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold text-xs py-2 px-4 rounded "
                            onClick={() => { remove(index) }}>
                            Remove
                        </button>
                    </div>
                </div>
            })
            }</div>
    );
}

export default CreateRelevantPoints

