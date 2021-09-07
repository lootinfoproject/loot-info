export default function projects(state = [], action) {
  switch (action.type) {
    case 'SET_PROJECTS':
      return [...action.projects]
    default:
      return state
  }
}
