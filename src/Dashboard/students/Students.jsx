import React, { useEffect, Fragment, useState } from "react";
import { Button } from "@material-tailwind/react";
import AddStudent from "./AddStudent";
import { Checkbox } from "@material-tailwind/react";
import baseurl from "../../Config";
import Student from "./Student";
import Loader from "../../Components/Loader";
import { CSVLink } from "react-csv";

const Students = () => {
  const [product, setProduct] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [filterBy, setFilterBy] = useState("all");
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    getStudentList(filterBy);
  }, [page, open, filterBy]);


  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedPageData = pageData.map((item) => ({
      ...item,
      selected: !selectAll,
    }));
    setPageData(updatedPageData);
  };

  const handleRowSelect = (index) => {
    const updatedPageData = [...pageData];
    updatedPageData[index].selected = !updatedPageData[index].selected;
    setPageData(updatedPageData);

    const allSelected = updatedPageData.every((item) => item.selected);
    setSelectAll(allSelected);
  };

  const getStudentList = (filterby) => {
    fetch(baseurl + "/api/students ", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        // setStudentsData(result);
        if (filterBy === "all") {
          setProduct(result);
        } else {
          let filteredData = result.filter(
            (student) => student.status == filterBy
          );
          setProduct(filteredData);
        }
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //handle Next
  const handleNext = () => {
    if (page === pageCount) return page;
    setPage(page + 1);
  };
  //handlePrevious
  const handlePrevious = () => {
    if (page === 1) return page;
    setPage(page - 1);
  };
  //console.log(pageCount)

  useEffect(() => {
    const pagedatacount = Math.ceil(product.length / 5);
    setPageCount(pagedatacount);

    if (page) {
      const LIMIT = 5;
      const skip = LIMIT * page;

      // Sort the product data by name in alphabetical order
      const sortedData = [...product].sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      const dataskip = sortedData.slice(
        page === 1 ? 0 : skip - LIMIT,
        skip
      );

      setPageData(dataskip);
    }
  }, [product, page]);


  return (
    <>
      <div className="mt-5 p-5 ml-auto  bg-[#f5f6fa]">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h2 className="text-2xl font-bold text-[var(--secondary-color)] ">
            Students
          </h2>
          {/* Students */}
          <div className="flex items-center flex-col sm:flex-row">
            <div className="flex items-center">
              <div className="text-[var(--secondary-color)]">
                Filter By Status
              </div>{" "}
              <div>
                <select
                  name="filter"
                  id="filter"
                  value={filterBy}
                  onChange={(e) => {
                    setFilterBy(e.target.value);
                    setLoader(true);
                  }}
                  className="w-32 p-2 mx-2"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="absconded">Break</option>
                </select>
              </div>
            </div>
            <div className=" w-48 mx-2">
              <div className="relative flex w-full flex-wrap items-stretch">
                <input
                  type="textarea"
                  className="relative m-0 block w-[1%] min-w-0 pl-2 pr-8 py-2  flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-[var(--theme-color)] focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                  placeholder="Search by name"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                />
                <div
                  className=" absolute bottom-1 right-1 input-group-text flex items-center whitespace-nowrap rounded px-1 py-1.5 text-center text-base font-normal text-neutral-700  cursor-pointer"
                  id="basic-addon2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <Button onClick={handleOpen} className="h-fit">
              + Add Student
            </Button>
            <Button className="h-fit ml-1">
              <CSVLink data={pageData} filename={"enquiries.csv"}>
                Download CSV
              </CSVLink>
            </Button>
            <AddStudent open={open} handleOpen={handleOpen} />
          </div>
        </div>

        {/* Student Table */}
        <div className="my-10">
          <div className=" ">
            {loader ? (
              <div className="w-full h-[90vh] flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              <div className="relative overflow-x-scroll">
                <table className=" w-full text-sm text-left text-gray-500 ">
                  <thead className="text-md text-[var(--secondary-color)] uppercase bg-gray-50 border-b">
                    <tr>
                      <th scope="col" className="">
                        <Checkbox
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th scope="col" className="">
                        Sr. No.
                      </th>
                      <th scope="col" className="">
                        Student
                      </th>
                      <th scope="col" className="">
                        Reg. No.
                      </th>
                      <th scope="col" className="">
                        Course
                      </th>
                      <th scope="col" className="">
                        Father Name
                      </th>
                      <th scope="col" className="">
                        Address
                      </th>
                      <th scope="col" className="">
                        Contact
                      </th>
                      <th scope="col" className="">
                        Gender
                      </th>
                      <th scope="col" className="">
                        DOB
                      </th>
                      <th scope="col" className="">
                        Admission Date
                      </th>
                      <th scope="col" className="">
                        Library
                      </th>
                      <th scope="col" className="">
                        Shift
                      </th>
                      <th scope="col" className="">
                        Status
                      </th>
                      <th scope="col" className="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                          />
                        </svg>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {console.log(pageData)}
                    {/* Dummy Data Ends Here */}
                    {pageData.map((item, index) => {
                      if (
                        item.name
                          .toLowerCase()
                          .includes(search.trim().toLowerCase())
                      ) {
                        return (
                          <Student
                            index={index}
                            item={item}
                            key={item._id}
                            getStudentList={getStudentList}
                            handleRowSelect={() => handleRowSelect(index)}
                            checked={selectAll}
                          />
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex justify-end">
              <nav aria-label="Page navigation example">
                <ul className="pagination flex space-x-5 border w-fit px-2 py-1 mx-5 mt-5">
                  <li className="page-item">
                    <a
                      className="page-link"
                      sty
                      href="#"
                      aria-label="Previous"
                      onClick={handlePrevious}
                      disabled={page === 1}
                    >
                      <span
                        aria-hidden="true"
                        className="border px-2 py-1 shadow-xl rounded-lg"
                      >
                        &laquo;
                      </span>
                      <span className="sr-only">Previous</span>
                    </a>
                  </li>
                  {Array(pageCount)
                    .fill(null)
                    .map((ele, index) => {
                      return (
                        <li className="page-item">
                          <a
                            className="page-link"
                            href="#"
                            active={page === index + 1 ? true : false}
                            onClick={() => {
                              setPage(index + 1);
                            }}
                          >
                            {index + 1}
                          </a>
                        </li>
                      );
                    })}
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Next"
                      onClick={handleNext}
                      disabled={page === pageCount}
                    >
                      <span
                        aria-hidden="true"
                        className="border px-2 py-1 shadow-xl rounded-lg"
                      >
                        &raquo;
                      </span>
                      <span className="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="bg-[var(--theme-color)]">
        <h1 className="font-extrabold text-sm text-center text-white px-2 py-3">
          &#169; 2023 SMS Education | All Rights Reserved
        </h1>
      </div>
    </>
  );
};

export default Students;
