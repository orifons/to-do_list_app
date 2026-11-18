import { Outlet } from "react-router";

function TaskLayout() {
  return (
    <div>
      <h1>Task Section</h1>
      <p>Welcome to the Task Section!</p>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default TaskLayout