import {
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa"

export const dropDownOptions = [
  { label: "* Select Professional Status", value: 0 },
  { label: "Developer", value: "Developer" },
  { label: "Junior Developer", value: "Junior Developer" },
  { label: "Senior Developer", value: "Senior Developer" },
  { label: "Manager", value: "Manager" },
  { label: "Student or Learning", value: "Student or Learning" },
  { label: "Instructor or Teacher", value: "Instructor or Teacher" },
  { label: "Intern", value: "Intern" },
  { label: "Other", value: "Other" },
]
export const fields = [
  {
    label: "Company",
    name: "company",
    supportiveText: "Could be your own company or one you work for",
  },
  {
    label: "Website",
    name: "website",
    supportiveText: "Could be your own website or a company one",
  },
  {
    label: "Location",
    name: "location",
    supportiveText: "City or city & state suggested (eg. Boston, MA)",
  },
  {
    label: "Skills",
    name: "skills",
    mandatory: true,
    supportiveText:
      "Please use comma separated values (eg.HTML,CSS,JavaScript,PHP)",
  },
  {
    label: "Github Username",
    name: "githubusername",
    supportiveText:
      "If you want your latest repos and a Github link, include your username",
  },
  {
    label: "Short Bio",
    name: "bio",
    isTextArea: true,
    supportiveText: "Tell us a little about yourself",
  },
]

export const socialMediaFields = [
  {
    label: "Twitter URL",
    name: "twitter",
    icon: FaTwitter,
    color: "#00acee",
  },
  {
    label: "Facebook URL",
    name: "facebook",
    icon: FaFacebook,
    color: "#4267B2",
  },
  {
    label: "YouTube URL",
    name: "youtube",
    icon: FaYoutube,
    color: "#FF0000",
  },
  {
    label: "LinkedIn URL",
    name: "linkedin",
    icon: FaLinkedin,
    color: " #0e76a8",
  },
  {
    label: "Instagram URL",
    name: "instagram",
    icon: FaInstagram,
    color: "#fb3958",
  },
]
