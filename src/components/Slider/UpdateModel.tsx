import { Input, Modal } from "antd";
import { Image } from "lucide-react";
import { useState } from "react";
import Button from "../share/Button";

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
}

const UpdateModel: React.FC<OfferModelProps> = ({ open, setOpen, data }) => {
  const [imageUrl, setImageUrl] = useState();
  const [image, setImage] = useState();
  const [title, setTitle] = useState(data.title);


  const handleCancel = () => {
    setOpen(false);
  };

  const handleImage = async (e: any) => {
    const file = e.target.files?.[0];
    setImage(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  //   useEffect(() => {
  //     if (isSuccess) {
  //       if (data) {
  //         Swal.fire({
  //           title: "Created successfully",
  //           text: "New banner add to list",
  //           icon: "success",
  //           timer: 1500,
  //         });
  //         setOpen(false);
  //       }
  //     }
  //   }, [data, isSuccess, setOpen]);

  //   useEffect(() => {
  //     if (isError) {
  //       Swal.fire({
  //         title: "Failed to update privacy policy",
  //         text: error?.data?.message,
  //         icon: "error",
  //       });
  //     }
  //   }, [error?.data?.message, isError]);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    //await postSlider(formData);

    setTitle("");
    setImage("");
  };

  return (
    <div>
      <Modal open={open} onCancel={handleCancel} footer={false}>
        <h2 className="text-md mb-2">Title</h2>
        <Input
          placeholder="title"
          className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 text-white mb-5"
          onBlur={(e) => setTitle(e.target.value)}
        />
        <div>
          <h2 className="text-md mb-2">Slider Image</h2>
          <input
            type="file"
            className=" hidden"
            id="image"
            onChange={handleImage}
          />
          <label
            htmlFor="image"
            className="w-full border rounded flex justify-center items-center h-36 cursor-pointer"
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                className="w-full h-full object-cover rounded"
                alt=""
              />
            ) : (
              <Image size={30} />
            )}
          </label>
        </div>
        <Button className="px-10 mx-auto mt-5" onClick={handleSave}>
          Save
        </Button>
      </Modal>
    </div>
  );
};

export default UpdateModel;
