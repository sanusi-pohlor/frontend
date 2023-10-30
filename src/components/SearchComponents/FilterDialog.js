import React, { useState } from "react";
import { Modal, Button, Input, Checkbox } from "antd";

const FilterDialog = ({ open, onClose, handleSubmit, FilterFinish }) => {
  const [filterOptions, setFilterOptions] = useState({
    option1: false,
    option2: false,
  });

  const handleOptionChange = (option) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
  };

  const handleApplyFilters = () => {
    // You can use the selected filter options here
    // For example, pass them to a filtering function
    FilterFinish(filterOptions);
    onClose();
  };

  return (
    <Modal
      title="ตัวกรอง"
      visible={open}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          ยกเลิก
        </Button>,
        <Button key="submit" type="primary" onClick={handleApplyFilters}>
          ตกลง
        </Button>,
      ]}
    >
      <div>
        <h3>เลือกตัวกรอง</h3>
        <Checkbox
          checked={filterOptions.option1}
          onChange={() => handleOptionChange("option1")}
        >
          ตัวกรอง 1
        </Checkbox>
        <Checkbox
          checked={filterOptions.option2}
          onChange={() => handleOptionChange("option2")}
        >
          ตัวกรอง 2
        </Checkbox>
      </div>
    </Modal>
  );
};

export default FilterDialog;
