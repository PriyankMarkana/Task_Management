import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  taskData: [],
  tempData: [],
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    getTask: (state, action) => {
      if (localStorage.getItem('task') !== null) {
        state.taskData = JSON.parse(localStorage.getItem('task'));
        state.tempData = JSON.parse(localStorage.getItem('task'));
      }

    },
    addTask: (state, action) => {
      console.log(action.payload);
      state.taskData.push(action.payload);
      state.tempData.push(action.payload);
      localStorage.setItem('task', JSON.stringify(state.taskData))
    },
    deleteTask: (state, action) => {
      console.log(action.payload);
      state.taskData = state.taskData.filter((item, index1) => index1 !== action.payload);
      state.tempData = state.taskData;
      localStorage.setItem('task', JSON.stringify(state.taskData))

    },
    editTask: (state, action) => {
      state.taskData[action.payload.id].title = action.payload.title;
      state.taskData[action.payload.id].description = action.payload.description;
      state.taskData[action.payload.id].date = action.payload.date;
      state.tempData = state.taskData;
      localStorage.setItem('task', JSON.stringify(state.taskData))


    },
    statusTask: (state, action) => {
      if (state.taskData[action.payload.index].check === true) {

        state.taskData[action.payload.index].check = false;
      }
      else {
        state.taskData[action.payload.index].check = true;
      }
      state.tempData = state.taskData;
      localStorage.setItem('task', JSON.stringify(state.taskData))

    },
    completeTask: (state, action) => {
      state.tempData = state.taskData.filter((item) => {
        return item.check === true;
      })
    },
    inprogessTask: (state, action) => {
      state.tempData = state.taskData.filter((item) => {
        return item.check === false;
      })
    },
    allTask: (state, action) => {
      state.tempData = state.taskData;
    },

    priorityTask: (state, action) => {
      if (state.taskData[action.payload.index].priority === true) {

        state.taskData[action.payload.index].priority = false;
      }
      else {
        state.taskData[action.payload.index].priority = true;
      }

      function compare(a, b) {
        ;
        if (a.priority > b.priority) {
          return -1;
        }
        if (a.priority < b.priority) {
          return 1;
        }
        return 0;

      }
      state.taskData = state.taskData.sort(compare);
      state.tempData = state.taskData;
      localStorage.setItem('task', JSON.stringify(state.taskData))


    },

  },
})

export const { getTask, addTask, deleteTask, editTask, statusTask, completeTask, inprogessTask, allTask, priorityTask } = taskSlice.actions

export default taskSlice.reducer