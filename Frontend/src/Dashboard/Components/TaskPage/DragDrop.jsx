import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Circle, Clock3, CircleCheckBig } from "lucide-react";
import TaskCard from "./TaskCard";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getData, putData } from "@/Api/api";

export default function DragAndDrop() {
  const [data, setData] = useState([]);
  const { token } = useSelector((state) => state.user);
  const userId = useSelector((state) => state.user.currentUser.userId);
  const { projectId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(
          `/task/byProject/${projectId}/user/${userId}`,
          token
        );
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const categorizeTasks = (tasks) => {
    return {
      listA: tasks.filter((task) => task.status === "Not-Started"),
      listB: tasks.filter((task) => task.status === "In-Progress"),
      listC: tasks.filter((task) => task.status === "Done"),
    };
  };

  const tasks = categorizeTasks(data);

  const title = [
    { icon: Circle, heading: "To-Do", color: "text-gray-400", key: "listA" },
    {
      icon: Clock3,
      heading: "In-Progress",
      color: "text-yellow-500",
      key: "listB",
    },
    {
      icon: CircleCheckBig,
      heading: "Done",
      color: "text-green-500",
      key: "listC",
    },
  ];

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const taskId = draggableId;
    const newStatus =
      destination.droppableId === "listA"
        ? "Not-Started"
        : destination.droppableId === "listB"
        ? "In-Progress"
        : "Done";

    // Update local state
    setData((prevData) =>
      prevData.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    // API call to update status
    try {
      await putData(`/task/changestatus/${taskId}/status/${newStatus}`, token);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="w-full mt-5 flex justify-between gap-4">
        {title.map((column) => (
          <div key={column.key} className="flex-1">
            {/* Column Header */}
            <div className="flex items-center gap-2 mb-4 bg-white rounded-lg shadow-lg p-4">
              <column.icon className={column.color} size={20} />
              <h2 className="font-semibold text-lg">{column.heading}</h2>
              <span className="ml-auto bg-gray-100 px-2 py-1 rounded-full text-sm">
                {tasks[column.key].length}
              </span>
            </div>

            {/* Droppable Area */}
            <Droppable droppableId={column.key}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="min-h-[200px]"
                >
                  {/* Task Items */}
                  {tasks[column.key].map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-4"
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
