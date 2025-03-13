import { Dropdown } from "flowbite-react";
import { Users, Trash2 } from "lucide-react";

export default function TeamMembers({ TeamMembers }) {
  return (
    <Dropdown
      label={
        <div className="flex gap-3">
          <Users className="w-5 h-5 text-blue-500" /> {TeamMembers.length}
        </div>
      }
      inline
      arrowIcon={false}
      className="rounded-md"
    >
      {TeamMembers.length > 0 ? (
        TeamMembers.map((member, index) => (
          <Dropdown.Item
            key={index}
            className="flex justify-between items-center gap-5"
          >
            <span>{member}</span>
            <button
              onClick={() => onRemove(member)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </Dropdown.Item>
        ))
      ) : (
        <Dropdown.Item>No team members</Dropdown.Item>
      )}
    </Dropdown>
  );
}
