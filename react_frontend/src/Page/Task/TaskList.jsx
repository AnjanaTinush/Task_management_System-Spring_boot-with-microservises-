// TaskList.js
import React from "react";
import TaskCard from "./TaskCard";

const TaskList = () => {
  return (
    <div className="w-full lg:w-[57vw] mx-auto px-4">
      <div className="space-y-3">
        {[1, 2, 3, 4].map((_, index) => (
          <TaskCard key={index} />
        ))}
      </div>
    </div>
  );
};
export default TaskList