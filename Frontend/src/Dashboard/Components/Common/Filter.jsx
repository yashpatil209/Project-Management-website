import React from "react";
import { Dropdown } from "flowbite-react";
import { FaCircle, FaCheckCircle, FaCog } from "react-icons/fa";

const Filter = ({ onSelect }) => {
  const handleSelect = (value) => {
    onSelect(value);
  };

  return (
    <div>
      <Dropdown
        inline
        label={
          <span className="flex items-center justify-center gap-3">
            <i class="bx bx-filter-alt"></i> Filter
          </span>
        }
      >
        <div className="flex p-3 gap-4">
          <div>
            <p className="text-md text-gray-800">Status</p>
            <Dropdown.Item
              className="bg-[#F5F6F8] rounded-md mt-2 gap-2 hover:bg-gray-200 focus:bg-gray-200"
              onClick={() => handleSelect("status Not-Started")}
            >
              <FaCircle style={{ color: "#3384c2" }} />
              Not-Started
            </Dropdown.Item>
            <Dropdown.Item
              className="bg-[#F5F6F8] rounded-md mt-2 gap-2 hover:bg-gray-200 focus:bg-gray-200"
              onClick={() => handleSelect("status In-progress")}
            >
              <FaCircle style={{ color: "#f28b38" }} />
              In-progress
            </Dropdown.Item>
            <Dropdown.Item
              className="bg-[#F5F6F8] rounded-md mt-2 gap-2 hover:bg-gray-200 focus:bg-gray-200"
              onClick={() => handleSelect("status Done")}
            >
              <FaCircle style={{ color: "#1aaa6e" }} />
              Done
            </Dropdown.Item>
          </div>
          <div>
            <p className="text-md text-gray-800">Priority</p>
            <Dropdown.Item
              className="bg-[#F5F6F8] rounded-md mt-2 gap-2 hover:bg-gray-200 focus:bg-gray-200"
              onClick={() => handleSelect("priority Low")}
            >
              <i class="bx bx-chevron-down text-red-600"></i>
              Low
            </Dropdown.Item>
            <Dropdown.Item
              className="bg-[#F5F6F8] rounded-md mt-2 gap-2 hover:bg-gray-200 focus:bg-gray-200"
              onClick={() => handleSelect("priority Medium")}
            >
              <i class="bx bx-chevron-up text-red-600"></i>
              Medium
            </Dropdown.Item>
            <Dropdown.Item
              className="bg-[#F5F6F8] rounded-md mt-2 gap-2 hover:bg-gray-200 focus:bg-gray-200"
              onClick={() => handleSelect("priority High")}
            >
              <i class="bx bx-chevrons-up text-red-600"></i>
              High
            </Dropdown.Item>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};

export default Filter;
