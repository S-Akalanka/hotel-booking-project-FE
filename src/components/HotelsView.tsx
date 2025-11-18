import { useSelector } from "react-redux";
import FilteredHotelListing from "./FilteredHotelListing";
import MainHotelListing from "./MainHotelListing";
import AiHotelListings from "./AiHotelListings";

export default function HotelView() {
  const filter = useSelector((state: any) => state.filter);
  const query = useSelector((state: any) => state.aiSearch.query);

  const filterForm = {
    location: filter.location,
    checkIn: filter.checkIn,
    checkOut: filter.checkOut,
    guest: filter.guest,
  };

  if (query == "") {
    if (
      filterForm.location !== "" ||
      (filterForm.checkIn !== "" &&
        filterForm.checkOut !== "" &&
        filterForm.guest !== 0)
    ) {
      return <FilteredHotelListing />;
    } else {
      return <MainHotelListing />;
    }
  } else {
    return <AiHotelListings />;
  }
}
