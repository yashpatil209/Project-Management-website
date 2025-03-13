import React, { useState, useEffect } from "react";
import { Card, Progress, Avatar } from "flowbite-react";
import { User, Users } from "lucide-react";
import { Link } from "react-router-dom";
import TeamMembers from "./Common/TeamMembers";

export default function ProjectCard({ projects }) {
  const BorderColor = (status) => {
    switch (status) {
      case "Not-Started":
        return "border-[#f28b38]";
      case "Done":
        return "border-[#1aaa6e]";
      case "In-progress":
        return "border-[#3384c2]";
      default:
        return "";
    }
  };

  return (
    <>
      {projects.map((project) => (
        <Card
          className={`max-w-sm w-full border-0 border-l-[4px] rounded-md  border-[#b5b5b5] cursor-pointer ${BorderColor(
            project.status
          )}`}
        >
          <Link to={`/dashboard/task/${project.projectId}`}>
            <div className="flex justify-between">
              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {project.name}
              </h5>
            </div>
            <span>Start Date : {project.startDate}</span>
            <div className="mt-2 flex gap-5">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{project.teamMembers.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <i class="bx bx-message-square-dots"></i>
                <span>10</span>
              </div>
            </div>
            <div className="mt-3 leading-7">
              <span>{project.progress} %</span>
              <Progress size="sm" progress={project.progress} />
            </div>
          </Link>
          <div className="flex justify-between mt-4">
            <div className="flex items-center gap-2">
              <TeamMembers TeamMembers={project.teamMembers} />
            </div>
            <div>
              <span className="text-red-500 text-md flex items-center justify-center font-normal gap-1">
                {project.priority == "High" && (
                  <i class="bx bx-chevrons-up"></i>
                )}
                {project.priority == "Medium" && (
                  <i class="bx bx-chevron-up"></i>
                )}
                {project.priority == "Low" && (
                  <i class="bx bx-chevron-down"></i>
                )}
                {project.priority.toUpperCase()}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
}
