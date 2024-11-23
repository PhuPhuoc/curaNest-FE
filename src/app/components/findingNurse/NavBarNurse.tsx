import React, { useState, useMemo } from "react";
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";
import { Selection } from "@react-types/shared";
import { Typography } from "antd";
const { Title } = Typography;

const NavBarNurse = () => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  const categories = useMemo(
    () => [
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
    ],
    []
  );

  const allOptions = useMemo(
    () =>
      categories.flatMap((category) =>
        category.options.map((option) => ({
          key: option,
          label: option,
          category: category.category,
        }))
      ),
    [categories]
  );

  const groupedOptions = useMemo(
    () =>
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
      <div className="w-full text-center">
        <Title level={2} style={{ fontSize: "36px",fontFamily:"monospace" }}>
          Tìm theo kĩ năng
        </Title>
      </div>
      <Listbox
        aria-label="Multiple selection example"
        variant="flat"
        disallowEmptySelection={false}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        className="max-h-[750px] overflow-y-auto text-lg"
        itemClasses={{
          base: "py-4 text-lg", // Tăng padding và cỡ chữ
          title: "font-bold text-xl", // Cỡ chữ tiêu đề mục
        }}
        classNames={{
          list: "gap-2",
        }}
      >
        {Object.entries(groupedOptions).map(([category, options]) => (
          <ListboxSection
            key={category}
            title={category}
            className="text-2xl font-extrabold mb-2"
          >
            {options.map((option) => (
              <ListboxItem
                key={option.key}
                textValue={option.label}
                className="text-xl" // Tăng cỡ chữ từng mục
                classNames={{ selectedIcon: "text-primary" }}
              >
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
