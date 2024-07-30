import { useCreateFaqMutation, useUpdateFaqMutation } from "@/redux/apiSlices/faqApi";
import { Button, Form, Input, Modal } from "antd";
import { useEffect } from "react";
import Swal from "sweetalert2";

interface IArticleProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    value?: any;
    refetch?: (()=> void) | undefined;
    setValue?: React.Dispatch<React.SetStateAction<null>>;
    title: string,
  }



const FaqModal: React.FC<IArticleProps> = ({open, setOpen, setValue, refetch, title, value}) => {
    const [ createFaq] = useCreateFaqMutation()
    const [ updateFaq] = useUpdateFaqMutation()
    const [form] = Form.useForm();
    form.setFieldsValue(undefined);


    const handleFaq = async(values: any) => {
        const data = {
            question : values?.question,
            answer: values?.answer
        }
    
        if(value?._id){
          await updateFaq({id:value?._id, value: data}).then((response)=>{
            if(response?.data?.statusCode === 200){
              Swal.fire({
                title: "Created!",
                text: "FAQ has been Created",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              }).then(()=>{
                hideModal()
                refetch();
              })
            }
          })
        }else{
        await createFaq(data).then((response)=>{
          if(response?.data?.statusCode === 200){
            Swal.fire({
              title: "Created!",
              text: "FAQ has been Created",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            }).then(()=>{
              hideModal()
            })
          }
        })
        }
    };

    const hideModal = () => {
        setOpen(false);
        form.resetFields()
    }

    useEffect(()=>{
        if(value){
          form.setFieldsValue(value)
        }
      }, [form , value])
    return(
        <Modal
            centered 
            title={<p className="text-xl text-white mt-1">{value?._id ? "Edit Faq" : "Create Faq"}</p>} 
            open={open}
            onOk={hideModal} 
            onCancel={hideModal} 
            footer={false}
        >
            <Form form={form} onFinish={handleFaq} layout="vertical">
                <Form.Item name={"question"} label={<div className="text-white">Question</div>}>
                <Input
                    placeholder="Enter question here"
                    className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 text-white"
                />
                </Form.Item>
                <Form.Item name={"answer"} label={<div className="text-white">Answer</div>}>
                <Input.TextArea
                    placeholder="Enter answer here"
                    rows={10}
                    className=" bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 text-white"
                />
                </Form.Item>

                <Form.Item className="col-span-12  flex items-center justify-center w-full">
                        <Button 
                            htmlType='submit'
                            style={{
                                width: 170,
                                background: "#00A2C1",
                                border: "none",
                                outline: "none",
                                boxShadow: "none",
                                height: 44,
                                color: "white",
                                marginTop: 24
                            }}
                        >
                            {"Save"} 
                        </Button>
            </Form.Item>
            </Form>
        </Modal>
    )
}

export default FaqModal;