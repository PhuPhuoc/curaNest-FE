import React, { useState, useMemo } from "react";
import { Input, Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";
import { Selection } from "@react-types/shared";

const NavBarNurse = () => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  const categories = useMemo(() => [
    {
      category: "Sức khỏe",
      options: ["Option 1", "Option 2", "Option 3"],
    },
    {
      category: "Khả năng làm việc",
      options: ["Option 4", "Option 5"],
    },
    {
      category: "Kinh nghiệm",
      options: ["Option 6", "Option 7", "Option 8"],
    },
  ], []);

  const allOptions = useMemo(() => 
    categories.flatMap(category => 
      category.options.map(option => ({
        key: option,
        label: option,
        category: category.category
      }))
    ),
    [categories]
  );

  const groupedOptions = useMemo(() => 
    allOptions.reduce((acc, option) => {
      if (!acc[option.category]) {
        acc[option.category] = [];
      }
      acc[option.category].push(option);
      return acc;
    }, {} as Record<string, typeof allOptions>),
    [allOptions]
  );

  return (
    <div className="max-w-md mx-auto p-4">
      <Input
        placeholder="Search..."
        className="mb-4"
         variant="bordered"
      />

      <Listbox
        aria-label="Multiple selection example"
        variant="flat"
        disallowEmptySelection={false}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        className="max-h-[400px] overflow-y-auto"
        itemClasses={{
          base: "text-base py-2",
          title: "font-semibold text-lg",
        }}
        classNames={{
          list: "gap-1",
        }}
      >
        {Object.entries(groupedOptions).map(([category, options]) => (
          <ListboxSection key={category} title={category} className="text-xl font-bold">
            {options.map((option) => (
              <ListboxItem key={option.key} textValue={option.label} className="text-base" classNames={{selectedIcon: "text-primary"}}>
                {option.label}
              </ListboxItem>
            ))}
          </ListboxSection>
        ))}
      </Listbox>
    </div>
  );
};

export default NavBarNurse;