"use client";
import { FaArrowDown } from "react-icons/fa6";

const ExploreBtn = () => {
  return (
    <button
      type="button"
      id="explore-btn"
      className="mt-7 mx-auto explore-button"
      onClick={() => {}}
    >
      <a href="#events" className="flex justify-between items-center gap-4">
        Explore Events
        <FaArrowDown width={24} height={24} />
      </a>
    </button>
  );
};
export default ExploreBtn;
