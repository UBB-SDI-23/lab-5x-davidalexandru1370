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
  defaultValue?: Date;
}

const DatePicker: FC<IDatePicker> = ({
  onChange,
  label,
  defaultValue = "",
}) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Datepicker
          defaultValue={dayjs(defaultValue)}
          format="YYYY-MM-DD"
          label={label}
          sx={textFieldStyle}
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
