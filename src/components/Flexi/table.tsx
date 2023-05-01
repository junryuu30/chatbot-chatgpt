import React, { useState, useEffect, useCallback, useMemo } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

type TableInProps = {
  title: string;
  columns: any;
  useCard: boolean;
  apiUrl: string;
  readonly: boolean;
  targetNew: string;
  targetEdit: string;
  searchSection: any;
};

export default function TableIn({
  title,
  columns,
  useCard,
  apiUrl,
  readonly,
  targetNew,
  targetEdit,
  searchSection,
}: TableInProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");
  //   const [searchValue, setSearchValue] = useState<any[]>([]);

  const fetchData = async (page: number, size: number = perPage) => {
    setLoading(true);

    const response = await axios.get(apiUrl, {
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length",
        Authorization: "Bearer " + localStorage.getItem("flexa_token"),
      },
    });

    setData(response.data.content);
    setTotalRows(response.data.totalElements);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const handlePageChange = (page: number) => {
    fetchData(page);
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    fetchData(page, newPerPage);
    setPerPage(newPerPage);
  };

  const search = async () => {
    setLoading(true);
    const response = await axios.get(apiUrl + "/search?value=" + searchValue, {
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length",
        Authorization: "Bearer " + localStorage.getItem("flexa_token"),
      },
    });

    setData(response.data.content);
    setTotalRows(response.data.totalElements);
    setLoading(false);
  };

  /* 
      Render the UI for your table
      - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
    */
  if (useCard) {
    return (
      <div className="card card-xl-stretch mb-xl-8">
        <div className="card-header border-0 pt-5">
          <h3 className="card-title">List</h3>
          {!readonly ? (
            <div
              className="card-toolbar"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-trigger="hover"
              title="Click to add"
            >
              <a
                href="javascript:void(0)"
                className="btn btn-sm btn-light btn-active-primary"
                data-bs-toggle="modal"
                data-bs-target={targetNew}
              >
                <i className="fa fa-plus"></i>New
              </a>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="card-body py-3">
          {searchSection == "" ? (
            <div className="row mb-12">
              <div className="col-lg-2">
                <label className="form-label col-form-label">Search</label>
              </div>
              <div className="col-lg-6">
                <input
                  className="form-control form-control-solid"
                  name="searchValue"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      search();
                    }
                  }}
                ></input>
              </div>
              <div className="col-lg-4">
                <button
                  className="btn btn-active btn-redwood text-black"
                  onClick={() => {
                    setSearchValue("");
                    fetchData(1);
                  }}
                >
                  <i className="fas fa-remove fs-4 me-2"></i>
                </button>
              </div>
            </div>
          ) : (
            searchSection
          )}
          <div className="table-responsive">
            <DataTable
              title={title}
              columns={columns}
              data={data}
              progressPending={loading}
              pagination
              paginationServer
              paginationTotalRows={totalRows}
              paginationDefaultPage={currentPage}
              onChangeRowsPerPage={handlePerRowsChange}
              onChangePage={handlePageChange}
              selectableRows
              onSelectedRowsChange={({ selectedRows }) =>
                console.log(selectedRows)
              }
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="table-responsive">
        <DataTable
          title={title}
          columns={columns}
          data={data}
          progressPending={loading}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          paginationDefaultPage={currentPage}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          selectableRows
          onSelectedRowsChange={({ selectedRows }) => console.log(selectedRows)}
        />
      </div>
    );
  }
}
