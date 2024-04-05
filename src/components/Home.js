import React, { useState } from 'react'
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux'
import { addTask, deleteTask, editTask } from '../App/taskSlice';
import { Link } from 'react-router-dom';

function Home() {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [date, setDate] = useState("");
  let [id, setId] = useState();

  let [toggle, setToggle] = useState(true);
  let dispatch = useDispatch();
  let taskData = useSelector((state) => state.task.taskData);

  let day = "";
  let hour = "";
  let minute = "";
  const add = () => {
    if (toggle) {
      dateCal();
      if (date === "" || title === "" || description === "") {
        alert("Please fill all the fields");
      }
      else if (date === "change") {
        alert("Start time needs to be earlier than the end time");
      }
      else {
        dispatch(addTask({ title, description, date, check: false, priority: false, day, hour, minute }));
        setTitle("");
        setDescription("");
        setDate("");
      }
    }
    else {

      dateCal();
      if (date === "" || title === "" || description === "") {
        alert("Please fill all the fields");
      }
      else if (date === "change") {
        alert("Start time needs to be earlier than the end time");
      }
      else {
        dispatch(editTask({ title, description, date, day, hour, minute, id }));
        setToggle(true);
        setTitle("");
        setDescription("");
        setDate("");
      }
    }

  }
  const edit = (index) => {
    console.log(taskData);
    let temp;
    setToggle(false);
    setId(index);
    setTitle(taskData[index].title);
    setDescription(taskData[index].description);
    temp = taskData[index].date;
    setDate(temp);
  }

  const dateCal = () => {
    let todayDate = new Date();
    let taskdate = new Date(date);
    let miliSecond = taskdate - todayDate;

    day = miliSecond / (1000 * 60 * 60 * 24);
    if (day > 0) {
      day = Math.floor(day);
    }
    else {
      day = Math.round(day);
    }

    if ((taskdate.getHours() - todayDate.getHours()) < 0 || day < 0 || (taskdate.getMinutes() - todayDate.getMinutes()) < 0) {
      date = "change";
    }
    else {

      minute = taskdate.getMinutes() - todayDate.getMinutes();
      hour = taskdate.getHours() - todayDate.getHours();

    }
  }
  return (
    <div className='bg-gray-900' style={{ height: "100vh" }}>
      <section className="text-gray-400 bg-gray-900 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-3">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Task Management</h1>
          </div>
          <div className="lg:w-3/5 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-400">Enter Task Title</label>
                  <input type="text" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-400">Task Description</label>
                  <input type="text" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={description} onChange={e => setDescription(e.target.value)} />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-400">Enter Date</label>
                  <input type="datetime-local" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={date} onChange={e => setDate(e.target.value)} />
                </div>
              </div>

              <div className="p-2 w-full">
                <div className='flex'>
                  <button className=" text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg me-1" onClick={add}>Add Task</button>
                  <button className=" text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"><Link to="/userView">UserView</Link></button>
                </div>
              </div>
              <div className="-m-1.5 mt-4 overflow-x-auto text-center mx-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-center">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th scope="col" className="px-5 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-gray-400 text-nowrap">Task Title</th>
                          <th scope="col" className="px-5 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-gray-400 text-nowrap">Task Description</th>
                          <th scope="col" className="px-5 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-gray-400 text-nowrap">Date & Time</th>
                          <th scope="col" className="px-5 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-gray-400 text-nowrap">Update</th>
                          <th scope="col" className="px-5 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-gray-400 text-nowrap">Delete</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {
                          taskData.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{item.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{item.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{item.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                  <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={() => edit(index)}><MdModeEdit /></button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                  <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={() => dispatch(deleteTask(index))}><MdDelete /></button>
                                </td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home;
