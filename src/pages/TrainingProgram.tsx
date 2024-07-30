/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import TrainingProgramModel from "@/components/TrainingProgram/TrainingProgramModel";
import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import { Edit, Plus } from "lucide-react";
import { useState } from "react";
import { useGetProgramQuery } from "@/redux/apiSlices/programApi";
import { imageUrl } from "@/redux/api/apiSlice";


const TrainingProgram = () => {
  const { data: programs, refetch } = useGetProgramQuery(undefined)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const showModal = (values:any) => {
    setOpen(true);
    if(values?.id){
      setValue(values)
    }
  };
  return (
    <div className="px-4">
      <div className="flex justify-between items-center mb-10 mt-4">
        <Title className="text-white">All Training Program</Title>
        <Button onClick={()=>showModal(true)} icon={<Plus size={20} />}>
          Add Program
        </Button>
      </div>
      <div className="grid grid-cols-6 gap-5">
        {programs?.data?.map((program:any, index:number) => (
          <div className="relative" key={index}>
            <figure className="bg-primary rounded-t-xl rounded-br-xl">
              <img
                style={{width : "100%", height: 150, objectFit: "cover"}}
                src={`${imageUrl}${program?.image}`}
                className="w-full  rounded-t-xl rounded-br-xl"
                alt=""
              />
              <figcaption className="text-gray-400 text-xl p-1">
                {program?.title}
              </figcaption>
            </figure>
            <button
              onClick={()=>showModal(program)}
              className="text-white absolute top-2 right-2"
            >
              <Edit />
            </button>
          </div>
        ))}
      </div>
      <TrainingProgramModel refetch={refetch} value={value} setValue={setValue} open={open} setOpen={setOpen} />
    </div>
  );
};

export default TrainingProgram;
