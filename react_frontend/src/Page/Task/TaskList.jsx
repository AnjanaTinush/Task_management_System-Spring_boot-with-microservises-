// TaskList.js
import React, { useEffect } from "react";
import TaskCard from "./TaskCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../ReducToolKit/TaskSlice";

const TaskList = () => {
  
  const dispatch=useDispatch()
  const {task}=useSelector(store=>store)

  useEffect(()=>{
    dispatch(fetchTasks({}));
  },[])
  
console.log("task",task)
  
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