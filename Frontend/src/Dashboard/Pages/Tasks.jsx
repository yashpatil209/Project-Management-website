import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AddTask from "../Components/TaskPage/AddTask";
import TaskTable from "../Components/TaskPage/TaskTable";
import Filter from "../Components/Common/Filter";
import { getData } from "@/Api/api";

const Tasks = () => {
  const [isTodoOpen, setIsTodoOpen] = useState(true);
  const [isDone, setIsDone] = useState(true);
  const [todoProjects, setTodoProjects] = useState([]);
  const [doneProjects, setDoneProjects] = useState([]);
  const { token } = useSelector((state) => state.user);
  const { projectId } = useParams();

  useEffect(() => {
    setTodoProjects([]);

    const fetchData = async (status) => {
      try {
        const response = await getData(
          `/task/getalltasks?projectId=${projectId}&status=${status}`,
          token
        );

        console.log(response);



        if (response) {
          if (status === "Done") {
            setDoneProjects(response);
          } else {
            setTodoProjects((prev) => [...prev, ...response]);
          }
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData("Done");
    fetchData("Not-Started");
    fetchData("In-Progress");
  }, [projectId, token]); // ✅ Runs when projectId or token changes

  return (
    <div className="w-full">
      <div className="flex mt-4 justify-between">
        <div className="text-xl font-bold">Tasks</div>
        <div className="flex gap-4">
          <Filter />
          <AddTask />
        </div>
      </div>
      <div className="mt-5">
        <div>
          <button
            onClick={() => setIsTodoOpen(!isTodoOpen)}
            className="text-blue-500 text-xl font-bold"
          >
            <span className="mr-2">
              {isTodoOpen ? (
                <i className="bx bx-chevron-down"></i>
              ) : (
                <i className="bx bx-chevron-right"></i>
              )}
            </span>
            To-Do
          </button>
          <div className={`mt-4 ${!isTodoOpen && "hidden"}`}>
            <TaskTable data={todoProjects} />
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={() => setIsDone(!isDone)}
            className="text-green-600 text-xl font-bold"
          >
            <span className="mr-2">
              {isDone ? (
                <i className="bx bx-chevron-down"></i>
              ) : (
                <i className="bx bx-chevron-right"></i>
              )}
            </span>
            Done
          </button>
          <div className={`mt-4 ${!isDone && "hidden"}`}>
            <TaskTable data={doneProjects} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
