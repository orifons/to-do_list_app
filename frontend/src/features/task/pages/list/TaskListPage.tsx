import { Link } from "react-router";


function TaskListPage() {
  return (
    <div>
      <h1>Task List</h1>
      <Link to="/tasks/new">Add New Task</Link>
    </div>
  )
}

export default TaskListPage