import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { subDays, addDays } from "date-fns";

export default function Datepicker({ callback,itemObj}) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleChosenDate = (selectedDate) => {
    callback(setAuctionData{...auctionData, endTime: selectedDate.getTime()});
    setSelectedDate(selectedDate);
  };

  return (
    <DatePicker
      showPopperArrow={false}
      selected={selectedDate}
      onChange={handleChosenDate}
      minDate={subDays(new Date(), -1)}
      maxDate={addDays(new Date(), 30)}
      dateFormat="dd/MM yyyy h:mm"
      placeholderText="Select a date"
    />
  );
}
