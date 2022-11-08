import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MdCancel } from "react-icons/md";
import Image from "next/image";

import { filterData, getFilterValues } from "../API/filterData";
import { baseUrl, fetchApi } from "../API/fetchApi";
import noresult from "../public/noresult.svg";
import Loading from "./Loading";

export default function SearchFilters() {
  const [filters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationData, setLocationData] = useState();
  const [showLocations, setShowLocations] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filterValues);

    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });

    router.push({ pathname: path, query: query });
  };

  useEffect(() => {
    if (searchTerm !== "") {
      const fetchData = async () => {
        setLoading(true);
        const data = await fetchApi(
          `${baseUrl}/auto-complete?query=${searchTerm}`
        );
        setLoading(false);
        setLocationData(data?.hits);
      };

      fetchData();
    }
  }, [searchTerm]);

  return (
    <div className="my-8">
      <div className="flex flex-wrap items-center justify-center mb-8">
        {filters?.map((filter) => (
          <div key={filter.queryName} className=" m-4 flex-col text-center">
            <h3>{filter.placeholder}</h3>

            <select
              className="border-[1px] rounded-lg bg-gray-400/40"
              onChange={(e) =>
                searchProperties({ [filter.queryName]: e.target.value })
              }
            >
              {filter?.items?.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="m-auto">
        <button
          onClick={() => setShowLocations(!showLocations)}
          className=" w-1/5 mb-8 flex justify-center m-auto border-2 rounded-lg transition-all hover:bg-gray-400/40"
        >
          Search Location
        </button>
        {showLocations && (
          <div className="m-auto text-center w-max">
            <div className="flex m-auto items-center justify-center">
              <input
                className="border-2 p-1 rounded-md"
                type="text"
                placeholder="Type Here"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {searchTerm !== "" && (
                <MdCancel onClick={() => setSearchTerm("")} />
              )}
            </div>

            {loading && (
              <div className="absolute top-1/2 left-1/2">
                <Loading />
              </div>
            )}

            {showLocations && searchTerm && (
              <div>
                {locationData?.map((location) => (
                  <div
                    key={location.id}
                    className="border-b-2 border-black hover:bg-gray-400/40 cursor-pointer"
                    onClick={() => {
                      searchProperties({
                        locationExternalIDs: location.externalID,
                      });
                      setShowLocations(false);
                      setSearchTerm(location.name);
                    }}
                  >
                    <h2>{location.name}</h2>
                  </div>
                ))}

                {!loading && !locationData?.length && (
                  <div>
                    <Image src={noresult} />
                    <h4>Waiting to search!</h4>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
