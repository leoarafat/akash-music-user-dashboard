import { useUpdateScheduleMutation } from '@/redux/apiSlices/scheduleApi';
import { useSendScheduleMutation } from '@/redux/apiSlices/userListApi';
import { Button, DatePicker, Form, Input, Modal, TimePicker } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react'
import Swal from 'sweetalert2';


interface IScheduleProps{
    open: boolean;
    setOpen: (value: boolean) => void;
    value?: any;
    title: string;
    selectedUser?: string[];
    refetch: ()=> void;
}

const ScheduleModal:React.FC<IScheduleProps> = ({open, setOpen, title,refetch, selectedUser, value}) => {
    const [form] = Form.useForm();
    const [ sendSchedule, {isLoading} ] = useSendScheduleMutation();
    const [ updateSchedule] = useUpdateScheduleMutation();

    const hideModal = () => {
        setOpen(false);
        form.resetFields()
    };

    const onSchedule = async(values: any) => {
        const data = {
          ...values,
          users: selectedUser
        }
    
        if(value?._id){
            await updateSchedule({id: value?._id, value: values }).then((response)=>{
                if(response?.data?.statusCode === 200){
                Swal.fire({
                    title: "Updated",
                    text: "Schedule has been Updated",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(()=>{
                    hideModal()
                    refetch()
                })
                }
            })
        }else{
            await sendSchedule(data).then((response)=>{
                if(response?.data?.statusCode === 200){
                Swal.fire({
                    title: "Sended",
                    text: "Schedule is sended For Those User",
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


    useEffect(()=>{
        if(value?._id){
            form.setFieldsValue(value)
        }
    }, [form, value])


    return (
        <Modal
            title={<p className="text-[#F4F5F7] font-semibold text-xl mt-[4px]">{title}</p>}
            centered
            open={open}
            onOk={hideModal}
            onCancel={hideModal}
            footer={false}
        >
            <Form onFinish={onSchedule} form={form} layout="vertical" className="schedule mt-4">
                <Form.Item
                    name="date"
                    style={{width: "100%"}}
                    label={<p className="text-[#F4F5F7] poppins text-[16px] leading-[27px] font-normal "> Date</p>}
                    rules={[
                        {
                        required: true,
                        message: "Please Select Future Date"
                        }
                    ]}
                    getValueFromEvent={(value: dayjs.Dayjs) => { return value ? value.format("YYYY-MM-DD") : ""}}
                    getValueProps={(value: dayjs.Dayjs) => {return { date: value }}}
                    
                    >
                    <DatePicker  style={{
                        background: "transparent",
                        border: "1px solid #C3C4C6"
                    }} className="h-12 w-full placeholder:text-gray-500 text-white" />
                </Form.Item>

                <Form.Item
                    name="time"
                    style={{width: "100%"}}
                    label={<p className="text-[#F4F5F7] poppins text-[16px] leading-[27px] font-normal "> Time</p>}
                    rules={[
                        {
                        required: true,
                        message: "Please Choose Your Pickup Time"
                        }
                    ]}
                    getValueFromEvent={(value: dayjs.Dayjs) => { return value ? value.format("h:mm A") : ""} }
                    getValueProps={(value: dayjs.Dayjs) => { return { time: value } }}
                >
                    <TimePicker  
                        format={"h:mm:ss A"}
                        style={{
                            background: "transparent",
                            border: "1px solid #C3C4C6"
                        }}
                    className="h-12 w-full bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 text-white"
                    />
                </Form.Item>

                <Form.Item
                name="meet_link" 
                label={<div className="text-[#F4F5F7]">Link</div>}
                rules={[
                    {
                    required: true,
                    message: "Please Enter Meet Link"
                    }
                ]}
                >
                <Input
                    style={{
                    background: "transparent",
                    border: "1px solid #C3C4C6"
                    }}
                    placeholder="Enter link"
                    className="h-12  placeholder:text-gray-500 text-white"
                />
                </Form.Item>
                <Form.Item 
                name="password" 
                label={<div className="text-[#F4F5F7]">Password</div>}
                rules={[
                    {
                    required: true,
                    message: "Please Enter Meet Link Password"
                    }
                ]}
                >
                <Input
                    style={{
                    background: "transparent",
                    border: "1px solid #C3C4C6"
                    }}
                    placeholder="Enter password"
                    className="h-12  placeholder:text-gray-500 text-white"
                />
                </Form.Item>

                <Form.Item className="flex items-center justify-center w-full">
                    <Button 
                        htmlType='submit'
                        style={{
                            width: 170,
                            background: "#00A2C1",
                            border: "none",
                            outline: "none",
                            boxShadow: "none",
                            height: 44,
                            color: "white"
                        }}
                    >
                        {isLoading ? "Sending..." : "Send Schedule"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ScheduleModal