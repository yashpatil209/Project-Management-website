import React, { useCallback, useState, useEffect } from "react";
import {
  Button,
  Label,
  TextInput,
  Modal,
  Textarea,
  Select,
} from "flowbite-react";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getData, postData } from "@/Api/api";

export default function AddTask() {
  const [openModal, setOpenModal] = useState(false);
  const [taskDetail, setTaskDetail] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.user);
  const userId = useSelector((state) => state.user.currentUser.userId);
  const [emails, setEmails] = useState([]);
  const { projectId } = useParams();

  const handleMemberChange = (newMember) => {
    setTeamMembers(newMember.map((item) => item.value));
  };

  const handleChange = (e) => {
    setTaskDetail({
      ...taskDetail,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const Data = {
      ...taskDetail,
      teamMembers,
    };

    console.log(Data);
    try {
      const response = await postData(
        `/task/add_newtask/${projectId}`,
        Data,
        token
      );
      toast.success("successfully Add Task!");
    } catch (e) {
      toast.error("Something went wrong.");
    }

    setOpenModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getData(`/allprojectmembers/${projectId}`, token);
      setEmails(response);
    };

    fetchData();
  }, []);

  const allEmails = emails.map((email) => {
    return {
      value: email,
      label: email,
    };
  });

  return (
    <>
      <Button
        color="#6962ed"
        className="bg-[#6962ed] text-white text-center"
        onClick={() => setOpenModal(true)}
      >
        New Task
      </Button>
      <Modal className="" show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className="h-1  border-b-0">
          {/* <span>Add New Task</span> */}
        </Modal.Header>
        <Modal.Body className="pt-0">
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-md flex-col gap-2"
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="" value="Task Name" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="Enter Task name"
                required
                color="#fff"
                className=""
                onChange={handleChange}
              />
            </div>
            <div className="">
              <div className="mb-2 block">
                <Label htmlFor="" value="Task Description" />
              </div>
              <Textarea
                id="description"
                className="p-2"
                placeholder="Enter Task description"
                required
                rows={3}
                color="#fff"
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="" value="Start Date" />
              </div>
              <TextInput
                id="startDate"
                type="date"
                required
                color="#fff"
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="" value="End Date" />
              </div>
              <TextInput
                id="endDate"
                type="date"
                required
                color="#fff"
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="" value="Assign Task" />
              </div>
              <CreatableSelect
                id="members"
                isMulti
                onChange={handleMemberChange}
                options={allEmails}
                placeholder="Assign Task"
                classNamePrefix="tag-select"
              />
            </div>
            <div className="">
              <div className="mb-2 block">
                <Label htmlFor="Priority" value="Priority" />
              </div>
              <Select
                id="priority"
                color="#fff"
                onChange={handleChange}
                required
              >
                <option value="" disabled selected>
                  Select Priority
                </option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Select>
            </div>
            <Button className="mt-2" type="submit">
              Submit
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
