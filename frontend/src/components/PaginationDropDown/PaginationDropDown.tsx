import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FC, useState } from "react";

interface IPaginationDropDown {
  handleOnChange: (value: number) => void;
  take?: string;
}

const PaginationDropDown: FC<IPaginationDropDown> = ({
  handleOnChange,
  take,
}) => {
  const [value, setValue] = useState<string>(take === undefined ? "12" : take);
  return (
    <FormControl>
      <InputLabel id="pagination-per-page">Elements per page</InputLabel>
      <Select
        labelId="pagination-per-page"
        value={value}
        label="Elements"
        onChange={(e) => {
          setValue(e.target.value);
          handleOnChange(parseInt(e.target.value.toString()));
        }}
      >
        <MenuItem value={"12"}>12 elements per page</MenuItem>
        <MenuItem value={"20"}>20 elements per page</MenuItem>
        <MenuItem value={"40"}>40 elements per page</MenuItem>
      </Select>
    </FormControl>
  );
};

export default PaginationDropDown;
