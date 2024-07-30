import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import {
  useGetAboutQuery,
  usePostAboutMutation,
} from "@/redux/apiSlices/settingApi";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const About = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const { data, isLoading } = useGetAboutQuery(undefined);
  const [postAbout, { isSuccess, isError, error: postError, data: postData }] =
    usePostAboutMutation();

  useEffect(() => {
    setContent(data?.data?.description);
  }, [data?.data?.description]);

  useEffect(() => {
    if (isSuccess) {
      if (postData) {
        Swal.fire({
          title: "About us",
          text: "About us updated successfully",
          icon: "success",
          timer: 1500,
        });
      }
    }
  }, [isSuccess, postData]);

  useEffect(() => {
    if (isError) {
      Swal.fire({
        title: "Failed to update about us",
        text: postError?.data?.message,
        icon: "error",
      });
    }
  }, [isError, postError?.data?.message]);

  const handleSubmit = async () => {
    await postAbout({ description: content });
  };

  return (
    <div className="container">
      <Title className="text-white mb-4">About</Title>
      <JoditEditor
        ref={editor}
        value={content}
        config={{ height: 600 }}
        onBlur={(newContent) => setContent(newContent)}
      />
      <div className="flex justify-end mt-5" onClick={handleSubmit}>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default About;
