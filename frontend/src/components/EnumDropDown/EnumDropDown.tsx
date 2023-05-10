import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
} from "@mui/material";
import { FC, useState } from "react";

interface IEnumDropDown {
  onChange: (value: number) => void;
  label: string;
  dataEnum: object;
  style?: SxProps;
  defaultValue?: string;
}

const EnumDropDown: FC<IEnumDropDown> = ({
  onChange,
  label,
  dataEnum,
  style,
  defaultValue,
}) => {
  const [value, setValue] = useState<number>(
    defaultValue === undefined ? 0 : parseInt(defaultValue)
  );
  return (
    <div>
      <FormControl sx={style} fullWidth>
        <InputLabel id="select-label">{label}</InputLabel>
        <Select
          labelId="select-label"
          id="simple-select"
          value={value}
          label={label}
          onChange={(val) => {
            const selectedValue: number = parseInt(val.target.value.toString());
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
