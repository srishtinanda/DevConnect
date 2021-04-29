import React from "react"
import { Button } from "react-bootstrap"
import { FaUserEdit, FaGraduationCap, FaInfoCircle } from "react-icons/fa"

const DashboardActions = () => (
  <div>
    <Button variant='outline-success' href='/edit-profile'>
      <FaUserEdit /> Edit Profile{" "}
    </Button>{" "}
    <Button variant='outline-success' href='/add-education'>
      <FaGraduationCap /> Add Education
    </Button>{" "}
    <Button variant='outline-success' href='/add-experience'>
      <FaInfoCircle /> Add Experience
    </Button>{" "}
  </div>
)
export default DashboardActions
