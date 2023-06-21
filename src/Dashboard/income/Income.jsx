import React, { useEffect, Fragment, useState } from "react";
import { Button } from "@material-tailwind/react";
import { Checkbox } from "@material-tailwind/react";
import baseurl from "../../Config";

import { Link } from "react-router-dom";
import AddIncome from "./ModalAddIncome";
import IncomeTable from "./IncomeTable";
import Loader from "../../Components/Loader";
import Expenses from "../expenses/Expenses";

const Income = () => {
  const [product, setProduct] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getIncomeList();
  }, [page]);

  const getIncomeList = () => {
    fetch(baseurl + "/api/income ", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setProduct(result);
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
      const dataskip = product.slice(page === 1 ? 0 : skip - LIMIT, skip);
      setPageData(dataskip);
    }
  }, [product]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <div className="relative mt-5 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-none mx-auto p-5 shadow-lg  h-[100vh] overflow-y-scroll scrollbar-hide bg-[#f5f6fa]">
      {/* Stats */}
      <div className="flex justify-around flex-wrap my-10">
        <div className="m-3 flex items-center w-fit p-5 rounded-lg shadow-xl hover:-translate-y-2 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-12 h-12 mr-3 text-[var(--theme-color)]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
            />
          </svg>
          <div className="">
            <div className="text-[var(--theme-color)] text-3xl">34576</div>
            <div className="text-[var(--secondary-color)] font-semibold">
              Total Expense
            </div>
          </div>
        </div>
        <div className="m-3 flex items-center w-fit p-5 rounded-lg shadow-xl hover:-translate-y-2 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-12 h-12 mr-3 text-[var(--theme-color)]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
            />
          </svg>

          <div className="">
            <div className="text-[var(--theme-color)] text-3xl">71845</div>
            <div className="text-[var(--secondary-color)] font-semibold">
              Total Income
            </div>
          </div>
        </div>
        <div className="m-3 flex items-center w-fit p-5 rounded-lg shadow-xl hover:-translate-y-2 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-12 h-12 mr-3 text-[var(--theme-color)]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <div className="">
            <div className="text-[var(--theme-color)] text-3xl">23000</div>
            <div className="text-[var(--secondary-color)] font-semibold">
              Total Revenue
            </div>
          </div>
        </div>
      </div>
      {/* Incomes */}
      <div className=" flex flex-col sm:flex-row justify-between items-center">
        <h2 className="text-2xl font-bold text-[var(--secondary-color)] text-center sm:text-start ">
          Incomes
        </h2>
        {/* Students */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center">
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
            + Add Income
          </Button>
        </div>
      </div>
      <AddIncome
        open={open}
        handleOpen={handleOpen}
        getIncomeList={getIncomeList}
      />

      {/* Income Table */}
      <div className="my-10">
        <div className="">
          {loader ? (
            <div className="w-full h-[90vh] flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-md text-[var(--secondary-color)] uppercase bg-gray-50 border-b">
                <tr>
                  <th scope="col" className=" py-3">
                    <Checkbox />
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3 hidden  md:table-cell">
                    Income Head
                  </th>
                  <th scope="col" className="px-6 py-3 hidden lg:table-cell ">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 hidden sm:table-cell">
                    Invoice Number
                  </th>
                  <th scope="col" className="px-6 py-3 hidden md:table-cell ">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 hidden lg:table-cell ">
                    Receipt
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-1 py-3">
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
                {/* Dummy Data Ends Here */}
                {pageData.map((item) => {
                  if (
                    item.desc
                      .toLowerCase()
                      .includes(search.trim().toLowerCase())
                  ) {
                    return (
                      <IncomeTable item={item} getIncomeList={getIncomeList} />
                    );
                  }
                })}
              </tbody>
            </table>
          )}

          <div>
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

      {/* Expenses Table */}
      <Expenses />
    </div>
  );
};

export default Income;
