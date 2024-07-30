import { Button, Form, Input, Modal, Progress, Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { RiImageAddLine } from "react-icons/ri";
import { BsCameraVideo } from "react-icons/bs";
import { useGetProgramQuery } from '@/redux/apiSlices/programApi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useCreateArticleMutation, useUpdateArticleMutation } from '@/redux/apiSlices/articleApi';
import Swal from 'sweetalert2';


interface IArticleProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    value: any;
    refetch: ()=> void;
    setValue: React.Dispatch<React.SetStateAction<null>>;
  }



const ArticleModal: React.FC<IArticleProps> = ({open, setOpen, setValue, refetch, value}) => {
    const { data: programs } = useGetProgramQuery(undefined);
    const [image, setImage] = useState<File | null>(null);
    const [video, setVideo] = useState<File | null>(null);
    const [ createArticle, { isLoading } ] = useCreateArticleMutation(undefined)
    const [ updateArticle, { isLoading: isUpdateLoading } ] = useUpdateArticleMutation()

    const [form] = Form.useForm();


    form.setFieldsValue(undefined);
    const hideModal = () => {
        setOpen(false);
        form.resetFields()
        setImage(null)
        setVideo(null)
        setValue(null)
    };

    useEffect(()=>{
        if(value?._id){
            form.setFieldsValue(value)
            form.setFieldsValue({training_program: value?.training_program?._id})
        }
    }, [value, form])

    const handleSubmit=async (values: any)=>{
        
        const formData = new FormData();
        if(image){
            formData.append("thumbnail", image);
        }
        if(video){
            formData.append("video", video);
        }
        Object.keys(values).forEach((key)=>{

            formData.append(key, values[key])
        })

        if(value?._id){
            await updateArticle( {id: value?._id, value : formData }).then((response:any)=>{
                if(response?.data?.statusCode === 200){
                    Swal.fire({
                        title: "Updated!",
                        text: "Article has been Updated",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                      }).then(()=>{
                        refetch()
                        setOpen(false);
                        form.resetFields()
                        setImage(null)
                        setVideo(null)
                        setValue(null)
                      })
                }else{
                    Swal.fire({
                        title: "Oops",
                        text: response?.data?.message,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 1500,
                    })
                }
            })
        }else{
            await createArticle(formData).then((response:any)=>{
                if(response?.data?.statusCode === 200){
                    Swal.fire({
                        title: "Created!",
                        text: "Article has been Created.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    }).then(()=>{
                        refetch()
                        setOpen(false);
                        form.resetFields()
                        setImage(null)
                        setVideo(null)
                        setValue(null)
                    })
                }else{
                    Swal.fire({
                        title: "Error",
                        text: response?.error?.data?.message,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        }
    }

    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleVideo = async (e:any) => {
        const file = e.target.files[0];
        if (file) {
            setLoading(true);
            setVideo(file);

            try {
                const chunkSize = 10 * 1024 * 1024;
                const totalChunks = Math.ceil(file.size / chunkSize);

                for (let i = 0; i < totalChunks; i++) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    setProgress(Math.round(((i + 1) / totalChunks) * 100));
                }
                setLoading(false);
            } catch (error) {
                console.error('Upload error:', error);
            } finally {
                setProgress(0)
                setLoading(false);
            }
        }
    };

    return (
        <Modal
            centered 
            title={<p className="text-xl text-white mt-1">{value?._id ? "Edit Article" : "Create An Article"}</p>} 
            open={open}
            onOk={hideModal} 
            onCancel={hideModal} 
            footer={false}
            width={750}
        >
            <Form 
                form={form} 
                onFinish={handleSubmit} 
                layout="vertical" 
                className="mt-6 grid grid-cols-12 gap-6"
            >
                <Form.Item 
                    className='col-span-6'
                    label={<p className='text-[#F4F5F7]'>Article Title</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Article Title"
                        }
                    ]}
                    name={"article_title"}
                    style={{marginBottom: 0}}
                >
                    <Input
                        style={{
                            background: "transparent",
                            border: "1px solid #C3C4C6",
                            outline: "none",
                            boxShadow: "none",

                        }}
                        placeholder="Enter Article Title"
                        className="h-12 placeholder:text-gray-500 text-white"
                    />
                </Form.Item>

                <Form.Item 
                    className='col-span-6 '
                    style={{marginBottom: 0}}
                    label={<p className='text-[#F4F5F7]'>Article Thumbnail</p>}
                    
                >
                    <Input
                        style={{
                            background: "transparent",
                            border: "1px solid #C3C4C6",
                            outline: "none",
                            boxShadow: "none",
                            display: "none"
                        }}
                        onChange={(e:any)=>setImage(e.target.files[0])}
                        id='image'
                        type='file'
                        placeholder="Enter package name"
                        className="h-12 placeholder:text-gray-500 text-white"
                    />
                    <div className='flex items-center px-[8px]' style={{ height: 48, border: "1px solid #C3C4C6", borderRadius: 8 }}>
                        <label className=' cursor-pointer border bg-[#C3C4C6] w-[170px] p-1 h-[34px] flex items-center gap-2 border-[#C3C4C6] rounded-md' htmlFor='image'>
                            {
                                image?.name
                                ?
                                <>
                                    {image?.name}
                                </>
                                :
                                <>
                                    <RiImageAddLine size={20} color='#555656' /> Upload Image
                                </>
                            }
                        </label>
                    </div>
                </Form.Item>

                <Form.Item 
                    className='col-span-6'
                    style={{marginBottom: 0}}
                    label={<p className='text-[#F4F5F7]'>Article Name</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter The Article Name"
                        }
                    ]}
                    name={"article_name"}
                >
                    <Input
                        style={{
                            background: "transparent",
                            border: "1px solid #C3C4C6",
                            outline: "none",
                            boxShadow: "none",

                        }}
                        placeholder="Enter Article Name"
                        className="h-12 placeholder:text-gray-500 text-white"
                    />
                </Form.Item>

                <Form.Item 
                    className='col-span-6 '
                    style={{marginBottom: 0}}
                    label={<p className='text-[#F4F5F7]'>Article Video</p>}
                >
                    <Input
                        style={{
                            background: "transparent",
                            border: "1px solid #C3C4C6",
                            outline: "none",
                            boxShadow: "none",
                            display: "none"
                        }}
                        onChange={(e)=>handleVideo(e)}
                        id='video'
                        type='file'
                        placeholder="Enter Article Video"
                        className="h-12 placeholder:text-gray-500 text-white"
                    />
                    <div className='flex items-center px-[8px]' style={{ height: 48, border: "1px solid #C3C4C6", borderRadius: 8 }}>
                        <label className='cursor-pointer border bg-[#C3C4C6] w-[170px] p-1 h-[34px] flex items-center gap-2 border-[#C3C4C6] rounded-md' htmlFor='video'>
                            {
                                video?.name
                                ?
                                <> {video?.name?.slice(0,8)}...{video?.name?.split(".")[1]} </>
                                :
                                <>
                                    <BsCameraVideo size={20} color='#555656' /> Upload Video
                                </>
                            }
                        </label>
                    </div>
                </Form.Item>

                <Form.Item 
                    className='col-span-12'
                    style={{marginBottom: 0}}
                    label={<p className='text-[#F4F5F7]'>Article Details</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Article Details"
                        }
                    ]}
                    name={"article_description"}
                >
                    <Input.TextArea
                        style={{
                            background: "transparent",
                            border: "1px solid #C3C4C6",
                            outline: "none",
                            boxShadow: "none",
                            resize:"none",
                            height: 200

                        }}
                        placeholder="Enter Article Name"
                        className="h-12 placeholder:text-gray-500 text-white"
                    />
                </Form.Item>

                <Form.Item 
                    className='col-span-6'
                    label={<p className='text-[#F4F5F7]'>Program Name</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Select Program Name"
                        }
                    ]}
                    style={{marginBottom: 0}}
                    name={"training_program"}
                >
                    <Select
                        placeholder="Select Program"
                        allowClear
                        className="h-12 placeholder:text-black"
                        style={{
                            background: "transparent", color: "white"
                        }}
                        suffixIcon={<MdKeyboardArrowDown color="white" size={24} />}
                        defaultValue={ value?.training_program && value?.training_program?.title}
                        disabled={value?.training_program?.title}
                    >
                        {
                            programs?.data?.map((program:any, index:number)=>{
                                return(
                                    <Select.Option key={index} value={program?._id}>{program?.title}</Select.Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>

                {
                    progress > 0 && <Progress className='col-span-12' strokeColor={"red"} percent={progress} size={["100%", 20]} />
                }

                <Form.Item className="col-span-12  flex items-center justify-center w-full">
                    <Button
                        disabled={loading || isLoading || isUpdateLoading}
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
                        { isLoading || isUpdateLoading ? "Uploading..." : "Save"} 
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ArticleModal