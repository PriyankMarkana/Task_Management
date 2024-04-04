import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { statusTask, completeTask, inprogessTask, allTask, dateCal, priorityTask } from '../App/taskSlice';
import { Link } from 'react-router-dom';
function UserView() {

  let dispatch = useDispatch();
  let tempData = useSelector((state) => state.task.tempData);


  return (
    <div className='bg-gray-900' style={{ height: "100vh" }}>
      <section className="text-gray-400 bg-gray-900 relative">
        <div className='container px-5 py-24'>
          <div className="flex flex-col text-center w-full mb-3">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">UserView</h1>
          </div>
          <div className="p-2  lg:w-3/5 md:w-2/3">
            <div className='flex flex-wrap'>
              <button className=" text-white bg-indigo-500 border-0 py-1   px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg m-1"><Link to="/">Back</Link></button>
              <button className=" text-white bg-indigo-500 border-0 py-1  px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg m-1" onClick={() => dispatch(completeTask())}>Completed</button>
              <button className=" text-white bg-indigo-500 border-0 py-1  px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg m-1" onClick={() => dispatch(inprogessTask())}>In Progess</button>
              <button className=" text-white bg-indigo-500 border-0 py-1   px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg m-1" onClick={() => dispatch(allTask())}>All</button>
            </div>
          </div>
          <div className="-m-1.5 mt-4 overflow-x-auto text-center mx-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-center">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-5 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-gray-400 text-nowrap>Status">Status</th>
                      <th scope="col" className="px-5 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-gray-400 text-nowrap">Task Title</th>
                      <th scope="col" className="px-5 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-gray-400 text-nowrap">Task Description</th>
                      <th scope="col" className="px-5 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-gray-400 text-nowrap">Date & Time</th>
                      <th scope="col" className="px-5 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-gray-400 text-nowrap">Remaining Time</th>
                      <th scope="col" className="px-5 py-3 text-center text-sm font-medium text-gray-500 uppercase dark:text-gray-400 text-nowrap">Priority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {
                       tempData && tempData.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td><input type='checkbox' checked={item.check} onClick={() => dispatch(statusTask({ index }))}></input></td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{item.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{item.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{item.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                              {item.day} Days {item.hour} Hours {item.minute} Minutes</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                              <input type="checkbox" checked={item.priority} onClick={() => dispatch(priorityTask({ index }))} style={{ accentColor: "yellow" }}></input>
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
      </section>
    </div>
  )
}

export default UserView;
