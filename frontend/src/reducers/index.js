import { combineReducers } from "redux";
import projects from './projects'
import initialLoading from './initial_loading'

export default combineReducers({
  projects,
  initialLoading
})
