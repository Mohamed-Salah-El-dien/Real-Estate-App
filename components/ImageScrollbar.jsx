import { useContext } from "react";
import Image from "next/image";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <div className="flex justify-center items-center mr-1">
      <FaArrowAltCircleLeft
        onClick={() => scrollPrev()}
        className="text-2xl cursor-pointer"
      />
    </div>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <div className="flex justify-center items-center ml-1">
      <FaArrowAltCircleRight
        onClick={() => scrollNext()}
        className="text-2xl cursor-pointer"
      />
    </div>
  );
};

export default function ImageScrollbar({ data }) {
  return (
    <ScrollMenu
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
      style={{ overflow: "hidden" }}
    >
      {data.map((item) => (
        <div key={item.id} className="w-[910px] p-1 overflow-hidden">
          <Image
            placeholder="blur"
            blurDataURL={item.url}
            src={item.url}
            width={1000}
            height={500}
          />
        </div>
      ))}
    </ScrollMenu>
  );
}
