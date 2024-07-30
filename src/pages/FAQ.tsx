import FaqModal from "@/components/FaqModal";
import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import { useDeleteFaqMutation, useGetFaqsQuery } from "@/redux/apiSlices/faqApi";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";

const FAQPage = () => {
  const [openModel, setOpenModel] = useState(false);
  const {data: faqs, refetch} = useGetFaqsQuery(undefined)
  const [deleteFaq] = useDeleteFaqMutation(undefined)
  const [value, setValue] = useState(null)

  const handleOpen = (values:any) => {
    setOpenModel(true);
    setValue(values)
  };
  const handleDelete=async(id: string)=>{
    // await deleteAdmin(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#333434",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText : "No"
    }).then(async(result) => {
      if (result.isConfirmed) {
        await deleteFaq(id).then((response)=>{
          if(response?.data?.statusCode === 200){
            Swal.fire({
              title: "Deleted!",
              text: "Faq has been deleted.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            }).then(()=>{
              refetch()
            })
          }
        })
        
      }
    });
  }
  return (
    <div>
      <div className="flex justify-between items-center px-4 pt-4 mb-5">
      <Title className="text-white mb-6">FAQ</Title>
        <Button onClick={()=>handleOpen({})}>
          <Plus />
        </Button>
      </div>
      {faqs?.data?.map((ques:any, index:number) => (
        <div className="bg-base mb-2 p-2 rounded" key={index}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-white">
              {index + 1}.{ques?.question}
            </h2>
            <div className="flex items-center gap-2 justify-end">
              <button className="text-white">
                <Edit onClick={()=>handleOpen(ques)} size={20} />
              </button>
              <button onClick={()=>handleDelete(ques?._id)} className="text-red-500">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
          <p className="mt-2 text-lg bg-gray-500 rounded p-2">{ques?.answer}</p>
        </div>
      ))}
      <FaqModal
        title={value?._id ? "Edit FAQ" : "Create FAQ"}
        open={openModel}
        refetch={refetch}
        setOpen={setOpenModel}
        value={value}
      />
    </div>
  );
};

export default FAQPage;
