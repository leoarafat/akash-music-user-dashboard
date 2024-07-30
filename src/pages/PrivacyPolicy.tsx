import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import {
  useGetPrivacyPolicyQuery,
  usePostPrivacyPolicyMutation,
} from "@/redux/apiSlices/settingApi";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { data, isLoading } = useGetPrivacyPolicyQuery(undefined);
  const [
    postPrivacyPolicy,
    { isSuccess, isError, error: postError, data: postData },
  ] = usePostPrivacyPolicyMutation();

  useEffect(() => {
    setContent(data?.data?.description);
  }, [data?.data?.description]);

  useEffect(() => {
    if (isSuccess) {
      if (postData) {
        Swal.fire({
          title: "Privacy policy",
          text: "Updated successfully",
          icon: "success",
          timer: 1500,
        });
      }
    }
  }, [isSuccess, postData]);

  useEffect(() => {
    if (isError) {
      Swal.fire({
        title: "Failed to update privacy policy",
        text: postError?.data?.message,
        icon: "error",
      });
    }
  }, [isError, postError?.data?.message]);

  const handleSubmit = async () => {
    await postPrivacyPolicy({ description: content });
  };
  return (
    <div className="container">
      <Title className="mb-4 text-white">Privacy Policy</Title>
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

export default PrivacyPolicy;
