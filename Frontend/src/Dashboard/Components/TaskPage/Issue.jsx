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
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Paperclip, Calendar, Check, Trash2 } from "lucide-react";
import { getData, postDataWithFile, putData, deleteData } from "@/Api/api";
import TruncatedText from "../Common/TruncatedText";
import FileViewer from "../Common/FileViewer";

export default function Issue({ Id }) {
  const options = ["All Issue", "Raise Issue"];
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("All Issue");
  const { token } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null); // File state
  const [issues, setIssues] = useState([]); // Changed `issue` to `issues`

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set selected file
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
      await postDataWithFile(`/issue/${Id}`, token, data);
      toast.success("Issue Created!");
      setIsOpen(false);
    } catch (e) {
      toast.error("Something went wrong.");
    }
  };

  const fetchData = async () => {
    try {
      const response = await getData(`/issue/${Id}`, token);
      setIssues(response);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, [Id, token]);

  const handleResolve = async (Id) => {
    try {
      await putData(`/issue/resolve/${Id}`, token);
      fetchData();
    } catch {
      console.log("error");
    }
  };

  const handleDelete = async (Id) => {
    try {
      await deleteData(`/issue/${Id}`, token);
    } catch {
      console.log();
    }
  };

  return (
    <>
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-transparent border-none flex items-center"
        >
          <div className="flex items-center gap-2 text-gray-600">
            <i className="bx bx-info-circle"></i>
            {issues.length} {/* Show issue count */}
          </div>
        </button>
      </div>
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        position="right"
        className="w-[30rem] z-50"
      >
        <Drawer.Header
          title={
            <div className="bg-white border w-fit p-1 rounded-lg flex">
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

        {selected === "All Issue" && (
          <>
            {issues.length > 0 ? (
              issues.map((i) => (
                <Card key={i.id} className="shadow-none mb-3 border">
                  <div className="">
                    <h5 className="text-xl font-semibold">{i.title}</h5>
                    <span className="text-sm mt-2 text-gray-500 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />{" "}
                      {new Date(i.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <TruncatedText text={i.description} />

                  <div className="flex justify-between">
                    {i.content && <FileViewer fileData={i} />}
                    {i.resolved ? (
                      <div className="flex items-center text-green-600">
                        <Check className="w-4 h-4 mr-2" /> Resolved
                      </div>
                    ) : (
                      <button
                        onClick={() => handleResolve(i.id)}
                        className="flex items-center text-blue-600 hover:text-blue-800 transition"
                      >
                        <Check className="w-4 h-4 mr-1" /> Mark as Resolved
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(i.id)}
                      className="flex items-center text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                    </button>
                  </div>
                </Card>
              ))
            ) : (
              <p>No issues found.</p>
            )}
          </>
        )}

        {selected === "Raise Issue" && (
          <Drawer.Items>
            <form onSubmit={handleSubmit}>
              <div className="mb-6 mt-3">
                <Label htmlFor="title">Title</Label>
                <TextInput onChange={handleChange} id="title" required />
              </div>
              <div className="mb-6">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>
              <div className="mb-4">
                <div className="mb-2 block">
                  <Label htmlFor="file">Add Attachment</Label>
                </div>
                <input type="file" id="file" onChange={handleFileChange} />
              </div>

              <Button className="w-full" type="submit">
                Raise Issue
              </Button>
            </form>
          </Drawer.Items>
        )}
      </Drawer>
    </>
  );
}
