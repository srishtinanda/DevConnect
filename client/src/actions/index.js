export { default as setAlert } from './Alert'
export { default as register } from './Auth/register'
export { default as userLoaded } from './Auth/userLoaded'
export { default as login } from './Auth/login'
export { default as logout } from './Auth/logout'
export { default as deleteAccount } from './Auth/deleteAccount'
export { default as createProfile } from './Profile/createOrUpdateProfile'
export { default as addEducation } from './Profile/addEducation'
export { default as addExperience } from './Profile/addExperience'
export { deleteExperience, deleteEducation } from './Profile/deleteFromProfile'
export { 
    getCurrentProfile,
    getAllProfiles, 
    getProfileById,
    getGithubRepos,
} from './Profile/getProfile'
