import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import {
  useGetTermsAndConditionsQuery,
  usePostTermsAndConditionsMutation,
} from "@/redux/apiSlices/settingApi";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const TermsAndCondition = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const { data, isLoading } = useGetTermsAndConditionsQuery(undefined);
  const [
    postTermsAndConditions,
    { isSuccess, isError, error: postError, data: postData },
  ] = usePostTermsAndConditionsMutation();

  useEffect(() => {
    setContent(data?.data?.description);
  }, [data?.data?.description]);

  useEffect(() => {
    if (isSuccess) {
      if (postData) {
        Swal.fire({
          title: "Terms and conditions",
          text: "Terms and conditions updated successfully",
          icon: "success",
          timer: 1500,
        });
      }
    }
  }, [isSuccess, postData]);

  useEffect(() => {
    if (isError) {
      Swal.fire({
        title: "Failed to update terms and conditions",
        text: postError?.data?.message,
        icon: "error",
      });
    }
  }, [isError, postError?.data?.message]);

  const handleSubmit = async () => {
    await postTermsAndConditions({ description: content });
  };

  return (
    <div className="container">
      <Title className="mb-4 text-white">Terms and condition</Title>
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

export default TermsAndCondition;
