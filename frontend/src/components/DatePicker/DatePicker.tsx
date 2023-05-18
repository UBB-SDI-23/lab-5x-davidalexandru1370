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
  id?: string;
  defaultValue?: Date;
}

const DatePicker: FC<IDatePicker> = ({
  onChange,
  label,
  id = "",
  defaultValue = "",
  sx,
}) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div id={id}>
          <Datepicker
            defaultValue={dayjs(defaultValue)}
            format="YYYY-MM-DD"
            label={label}
            sx={{ ...textFieldStyle, ...sx }}
            onChange={(e) => {
              onChange && onChange(e);
            }}
          />
        </div>
      </LocalizationProvider>
    </>
  );
};

const textFieldStyle = {
  border: "2px solid white",
};

export default DatePicker;
