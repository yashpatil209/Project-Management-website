import {
  Button,
  Drawer,
  Label,
  Textarea,
  TextInput,
  Card,
  FileInput,
} from "flowbite-react";
import { useState, useEffect } from "react";
import "./Issue.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Paperclip, Calendar, FileText, Trash2 } from "lucide-react";
import FilePreview from "../Common/FileViewer";
import FileViewer from "../Common/FileViewer";
import { getData, postData, postDataWithFile,deleteData } from "@/Api/api";
import TruncatedText from "../Common/TruncatedText";

export default function Submission({ Id }) {
  const options = ["All Submissions", "Submit Work"];
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const [selected, setSelected] = useState("All Submissions");
  const { token } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({});
  const [submission, setSubmission] = useState([]);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (file) {
      data.append("file", file);
    }

    try {
      await postDataWithFile(`/submissions/${Id}`, token, data);
      toast.success("Successfully Submitted!");
    } catch (e) {
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getData(`/submissions/task/${Id}`, token);
      setSubmission(response);
    };
    fetchData();
  }, []);

  const handleDelete = async (Id) => {
    try {
      await deleteData(`/submissions/${Id}`, token);
    } catch {
      console.log();
    }
  };

  return (
    <>
      <div className="">
        <button
          color="light"
          onClick={() => setIsOpen(true)}
          className="bg-transparent border-none flex justify-start items-center"
        >
          <span className="">
            <FileText className="w-3 mr-2" />
          </span>
          {submission.length}
        </button>
      </div>
      <Drawer
        open={isOpen}
        onClose={handleClose}
        position="right"
        className="w-[30rem] z-50"
      >
        <Drawer.Header
          title={
            <div className="bg-white border-2 border-gray-150 w-fit p-1 rounded-lg flex">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelected(option)}
                  className={`px-4 py-1 rounded-md text-gray-600 font-medium transition ${
                    selected === option
                      ? "bg-gray-100 text-teal-600 shadow-sm"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          }
          titleIcon={() => <></>}
        />

        {selected === "All Submissions" && (
          <>
            {submission && submission.length > 0 ? (
              submission.map((i) => (
                <Card
                  className="max-w-md shadow-none mb-3 rounded-xl  bg-white border border-gray-200"
                  key={i.id}
                >
                  <div className="flex justify-between items-center">
                    <h5 className="text-xl font-semibold text-gray-900">
                      {i.title}
                    </h5>
                  </div>
                  <span className="text-sm text-gray-500 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />{" "}
                    {i?.uploadedAt.split("T")[0]}
                  </span>
                  <div>
                    <TruncatedText text={i.description} />
                  </div>
                  <div className="flex justify-between">
                    <FileViewer fileData={i} />
                    <button onClick={() => handleDelete(i.id)}>
                      <Trash2 className="w-4 h-4 mr-1 text-red-400" />
                    </button>
                  </div>
                </Card>
              ))
            ) : (
              <p>No submissions available</p>
            )}
          </>
        )}

        {selected === "Submit Work" && (
          <Drawer.Items>
            <form onSubmit={handleSubmit}>
              <div className="mb-6 mt-3">
                <Label htmlFor="title" className="mb-2 block">
                  Title
                </Label>
                <TextInput
                  onChange={handleChange}
                  id="title"
                  name="title"
                  placeholder="title"
                  required
                />
              </div>
              <div className="mb-6">
                <Label htmlFor="description" className="mb-2 block">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Write description..."
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>

              <div className="mb-4">
                <div className="mb-2 block">
                  <Label htmlFor="file">Add Attachment</Label>
                </div>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  required
                />
              </div>

              <Button className="w-full" type="submit">
                Upload
              </Button>
            </form>
          </Drawer.Items>
        )}
      </Drawer>
    </>
  );
}
