import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AddProject from "../Components/AddProject";
import ProjectCard from "../Components/ProjectCard";
import Filter from "../Components/Common/Filter";
import { getData } from "@/Api/api";
import Chat from "../Components/Common/Chat";

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [projects, setProjects] = useState([]); // Always initialize as an array
  const [loading, setLoading] = useState(true); // Loading state
  const { token } = useSelector((state) => state.user);
  const userId = useSelector((state) => state.user.currentUser.userId);

  const handleFilterSelect = (value) => {
    setSelectedFilter(value);
  };

  // Fetch all projects
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getData(`/getallmyprojects/${userId}`, token);
        setProjects(response);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
      }
      setLoading(false);
    };

    fetchData();
  }, [userId, token]);

  // Fetch filtered projects
  useEffect(() => {
    if (selectedFilter) {
      const filterProjects = async () => {
        setLoading(true);
        try {
          const response = await getData(
            `/filter/getprojects?name=${selectedFilter.split(" ")[0]}&value=${
              selectedFilter.split(" ")[1]
            }`,
            token
          );
          setProjects(Array.isArray(response) ? response : []);
        } catch (error) {
          console.error("Error filtering projects:", error);
          setProjects([]);
        }
        setLoading(false);
      };

      filterProjects();
    }
  }, [selectedFilter, token]);

  return (
    <div className="mt-3 w-full">
      <div className="flex justify-between">
        <div className="text-xl font-bold">Projects</div>
        <div className="flex justify-center items-center gap-4">
          <Filter onSelect={handleFilterSelect} />
          <AddProject />
        </div>
      </div>
      <div className="mt-3">
        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length > 0 ? (
          <div className="flex flex-wrap gap-6 mt-4">
            <ProjectCard projects={projects} />
          </div>
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
