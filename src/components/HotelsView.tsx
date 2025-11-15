import { useSelector } from "react-redux";
import HotelListing from "./HotelsFilterResults";
import HotelListings from "./HotelListing";

export default function HotelView (){

    const filter = useSelector((state:any) => state.filter);
    const filterForm = {
        location: filter.location,
        checkIn: filter.checkIn,
        checkOut: filter.checkOut,
        guest: filter.guest,
    }

    if (filterForm.location !== "" || (filterForm.checkIn !== "" 
        && filterForm.checkOut !== "" && filterForm.guest !== 0)) {
        return (< HotelListing />)
    }
    else {
        return (< HotelListings />)
    }
}