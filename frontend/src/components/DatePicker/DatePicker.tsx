import { SxProps } from "@mui/material";
import {
  DatePickerProps,
  DatePicker as Datepicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { FC } from "react";

interface IDatePicker {
  onChange?: (e?: unknown) => void;
  label: string;
  sx?: SxProps;
  defaultValue?: Date;
}

const DatePicker: FC<IDatePicker> = ({
  onChange,
  label,
  defaultValue = "",
  sx,
}) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Datepicker
          defaultValue={dayjs(defaultValue)}
          format="YYYY-MM-DD"
          label={label}
          sx={{ ...textFieldStyle, ...sx }}
          onChange={(e) => {
            onChange && onChange(e);
          }}
        />
      </LocalizationProvider>
    </>
  );
};

const textFieldStyle = {
  border: "2px solid white",
};

export default DatePicker;
