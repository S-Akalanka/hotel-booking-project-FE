import { HotelsSearchListing } from "@/components/HotelsSearchListing";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useDispatch } from "react-redux";
import { setPage, setQuery, setSortBy } from "@/lib/features/searchSlice";
import { Button } from "@/components/ui/button";

export default function HotelsPageContent() {
  const [searchText, setSearchText] = useState("");
  const [sort, setsort] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSortBy(sort));
  }, [sort, dispatch]);

  useEffect(() => {
    dispatch(setPage(currentPage));
  }, [currentPage, dispatch]);

  const handleSearch = () => {
    dispatch(setQuery(searchText));
  };

  return (
    <>
      <div className="py-8 bg-gray-400 pt-30">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="font-playfair text-3xl md:text-4xl mb-4">
            Find Your Perfect Stay
          </h1>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md flex gap-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search hotels, locations..."
                className="pl-10"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button onClick={handleSearch}>Search</Button>
            </div>
            <div className="flex items-center gap-4">
              <Select value={sort} onValueChange={setsort}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>


      <HotelsSearchListing />
      

      {/* Pagination */}
      <div className="m-12 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="cursor-pointer"
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => setCurrentPage(1)}
                isActive={currentPage === 1}
                className="cursor-pointer"
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => setCurrentPage(2)}
                isActive={currentPage === 2}
                className="cursor-pointer"
              >
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => setCurrentPage(3)}
                isActive={currentPage === 3}
                className="cursor-pointer"
              >
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="cursor-pointer"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
