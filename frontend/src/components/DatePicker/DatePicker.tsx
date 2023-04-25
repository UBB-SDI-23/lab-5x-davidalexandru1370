import {
  DatePickerProps,
  DatePicker as Datepicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FC } from "react";

interface IDatePicker {
  onChange?: () => void;
  label: string;
}

const DatePicker: FC<IDatePicker> = ({ onChange, label }) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Datepicker
          format="YYYY-MM-DD"
          label={label}
          sx={textFieldStyle}
          onChange={(e) => {
            onChange && onChange();
          }}
        />
      </LocalizationProvider>
    </>
  );
};

const textFieldStyle = {
  border: "2px solid white",
};
