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
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { useSearchHotelsQuery } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function HotelsPageContent() {
  const [inputText, setInputText] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setsort] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);

  const search = useSelector((state: any) => state.search);
  const filters = {
    query: query,
    sortBy: sort,
    page: currentPage,
    maxPrice: search.maxPrice,
    minPrice: search.minPrice,
    rating: search.rating,
    amenities: search.amenities,
  };

  const { data, isLoading, isError, error, refetch } = useSearchHotelsQuery(filters);

  const hotels = data?.hotels ?? [];
  const totalResults = data?.totalResults ?? 0;
  const totalPages = Math.ceil(totalResults / 7);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    query,
    sort,
    search.maxPrice,
    search.minPrice,
    search.rating,
    search.amenities,
  ]);

  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  useEffect(() => {
    const bgImage = new Image();
    bgImage.onload = () => setBackgroundLoaded(true);
    bgImage.src = "https://images.unsplash.com/photo-1594896733292-9a77b5809c63?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  }, []);

  return (
    <>
      <div className="hotels-background py-8 pt-36 relative">
        {!backgroundLoaded && (
          <Skeleton className="absolute inset-0 w-full h-full bg-black/30" />
        )}
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl mb-4 font-sans text-white">
            Find Your Perfect Stay
          </h1>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md flex gap-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
              <Input
                placeholder="Search hotels, locations..."
                className="pl-10 bg-black/20 dark:bg-black/50 text-white placeholder:text-white"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <Button
                className="bg-gradient-to-bl from-yellow-600/80 via-yellow-400/80 to-white/80 rounded-2xl text-black hover:bg-yellow-300/40 transform transition-transform duration-300 hover:scale-103 ease-in-out"
                onClick={() => setQuery(inputText)}
              >
                Search
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Select value={sort} onValueChange={setsort}>
                <SelectTrigger className="w-48 text-white bg-black/20 dark:bg-black/50">
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

      <HotelsSearchListing 
        hotels={hotels} 
        isLoading={isLoading} 
        isError={isError}
        error={error}
        onRetry={() => refetch()}
      />

      {/* Pagination */}
      <div className="m-12 flex justify-center bg-transparent">
        <Pagination>
          <PaginationContent>
            {currentPage <= 1 ? null : (
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="cursor-pointer"
                />
              </PaginationItem>
            )}

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {currentPage >= totalPages ? null : (
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="cursor-pointer"
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
