
import { Delete, FilePenLine, SunMoon } from "lucide-react"
import { useState } from "react"

const TodoList = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isEdit, setIsEdit] = useState(null)


  // function to add new task and edit existing task using the if else
  const addTask = () => {
    if (isEdit !== null) {
      // Update the existing task
      const newTasks = tasks.map((task, index) =>
        index === isEdit ? { ...task, title, description } : task
      );
      setTasks(newTasks);
      setIsEdit(null); // Editing disabled
    } else {
      // Add a new task
      const newTask = { title, description, completed: false };
      setTasks([...tasks, newTask]);
    }
    setTitle("");
    setDescription("");
  };

  // Function to mark the task as completed
  const markCompleted = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    )
  };

  // Function to delete a completed task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index))
  };

  //function to edit a task
  const editTask = (index) => {
    setIsEdit(index);
    setTitle(tasks[index].title);
    setDescription(tasks[index].description);
  }

  function handleClick() {
    setIsDarkMode(!isDarkMode)
  };

  function handleTitleChange(event) {
    setTitle(event.target.value)
  };

  function handleDescriptionChange(event) {
    setDescription(event.target.value)
  };

  return (
    <div className={`${isDarkMode ? 'bg-black' : 'bg-[#400C4C]'} h-screen flex items-center justify-center flex-col px-4`}>
      <div className={`${isDarkMode ? 'bg-[#333333] text-white' : 'bg-[#D9B9E2] text-white'} w-full rounded-2xl shadow-md max-w-lg p-6 md:p-8`}>
        <div className="flex items-center justify-between gap-4 h-20 md:h-24 w-full">
          <h2 className={`${isDarkMode ? 'text-white' : 'text-[#400C4C]'} text-2xl font-bold`}>My-Todo List</h2>
          <SunMoon className={`${isDarkMode ? 'text-white' : 'text-[#400C4C]'} mr-3`} onClick={handleClick} />
        </div>

        <div className="flex items-center max-md:flex-wrap ml-2 pb-10">
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <label htmlFor="tasks" className="text-2xl font-bold underline">Tasks:</label>
            <input type="text" onChange={handleTitleChange} value={title} placeholder="title..." className="border w-24 max-w-xs rounded-lg h-10 outline-none text-black px-2" />
            <input type="text" onChange={handleDescriptionChange} value={description} placeholder="description..." className="border w-40 max-w-xs rounded-lg h-10 outline-none text-black px-2" />
          </div>

          <div className="ml-3">
            <button onClick={addTask} className={`${isDarkMode ? 'bg-black text-white' : 'bg-[#9462A1] hover:bg-[#400C4C] text-white'} py-2 w-16 px-4 rounded-full`}>Add</button>
          </div>
        </div>

        <div className="flex pb-8 px-4">
          <input type="search" name="search-bar" placeholder="search task..." className=" border w-[300px] max-w-xs rounded-lg h-10 outline-none text-black px-3" />

          <div className="ml-3">
            <button className={`${isDarkMode ? 'bg-black text-white hover:bg-black py-2 w-20 px-4 rounded-full  text-center' : 'bg-[#9462A1] hover:bg-[#400C4C] text-white py-2 w-20  px-4 rounded-full  text-center'} ' flex '  `} >Search</button>
          </div>

        </div>

        <div className="space-y-4">
          {tasks.map((task, index) => (
            <div key={index} className={`${isDarkMode ? 'border rounded-lg border-white flex justify-between items-center  pl-3 pr-3' : 'border rounded-lg border-[#400C4C] flex justify-between items-center  pl-3 pr-3'}`}>

              <div>
                <h2 className={`text-2lg text-black font-semibold ${task.completed ? "line-through text-gray-400" : ""}`}>{task.title}</h2>
                <p className={` text-black ${task.completed ? "line-through text-gray-400" : ""}`}>{task.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => markCompleted(index)} className="text-sm text-green-500 hover:text-green-600">
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <FilePenLine onClick={() => editTask(index)} className="text-sm text-blue-500" />
                <Delete onClick={() => deleteTask(index)} className="text-sm text-red-500 " />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TodoList
