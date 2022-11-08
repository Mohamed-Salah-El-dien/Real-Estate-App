import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";

import DefaultImage from "../public/house.jpg";

const Property = ({
  property: {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalID,
  },
}) => {
  return (
    <div className="p-10 m-auto mb-8 flex-col border-[1rem] border-gray-400/40 rounded-lg card">
      <Link href={`/property/${externalID}`} passHref>
        <div className="">
          <Image
            src={coverPhoto ? coverPhoto.url : DefaultImage}
            width={400}
            height={260}
            className="object-cover mb-4 w-full h-[20rem] border-8 border-gray-400/40 shadow-2xl"
          />

          <div>
            <div>
              <div className="flex justify-between mb-4">
                <div>{isVerified && <GoVerified />}</div>
                <p className="border-b-2 border-black">
                  AED {price} {rentFrequency && `/${rentFrequency}`}
                </p>
              </div>

              <div className="flex items-center justify-between mb-4">
                <Image
                  src={agency?.logo?.url}
                  width={100}
                  height={100}
                  className="object-cover w-16 h-12"
                />
                <div className="flex items-center">
                  {rooms}
                  <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft{" "}
                  <BsGridFill />
                </div>
              </div>
            </div>

            <h3>
              {title.length > 60 ? title.substring(0, 60) + "..." : title}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Property;
