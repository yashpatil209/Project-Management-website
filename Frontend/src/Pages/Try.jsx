import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Circle, Clock3, CircleCheckBig } from "lucide-react";
import TaskCard from "../Dashboard/Components/TaskPage/TaskCard";

// Initial task data with unique `id` values
const tasks = {
  listA: [
    {
      id: "task-1",
      task: "Design System Update",
      description:
        "Modernize our design system components and ensure consistency across all platforms. Focus on accessibility and responsive design patterns.",
      dueDate: "2024-03-25",
      priority: "High",
      submission: "Pending",
      issue: "UI Inconsistency",
      assigned: "Sarah Chen",
    },
  ],
  listB: [
    {
      id: "task-2",
      task: "Backend Integration",
      description:
        "Implement RESTful API endpoints and establish secure database connections. Optimize query performance and add caching layer.",
      dueDate: "2024-03-20",
      priority: "Medium",
      submission: "Submitted",
      issue: "None",
      assigned: "John Smith",
    },
  ],
  listC: [
    {
      id: "task-3",
      task: "Bug Fixes",
      description:
        "Address critical user-reported issues in the authentication flow and resolve payment processing delays. High priority fixes needed.",
      dueDate: "2024-03-22",
      priority: "Critical",
      submission: "Not Started",
      issue: "Dependencies",
      assigned: "Mike Johnson",
    },
  ],
};

const DragAndDrop = () => {
  const [data, setData] = useState(tasks);

  const title = [
    {
      icon: Circle,
      heading: "To-Do",
      color: "text-gray-400",
      key: "listA",
    },
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

  // Function to handle drag end event
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return; // Exit if dropped outside a list

    const sourceList = source.droppableId;
    const destList = destination.droppableId;
    
    // If dropped in the same place, do nothing
    if (sourceList === destList && source.index === destination.index) return;

    // Copy source and destination lists
    const sourceItems = Array.from(data[sourceList]);
    const destItems = sourceList === destList ? sourceItems : Array.from(data[destList]);

    // Remove the dragged item from the source list
    const [movedItem] = sourceItems.splice(source.index, 1);

    // Insert the dragged item into the new position
    destItems.splice(destination.index, 0, movedItem);

    // Update state with new data
    setData((prev) => ({
      ...prev,
      [sourceList]: sourceItems,
      [destList]: destItems,
    }));

    console.log(`${movedItem.task} moved to ${destList}`);
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
                {data[column.key]?.length || 0}
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
                  {data[column.key]?.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
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
};

export default DragAndDrop;
