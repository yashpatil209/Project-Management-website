import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { getData } from "@/Api/api";

const MyTasks = () => {
  const [projects, setProjects] = useState([]);
  const { token } = useSelector((state) => state.user);
  const userId = useSelector((state) => state.user.currentUser.userId);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getData(`/getallworkprojects/${userId}`, token);
      setProjects(response);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-5 mt-7">
        {projects &&
          projects.map((project) => (
            <Link to={`/dashboard/mytasks/${project.projectId}`}>
              <Card
                className="max-w-sm"
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                renderImage={() => (
                  <img
                    width={500}
                    height={200}
                    className="rounded-t-md"
                    src="../../../public/images/project-management.jpg"
                    alt="image 1"
                  />
                )}
              >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {project.name}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {project.description}
                </p>
              </Card>
            </Link>
          ))}
      </div>
    </>
  );
};

export default MyTasks;
