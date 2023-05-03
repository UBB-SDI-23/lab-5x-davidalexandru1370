import { GenderEnum } from "@/enums/GenderEnum";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
  Theme,
} from "@mui/material";
import React, { FC, useState } from "react";
import { EnumDeclaration, EnumMember, EnumType } from "typescript";

interface IEnumDropDown {
  onChange: (value: string) => void;
  label: string;
  dataEnum: object;
  style?: SxProps;
}

const EnumDropDown: FC<IEnumDropDown> = ({
  onChange,
  label,
  dataEnum,
  style,
}) => {
  const [value, setValue] = useState<string>(label);
  return (
    <div>
      <FormControl sx={style} fullWidth>
        <InputLabel id="select-label">{label}</InputLabel>
        <Select
          labelId="select-label"
          id="simple-select"
          value={0}
          label={label}
          onChange={(val) => {
            const selectedValue: string = val.target.value as string;
            setValue(selectedValue);
            onChange(selectedValue);
          }}
        >
          {Object.values(dataEnum).map((value, index) => {
            if (typeof value === "string") {
              return <MenuItem value={index}>{value}</MenuItem>;
            }
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default EnumDropDown;
