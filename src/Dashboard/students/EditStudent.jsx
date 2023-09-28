import React, { useDebugValue, useEffect, useState } from "react";
import { Radio, Button } from "@material-tailwind/react";
import baseurl from "../../Config";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";

const EditStudent = () => {
  const [loader, setLoader] = useState(false);
  const [regno, setRegno] = useState("");
  const [name, setName] = useState("");
  const [fname, setFname] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [admdate, setAdmdate] = useState("");
  const [refby, setRefby] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  // update
  const [opt, setOpt] = useState("");
  const [status, setStatus] = useState("");
  const [course, setCourse] = useState("");
  const [shift, setShift] = useState("");
  const [locker_no, setLocker_no] = useState("");
  const [courseData, setCourseData] = useState([]);
  const location = useLocation();
  const stuData = location.state;

  const navigate = useNavigate();

  useEffect(() => {
    getCourseData();
  }, []);

  const getCourseData = () => {
    fetch(baseurl + "/api/course", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setCourseData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setRegno(stuData.regno);
    setName(stuData.name);
    setFname(stuData.fname);
    setAddress(stuData.address);
    setContact(stuData.contact);
    setEmail(stuData.email);
    setGender(stuData.gender);
    setDob(stuData.dob);
    setAdmdate(stuData.admdate);
    setRefby(stuData.refby);
    setPassword(stuData.password);
    setProfilePic(stuData.profilePic);
    setStatus(stuData.status);
    setCourse(stuData.course);
    setShift(stuData.shift);
    setLocker_no(stuData.locker_no);
  }, [stuData]);

  // PUT Api For Updating Data

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    const formData = new FormData();
    formData.append("regno", regno);
    formData.append("name", name);
    formData.append("fname", fname);
    formData.append("address", address);
    formData.append("contact", contact);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("dob", dob);
    formData.append("admdate", admdate);
    formData.append("refby", refby);
    formData.append("password", password);
    formData.append("profilePic", profilePic);
    formData.append("status", status);
    formData.append("course", course);
    formData.append("shift", shift);
    formData.append("locker_no", locker_no);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    // Empty the value of fields
    setName("");
    setEmail("");
    setRegno("");
    setFname("");
    setAddress("");
    setGender("");
    setAdmdate("");
    setRefby("");
    setDob("");
    setPassword("");
    setProfilePic("");

    // Post Api For Updating Data
    fetch(baseurl + "/api/students/" + stuData._id, {
      method: "PUT",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        toast.success("Updated Successfully");
        setLoader(false);
        navigate("/admin/students");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {loader ? (
        <div className="w-full h-[90vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-5xl mx-auto p-5">
          <h2 className="text-3xl text-center font-bold my-5">Edit Student</h2>
          <div className=" md:px-5 lg:px-10 mt-20">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="first-name"
                  >
                    Full Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="fatherName"
                  >
                    Father Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="fatherName"
                    type="text"
                    placeholder="Harry Doe"
                    value={fname}
                    onChange={(e) => {
                      setFname(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="email"
                    type="email"
                    placeholder="john@gmail.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="regno"
                  >
                    Registration No.
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="regno"
                    type="number"
                    placeholder="7643858"
                    value={regno}
                    onChange={(e) => {
                      setRegno(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full px-3 mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="address"
                    type="text"
                    placeholder="7th Street, Mexico, USA"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div>

                <div className="w-full md:w-1/2 px-3 mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="contact"
                  >
                    Contact
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="contact"
                    type="number"
                    placeholder="9257643858"
                    value={contact}
                    onChange={(e) => {
                      setContact(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="gender"
                  >
                    Gender
                  </label>
                  <div className="flex gap-10">
                    <Radio
                      id="male"
                      name="type"
                      label="Male"
                      value={gender}
                      onChange={(e) => {
                        setGender("male");
                      }}
                    />
                    <Radio
                      id="female"
                      name="type"
                      label="Female"
                      value={gender}
                      onChange={(e) => {
                        setGender("female");
                      }}
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="md:w-1/2 px-3 mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="status"
                  >
                    Status
                  </label>
                  <select
                    label="Select Status"
                    className="p-2 border focus-visible:outline-none"
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  >
                    <option
                      value="active"
                      selected={stuData.status === "active" ? true : false}
                    >
                      Active
                    </option>
                    <option
                      value="pending"
                      selected={stuData.status === "pending" ? true : false}
                    >
                      Pending{" "}
                    </option>
                    <option
                      value="completed"
                      selected={stuData.status === "completed" ? true : false}
                    >
                      Completed{" "}
                    </option>
                    <option
                      value="absconded"
                      selected={stuData.status === "absconded" ? true : false}
                    >
                      Break{" "}
                    </option>
                  </select>
                </div>

                <div className="w-full md:w-1/2 px-3 mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="dob"
                  >
                    Date Of Birth
                  </label>
                  <input
                    className="scroll-smooth appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="dob"
                    type="date"
                    value={dob}
                    onChange={(e) => {
                      setDob(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="admdate"
                  >
                    Admission Date
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="admdate"
                    type="date"
                    value={admdate}
                    onChange={(e) => {
                      setAdmdate(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="refBy"
                  >
                    Referred By
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="refBy"
                    type="text"
                    placeholder="Suman Yadav"
                    value={refby}
                    onChange={(e) => {
                      setRefby(e.target.value);
                    }}
                  />
                </div>
                {/* Password */}
                <div className="md:w-1/2 px-3 mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="scroll-smooth appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <input
                  className="appearance-none block w-1/2 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="profilePic"
                  type="file"
                  onChange={(e) => {
                    setProfilePic(e.target.files[0]);
                  }}
                />
                {/* Option */}
                <div className="w-full md:w-1/2 px-3 mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="opt"
                  >
                    You Want
                  </label>
                  <div className="flex flex-wrap gap-1">
                    <Radio
                      id="course"
                      onChange={() => setOpt("course")}
                      name="type"
                      label="Course"
                    // defaultChecked={stuData.course ? true : false}
                    />
                    <Radio
                      id="library"
                      onChange={() => setOpt("library")}
                      name="type"
                      label="Library"
                    />
                    <Radio
                      id="both"
                      onChange={() => setOpt("both")}
                      name="type"
                      label="Both"
                    />
                  </div>
                </div>
                {/* Course */}
                {opt == "course" || opt == "both" ? (
                  <div className="w-full md:w-1/2 px-3 mb-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="course"
                    >
                      Course
                    </label>
                    <select
                      label="Select Course"
                      className="p-2 border focus-visible:outline-none"
                      value={course}
                      onChange={(e) => {
                        setCourse(e.target.value);
                      }}
                    >
                      <option value="">Select Course</option>
                      {courseData.map((item) => {
                        return (
                          <option
                            value={item._id}
                            selected={item._id == stuData.course ? true : false}
                          >
                            {item.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                ) : (
                  ""
                )}
                {/* Locker No. */}
                {opt == "library" || opt == "both" ? (
                  <div className="w-full md:w-1/2 px-3 mb-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="locker_no"
                    >
                      Locker Number
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="locker_no"
                      type="number"
                      placeholder="544543"
                      value={locker_no}
                      onChange={(e) => {
                        setLocker_no(e.target.value);
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}

                {/* Shift */}
                <div className="w-full md:w-1/2 px-3 mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="opt"
                  >
                    Shift
                  </label>
                  <div className="flex flex-wrap gap-1">
                    <Radio
                      id="shift"
                      onChange={() => setShift("1st Shift")}
                      name="type2"
                      label="1st Shift"
                      defaultChecked={
                        stuData.shift == "1st Shift" ? true : false
                      }
                    />
                    <Radio
                      id="shift"
                      onChange={() => setShift("2nd Shift")}
                      name="type2"
                      label="2nd Shift"
                      defaultChecked={
                        stuData.shift == "2nd Shift" ? true : false
                      }
                    />
                  </div>
                </div>
                <input
                  type="submit"
                  className="h-fit p-2 bg-[var(--theme-color)] rounded-lg text-white hover:bg-[var(--secondary-color)] cursor-pointer transition-all"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditStudent;
