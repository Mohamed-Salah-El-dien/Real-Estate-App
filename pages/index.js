import Link from "next/link";
import Image from "next/image";

import Property from "../components/Property";
import { baseUrl, fetchApi } from "../API/fetchApi";
import buy from "../public/buy.jpg";
import rent from "../public/rent.jpg";

const Home = ({ propertiesForSale, propertiesForRent }) => (
  <div className="flex w-full max-md:flex-col">
    {/*Left Side*/}
    <div className="w-1/2 max-md:w-full blur-sm hover:blur-0 max-md:blur-0 border-r-4 ">
      <div className="h-[30rem] absolute top-0 w-full">
        <Image
          src={rent}
          width={700}
          height={200}
          className="object-cover w-full h-[30rem] absolute z-[-1] "
        />

        <div className="m-auto w-max mt-[12rem] backdrop-blur-md rounded-md p-2 text-center ">
          <h2 className="text-3xl font-bold mb-2">RENT A HOME</h2>

          <h2 className="text-xl ">
            Explore from Apartments, builder floors, villas
            <br />
            and more
          </h2>

          <button className="border-black mt-2 text-lg border-b-2 hover:border-white">
            <Link href="/search?purpose=for-rent">Explore Renting</Link>
          </button>
        </div>
      </div>

      {/* /////////////////////////////////////////////// */}
      {/* preview */}
      <div className="mt-[30rem] p-10">
        {propertiesForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </div>
    </div>

    {/* ////////////////////////////////////////////////// */}
    {/* ////////////////////////////////////////////////// */}
    {/* ////////////////////////////////////////////////// */}

    {/*Right Side*/}
    <div className="w-1/2 max-md:w-full blur-sm hover:blur-0 max-md:blur-0 border-l-4">
      <div className="h-[30rem] absolute top-0 w-full">
        <Image
          src={buy}
          width={700}
          height={200}
          className="object-cover w-full h-[30rem] absolute z-[-1]"
        />

        <div className="m-auto w-max mt-[12rem] backdrop-blur-md rounded-md p-2 text-center ">
          <h2 className="text-3xl font-bold mb-2 ">BUY A HOME</h2>

          <h2 className="text-xl">
            Explore from Apartments, land, builder floors, villas
            <br />
            and more
          </h2>

          <button className="border-black mt-2 text-lg border-b-2 hover:border-white">
            <Link href="/search?purpose=for-sale">Explore Buying</Link>
          </button>
        </div>
      </div>

      {/* ////////////////////////////////////////////////////// */}
      {/* preview */}
      <div className="mt-[30rem] p-10">
        {propertiesForSale.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </div>
    </div>
  </div>
);

export async function getStaticProps() {
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}

export default Home;
