import React, { useState } from "react";
import {
  Calendar,
  Flag,
  UserCircle2,
  FileCheck,
  AlertTriangle,
  MessageSquare,
  FileText,
  CircleAlert,
  CalendarClock,
} from "lucide-react";
import { Button, Modal } from "flowbite-react";
import Issue from "./Issue";

const TaskCard = ({ task }) => {
  const [openModal, setOpenModal] = useState(false);

  function getRemainingDays(targetDate) {
    const currentDate = new Date();
    const target = new Date(targetDate);
    const diffInMs = target - currentDate;
    const remainingDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    return remainingDays;
  }

  return (
    <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="font-bold text-xl text-gray-800 mb-2">{task.name}</h3>
          <button
            color="white"
            className="bg-white flex text-gray-700"
            onClick={() => setOpenModal(true)}
          >
            <div className="flex items-center gap-2 text-gray-600">
              <div className="p-1.5 rounded-lg bg-gray-50">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-sm">Description</span>
            </div>
          </button>
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Description</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">{task.description}</div>
            </Modal.Body>
          </Modal>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            {/* Due Date */}
            <div className="flex items-center gap-2 text-gray-600">
              <div className="p-1.5 rounded-lg bg-gray-50">
                <Calendar className="w-4 h-4" />
              </div>
              <span className="text-sm">{task.endDate}</span>
            </div>
          </div>

          <div className="space-y-3">
            {/* Submission Status */}
            <div className="flex items-center gap-2 text-gray-600">
              <div className="p-1.5 rounded-lg bg-gray-50">
                <CalendarClock className="w-4 h-4" />
              </div>
              <span className="text-sm">
                {getRemainingDays(task.endDate) >= 0
                  ? `${getRemainingDays(task.endDate)} days left`
                  : `Time Exceeded`}
              </span>{" "}
            </div>
          </div>
          <div className="space-y-3">
            {/* Submission Status */}
            <div className="flex items-center gap-2 text-gray-600">
              <div className="p-1.5 rounded-lg bg-gray-50">
                <MessageSquare className="w-4 h-4" />
              </div>
              <span className="text-sm">{1}</span>
            </div>
          </div>

          <div className="space-y-3">
            {/* Submission Status */}
            <div className="flex items-center gap-2 ml-2 text-gray-600">
              <Issue Id={task.id} />
            </div>
          </div>
        </div>
        <div>
          <span className="text-red-500 text-md mt-4 flex items-start justify-start font-normal gap-1">
            {task.priority == "High" && <i class="bx bx-chevrons-up"></i>}
            {task.priority == "Medium" && <i class="bx bx-chevron-up"></i>}
            {task.priority == "Low" && <i class="bx bx-chevron-down"></i>}
            {task.priority.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default TaskCard;
