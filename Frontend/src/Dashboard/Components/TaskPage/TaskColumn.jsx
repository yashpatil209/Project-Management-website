import React, { useState } from "react";
import { PlusCircle, Circle, CheckCircle2, Clock3 } from "lucide-react";

function App() {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Research project requirements", status: "todo" },
    { id: "2", title: "Design user interface", status: "inProgress" },
    { id: "3", title: "Setup development environment", status: "done" },
  ]);
  const [newTask, setNewTask] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now().toString(),
          title: newTask,
          status: "todo",
        },
      ]);
      setNewTask("");
    }
  };

  const getTasksByStatus = (status) =>
    tasks.filter((task) => task.status === status);

  const moveTask = (taskId, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const Column = ({ title, status, icon: Icon, bgColor }) => (
    <div className="flex-1 min-w-[300px] bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Icon className={bgColor} size={20} />
        <h2 className="font-semibold text-lg">{title}</h2>
        <span className="ml-auto bg-gray-100 px-2 py-1 rounded-full text-sm">
          {getTasksByStatus(status).length}
        </span>
      </div>
      <div className="space-y-2">
        {getTasksByStatus(status).map((task) => (
          <div
            key={task.id}
            className="bg-gray-50 p-3 rounded-lg shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
          >
            <p className="text-gray-800">{task.title}</p>
            <div className="flex gap-2 mt-2">
              {status !== "todo" && (
                <button
                  onClick={() => moveTask(task.id, "todo")}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  ← Move to Todo
                </button>
              )}
              {status !== "inProgress" && (
                <button
                  onClick={() => moveTask(task.id, "inProgress")}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  {status === "todo" ? "Start →" : "← Move to Progress"}
                </button>
              )}
              {status !== "done" && (
                <button
                  onClick={() => moveTask(task.id, "done")}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Complete →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Task Board</h1>
          <form onSubmit={addTask} className="flex gap-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
            >
              <PlusCircle size={20} />
              Add Task
            </button>
          </form>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4">
          <Column
            title="To Do"
            status="todo"
            icon={Circle}
            bgColor="text-gray-400"
          />
          <Column
            title="In Progress"
            status="inProgress"
            icon={Clock3}
            bgColor="text-yellow-500"
          />
          <Column
            title="Done"
            status="done"
            icon={CheckCircle2}
            bgColor="text-green-500"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
