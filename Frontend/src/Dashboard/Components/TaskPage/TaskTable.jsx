import React from "react";
import { Table, Dropdown } from "flowbite-react";
import Issue from "./Issue";
import Submission from "./submission";

export default function TaskTable({ data }) {
  const CircleColor = (status) => {
    switch (status) {
      case "Not-Started":
        return "bg-[#c4c4c4]";
      case "Done":
        return "bg-[#00c875]";
      case "In-progress":
        return "bg-[#FDAB3D]";
      case "Stuck":
        return "bg-[#DF2F4A]";
      default:
        return "";
    }
  };


  return (
    <>
      <Table className="!text-gray-700 overflow-x-auto shadow-md rounded-sm bg-transparent">
        <Table.Head>
          <Table.HeadCell>Task</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Due Date</Table.HeadCell>
          <Table.HeadCell>Priority</Table.HeadCell>
          <Table.HeadCell>Submission</Table.HeadCell>
          <Table.HeadCell>Issue</Table.HeadCell>
          <Table.HeadCell>Assigned</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data ? (
            data?.map((task) => (
              <Table.Row
                key={task.taskId}
                className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-100 cursor-pointer"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {task.name}
                </Table.Cell>
                <Table.Cell className="">{task.status}</Table.Cell>
                <Table.Cell>{task.endDate}</Table.Cell>
                <Table.Cell>{task.priority}</Table.Cell>
                <Table.Cell>
                  <Submission Id={task.taskId}/>
                </Table.Cell>
                <Table.Cell>
                  <Issue Id={task.id} />
                </Table.Cell>
                <Table.Cell>
                  view all
                  {/* <AvatarStack Id={1} /> */}
                </Table.Cell>
                <Table.Cell>
                  <div>
                    <Dropdown
                      arrowIcon={false}
                      label={
                        <span>
                          <i class="bx bx-dots-vertical-rounded"></i>
                        </span>
                      }
                      inline
                      placement="right"
                    >
                      <Dropdown.Item>
                        <span className="mr-2">
                          <i
                            class="bx bx-edit"
                            style={{ color: "#0e7acd" }}
                          ></i>
                        </span>{" "}
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <span className="mr-2">
                          <i
                            class="fa-solid fa-trash"
                            style={{ color: "#ea3434" }}
                          ></i>
                        </span>{" "}
                        Delete
                      </Dropdown.Item>
                    </Dropdown>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <div>No data Found</div>
          )}
        </Table.Body>
      </Table>
    </>
  );
}
