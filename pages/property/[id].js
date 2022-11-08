import React from "react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";

import { baseUrl, fetchApi } from "../../API/fetchApi";
import ImageScrollbar from "../../components/ImageScrollbar";
import Image from "next/image";

const PropertyDetails = ({
  propertyDetails: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  },
}) => {
  return (
    <div className="mt-16">
      {photos && <ImageScrollbar data={photos} />}
      <div className="my-8 p-4">
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Image
                src={agency?.logo?.url}
                width={200}
                height={200}
                className="w-1/4"
              />

              <div>{isVerified && <GoVerified />}</div>
            </div>

            <h2 className="text-2xl text-right font-bold max-sm:text-lg">
              AED {price} {rentFrequency && `/${rentFrequency}`}
            </h2>
          </div>

          <h2 className="flex items-center justify-end">
            {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft{" "}
            <BsGridFill />
          </h2>
        </div>

        {/* description */}

        <div className="my-8 p-2 card">
          <h2 className="text-3xl max-md:text-lg font-bold border-black border-b-2 w-max mb-4">
            {title}
          </h2>
          <h2>{description}</h2>
        </div>

        {/* Type | Purpose | Furnishing */}

        <div className="flex items-center justify-between p-2 my-5">
          <div className="flex-col text-center items-center">
            <h2>Type</h2>
            <h2 className="text-xl font-bold">{type}</h2>
          </div>

          <div className="flex-col text-center items-center">
            <h2>Purpose</h2>
            <h2 className="text-xl font-bold">{purpose}</h2>
          </div>

          {furnishingStatus && (
            <div className="flex-col text-center items-center">
              <h2>Furnishing Status</h2>
              <h2 className="text-xl font-bold">{furnishingStatus}</h2>
            </div>
          )}
        </div>

        {/* Facilites */}

        <div className="card p-2">
          {amenities.length && (
            <h2 className="text-2xl font-bold border-black border-b-2 w-max mb-4">
              Facilites:
            </h2>
          )}
          <div className="flex flex-wrap">
            {amenities?.map((item) =>
              item?.amenities?.map((amenity) => (
                <h2 className="m-4 rounded-md bg-gray-400/40 p-1">
                  {amenity.text}
                </h2>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

  return {
    props: {
      propertyDetails: data,
    },
  };
}
