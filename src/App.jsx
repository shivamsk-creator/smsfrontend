import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./Homepage";
import Navigation from "./Components/Navigation";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import About from "./Pages/About";
import Courses from "./Pages/Courses";
import Contact from "./Pages/Contact";
import Blogs from "./Pages/Blogs";

// Admin Dashboard Import
import AdminHeader from "./Components/AdminHeader";
import Dashboard from "./Dashboard/AdminDashboard";

import Students from "./Dashboard/students/Students";
import AdminEnrollment from "./Dashboard/enrollment/AdminEnrollment";
import AdminSettings from "./Dashboard/AdminSettings";
import AddStudentForm from "./Dashboard/students/AddStudentForm";
import AddInstructor from "./Dashboard/instructors/AddInstructor";
import InstructorList from "./Dashboard/instructors/InstructorList";
import EditInstructor from "./Dashboard/instructors/EditInstructor";
import CoursesList from "./Dashboard/courses/CourseList";
import CourseUploads from "./Dashboard/courses/course-content/CourseUploads";
import Enquiries from "./Dashboard/enquiries/Enquiries";
import Categories from "./Dashboard/courses/categories/Categories";
import EditStudent from "./Dashboard/students/EditStudent";
import EditEnquiry from "./Dashboard/enquiries/EditEnquiry";
import Expenses from "./Dashboard/expenses/Expenses";
import Income from "./Dashboard/income/Income";
import BookList from "./Dashboard/library/BookList";
import ScheduleClasses from "./Dashboard/scheduleClasses/ScheduleClasses";

// Student Dashboard Import
import StudentSidebar from "./Components/StudentSidebar";
import StudentDashboard from "./studentDashboard/StudentDashboard";
import Classes from "./studentDashboard/Classes";
import Footer from "./Components/Footer";
import StudentAcademics from "./studentDashboard/academics/StudentAcademics";
import StudentMarks from "./studentDashboard/StudentMarks";
import StudentProfile from "./studentDashboard/profile/StudentProfile";
import StudentLibrary from "./studentDashboard/library/StudentLibrary";
import StudentPayments from "./studentDashboard/payments/StudentPayments";
import CourseContent from "./studentDashboard/academics/CourseContent";
import StudentQueries from "./studentDashboard/queries/StudentQueries";
import StudentAssignments from "./studentDashboard/assignments/StudentAssignments";

// InStructor Routes
import InstructorHeader from "./Components/InstructorHeader";
import InstructorDashboard from "./InstructorDashboard/instructor-dashboard/InstructorDashboard";
import InstructorResultList from "./InstructorDashboard/instructor-result/InstructorResultList";
import InstructorAssignments from "./InstructorDashboard/InstructorAssignments/InstructorAssignments";
import InstructorQueries from "./Dashboard/queries/AdminQueries";

// Authentication Imports
import LoginStudent from "./authentication/LoginStudent";
import StudentProtected from "./protected/StudentProtected";
import LoginInstructor from "./authentication/LoginInstructor";
import InstructorProfile from "./InstructorDashboard/profile/InstructorProfile";
import InstructorProtected from "./protected/InstructorProtected";
import LoginAdmin from "./authentication/LoginAdmin";
import AdminProfile from "./Dashboard/profile/AdminProfile";
import AdminProtected from "./protected/AdminProtected";
import StudentHeader from "./Components/StudentHeader";
import AdminFees from "./Dashboard/AdminFees/AdminFees";
import AdminQueries from "./Dashboard/queries/AdminQueries";
import AdminEvents from "./Dashboard/AdminEvents/AdminEvents";
import StudentStatus from "./InstructorDashboard/StudentStatus/StudentStatus";
import ManageStudentStatus from "./Dashboard/manage-student/ManageStudentStatus";
import ScheduleBatches from "./Dashboard/scheduleBatches/ScheduleBatches";
import PrintReceipt from "./studentDashboard/payments/PrintReceipt";
import StudentOfTheMonth from "./Dashboard/st-of-the-month/StudentOfTheMonth";

const App = () => {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isInstructor, setIsInstructor] = useState(false);
  const [auth, setAuth] = useState();
  const [instructorAuth, setInstructorAuth] = useState();
  const [adminAuth, setAdminAuth] = useState();

  console.log(adminAuth);

  useEffect(() => {
    updateAuth();
    updateInstructorAuth();
    updateAdminAuth();
  });

  const updateAuth = () => {
    setAuth(JSON.parse(window.localStorage.getItem("auth")));
  };
  const updateInstructorAuth = () => {
    setInstructorAuth(
      JSON.parse(window.localStorage.getItem("instructorAuth"))
    );
  };
  const updateAdminAuth = () => {
    setAdminAuth(JSON.parse(window.localStorage.getItem("adminAuth")));
  };

  useEffect(() => {
    setIsAdmin(location.pathname.startsWith("/admin"));
    setIsStudent(location.pathname.startsWith("/student"));
    setIsInstructor(location.pathname.startsWith("/instructor"));
  }, [location.pathname]);

  return (
    <>
      {isAdmin || isStudent || isInstructor ? "" : <Navigation />}

      <Routes>
        <Route path="/" exact={true} element={<Homepage />} />
        <Route path="/about" exact={true} element={<About />} />
        <Route path="/courses" exact={true} element={<Courses />} />
        <Route path="/contact" exact={true} element={<Contact />} />
        <Route path="/blogs" exact={true} element={<Blogs />} />

        {/* Auth Routes */}
        <Route
          path="/login-student"
          exact={true}
          element={<LoginStudent updateAuth={updateAuth} />}
        />
        <Route
          path="/login-instructor"
          exact={true}
          element={
            <LoginInstructor updateInstructorAuth={updateInstructorAuth} />
          }
        />
        <Route
          path="/login-admin"
          exact={true}
          element={<LoginAdmin updateAdminAuth={updateAdminAuth} />}
        />
      </Routes>

      {/* Student Dashboard Routes */}
      {isStudent && (
        <>
          <StudentHeader updateAuth={updateAuth} auth={auth} />
          <Routes>
            <Route
              path="/student/dashboard"
              exact={true}
              element={
                <StudentProtected
                  auth={auth}
                  updateAuth={updateAuth}
                  Component={StudentDashboard}
                />
              }
            />
            <Route
              path="/student/classes"
              exact={true}
              element={
                <StudentProtected
                  auth={auth}
                  updateAuth={updateAuth}
                  Component={Classes}
                />
              }
            />
            <Route
              path="/student/academic"
              exact={true}
              element={
                <StudentProtected
                  auth={auth}
                  updateAuth={updateAuth}
                  Component={StudentAcademics}
                />
              }
            />
            <Route
              path="/student/academic/course/:id"
              exact={true}
              element={
                <StudentProtected
                  auth={auth}
                  updateAuth={updateAuth}
                  Component={CourseContent}
                />
              }
            />
            <Route
              path="/student/profile"
              exact={true}
              element={
                <StudentProtected
                  auth={auth}
                  updateAuth={updateAuth}
                  Component={StudentProfile}
                />
              }
            />
            <Route
              path="/student/marks"
              exact={true}
              element={
                <StudentProtected
                  auth={auth}
                  updateAuth={updateAuth}
                  Component={StudentMarks}
                />
              }
            />
            <Route
              path="/student/library"
              exact={true}
              element={
                <StudentProtected
                  auth={auth}
                  updateAuth={updateAuth}
                  Component={StudentLibrary}
                />
              }
            />
            <Route
              path="/student/queries"
              exact={true}
              element={
                <StudentProtected
                  auth={auth}
                  updateAuth={updateAuth}
                  Component={StudentQueries}
                />
              }
            />
            <Route
              path="/student/assignments"
              exact={true}
              element={
                <StudentProtected
                  auth={auth}
                  updateAuth={updateAuth}
                  Component={StudentAssignments}
                />
              }
            />
            <Route
              path="/student/payments"
              exact={true}
              element={
                <StudentProtected
                  auth={auth}
                  updateAuth={updateAuth}
                  Component={StudentPayments}
                />
              }
            />
            <Route
              path="/students/payments/receipt"
              exact={true}
              element={
                <StudentProtected
                  auth={auth}
                  updateAuth={updateAuth}
                  Component={PrintReceipt}
                />
              }
            />
          </Routes>
        </>
      )}

      {/* Admin Dashboard Routes */}
      {isAdmin && (
        <>
          <AdminHeader
            updateAdminAuth={updateAdminAuth}
            adminAuth={adminAuth}
          />
          <Routes>
            <Route
              path="/admin/dashboard"
              exact={true}
              element={
                <AdminProtected adminAuth={adminAuth} Component={Dashboard} />
              }
            />
            <Route
              path="/admin/enquiries"
              exact={true}
              element={
                <AdminProtected adminAuth={adminAuth} Component={Enquiries} />
              }
            />
            <Route
              path="/admin/editEnquiry"
              exact={true}
              element={
                <AdminProtected adminAuth={adminAuth} Component={EditEnquiry} />
              }
            />
            <Route
              path="/admin/courselist"
              exact={true}
              element={
                <AdminProtected adminAuth={adminAuth} Component={CoursesList} />
              }
            />
            <Route
              path="/admin/admin-courses/:id"
              exact={true}
              element={
                <AdminProtected
                  adminAuth={adminAuth}
                  Component={CourseUploads}
                />
              }
            />
            <Route
              path="/admin/categories"
              exact={true}
              element={
                <AdminProtected adminAuth={adminAuth} Component={Categories} />
              }
            />
            <Route
              path="/admin/students"
              exact={true}
              element={
                <AdminProtected adminAuth={adminAuth} Component={Students} />
              }
            />
            <Route
              path="/admin/addStudent"
              exact={true}
              element={
                <AdminProtected
                  adminAuth={adminAuth}
                  Component={AddStudentForm}
                />
              }
            />
            <Route
              path="/admin/editStudent/:id"
              exact={true}
              element={
                <AdminProtected adminAuth={adminAuth} Component={EditStudent} />
              }
            />
            <Route
              path="/admin/addInstructor"
              exact={true}
              element={
                <AdminProtected
                  adminAuth={adminAuth}
                  Component={AddInstructor}
                />
              }
            />
            <Route
              path="/admin/instructorList"
              exact={true}
              element={
                <AdminProtected
                  adminAuth={adminAuth}
                  Component={InstructorList}
                />
              }
            />
            <Route
              path="/admin/editInstructor/:id"
              element={
                <AdminProtected
                  adminAuth={adminAuth}
                  Component={EditInstructor}
                />
              }
            />

            <Route
              path="/admin/enrollment"
              element={
                <AdminProtected
                  adminAuth={adminAuth}
                  Component={AdminEnrollment}
                />
              }
            />
            <Route
              path="/admin/book-list"
              element={
                <AdminProtected adminAuth={adminAuth} Component={BookList} />
              }
            />
            <Route
              path="/admin/expenses"
              element={
                <AdminProtected adminAuth={adminAuth} Component={Expenses} />
              }
            />
            <Route
              path="/admin/funds"
              element={
                <AdminProtected adminAuth={adminAuth} Component={Income} />
              }
            />

            <Route
              path="/admin/admin-profile"
              element={
                <AdminProtected
                  adminAuth={adminAuth}
                  Component={AdminProfile}
                />
              }
            />
            <Route
              path="/admin/AdminSettings"
              element={
                <AdminProtected
                  adminAuth={adminAuth}
                  Component={AdminSettings}
                />
              }
            />
            <Route
              path="/admin/student-fees"
              element={
                <AdminProtected adminAuth={adminAuth} Component={AdminFees} />
              }
            />
            <Route
              path="/admin/schedule-classes"
              element={
                <AdminProtected
                  adminAuth={adminAuth}
                  Component={ScheduleClasses}
                />
              }
            />
            <Route
              path="/admin/admin-events"
              element={
                <AdminProtected adminAuth={adminAuth} Component={AdminEvents} />
              }
            />
            <Route
              path="/admin/admin-queries"
              element={
                <AdminProtected
                  adminAuth={adminAuth}
                  Component={AdminQueries}
                />
              }
            />
            <Route
              path="/admin/student-status"
              element={
                <AdminProtected
                  adminAuth={adminAuth}
                  Component={ManageStudentStatus}
                />
              }
            />
            <Route
              path="/admin/schedule-batches"
              element={
                <AdminProtected
                  adminAuth={adminAuth}
                  Component={ScheduleBatches}
                />
              }
            />
            <Route
              path="/admin/monthly-acheivers"
              element={
                <AdminProtected
                  adminAuth={adminAuth}
                  Component={StudentOfTheMonth}
                />
              }
            />
          </Routes>
        </>
      )}

      {/* Instructor Dashboard */}
      {isInstructor && (
        <>
          <InstructorHeader
            updateInstructorAuth={updateInstructorAuth}
            instructorAuth={instructorAuth}
          />
          <Routes>
            <Route
              path="/instructor/instructor-dashboard"
              exact={true}
              element={
                <InstructorProtected
                  Component={InstructorDashboard}
                  instructorAuth={instructorAuth}
                  updateInstructorAuth={updateInstructorAuth}
                />
              }
            />

            <Route
              path="/instructor/profile"
              exact={true}
              element={
                <InstructorProtected
                  Component={InstructorProfile}
                  instructorAuth={instructorAuth}
                  updateInstructorAuth={updateInstructorAuth}
                />
              }
            />
            <Route
              path="/instructor/assignments"
              exact={true}
              element={
                <InstructorProtected
                  Component={InstructorAssignments}
                  instructorAuth={instructorAuth}
                  updateInstructorAuth={updateInstructorAuth}
                />
              }
            />
            <Route
              path="/instructor/instructor-result"
              exact={true}
              element={
                <InstructorProtected
                  Component={InstructorResultList}
                  instructorAuth={instructorAuth}
                  updateInstructorAuth={updateInstructorAuth}
                />
              }
            />
            <Route
              path="/instructor/student-status"
              exact={true}
              element={
                <InstructorProtected
                  Component={StudentStatus}
                  instructorAuth={instructorAuth}
                  updateInstructorAuth={updateInstructorAuth}
                />
              }
            />
          </Routes>
        </>
      )}

      {isAdmin || isStudent || isInstructor ? "" : <Footer />}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default App;