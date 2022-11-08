import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { BsFilter } from "react-icons/bs";

import Property from "../components/Property";
import SearchFilters from "../components/SearchFilters";
import { baseUrl, fetchApi } from "../API/fetchApi";
import noresult from "../public/noresult.svg";

const Search = ({ properties }) => {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();

  return (
    <div className="flex-col mt-16 p-5">
      <div
        onClick={() => setSearchFilters(!searchFilters)}
        className=" w-1/5 cursor-pointer flex justify-center items-center m-auto border-2 rounded-lg transition-all hover:bg-gray-400/40"
      >
        <h1 className="text-center">Search Property By Filters</h1>
        <BsFilter />
      </div>

      {searchFilters && <SearchFilters />}

      <h2>Properties {router.query.purpose}</h2>

      <div>
        {properties.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </div>

      {properties.length === 0 && (
        <div>
          <Image src={noresult} />
          <h3>No Result Found.</h3>
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || "for-rent";
  const rentFrequency = query.rentFrequency || "yearly";
  const minPrice = query.minPrice || "0";
  const maxPrice = query.maxPrice || "1000000";
  const roomsMin = query.roomsMin || "0";
  const bathsMin = query.bathsMin || "0";
  const sort = query.sort || "price-desc";
  const areaMax = query.areaMax || "35000";
  const locationExternalIDs = query.locationExternalIDs || "5002";
  const categoryExternalID = query.categoryExternalID || "4";

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
}

export default Search;
