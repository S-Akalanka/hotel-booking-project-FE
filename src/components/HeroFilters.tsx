import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  MapPin,
  Sparkles,
  Calendar as CalendarIcon,
  Users,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Calendar } from "./ui/calendar";
import { Popover } from "./ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useGetAllLocationsQuery } from "@/lib/api";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useDispatch } from "react-redux";
import {
  setCheckIn,
  setCheckOut,
  setGuest,
  setLocation,
} from "@/lib/features/filterSlice";
import { setAiQuery } from "@/lib/features/aiSearchSlice";
import { useUser } from "@clerk/clerk-react";
import GradientText from "@/components/ui/GradientText/GradientText";

const promptFormSchema = z.object({
  prompt: z.string().min(1, {
    message: "Description is required",
  }),
});

const filterFormSchema = z
  .object({
    location: z.string().optional(),
    checkIn: z.date().optional(),
    checkOut: z.date().optional(),
    guest: z.number().optional(),
  })
  .refine(
    (data) => {
      const onlyLocationFilled =
        data.location && !data.checkIn && !data.checkOut && !data.guest;
      const allFilled =
        data.location && data.checkIn && data.checkOut && data.guest;
      return onlyLocationFilled || allFilled;
    },
    {
      message: "Either provide just location or fill all fields",
      path: ["location"],
    }
  );

export default function HeroFilters() {
  const [aiInput, setAiInput] = useState(false);
  const [open, setOpen] = useState(false);
  const { isSignedIn } = useUser();

  const dispatch = useDispatch();

  const {
    data: locations = [],
    // isLoading: isLocationsLoading,
    // isError: isLocationsError,
    // error: locationsError,
  } = useGetAllLocationsQuery(undefined);

  const switchButtonHandler = () => {
    if (!isSignedIn) {
      toast.error("Please sign in to access AI search.");
      return;
    }
    aiInput ? setAiInput(false) : setAiInput(true);
  };

  const aiForm = useForm({
    resolver: zodResolver(promptFormSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const filterForm = useForm({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      location: "",
      checkIn: undefined,
      checkOut: undefined,
      guest: 0,
    },
  });

  function aiOnSubmit(values: any) {
    try {
      console.log(values.prompt);
      dispatch(setAiQuery(values.prompt));
      toast.success("Loading...");
    } catch (error) {
      console.error(error);
      toast.error("Something wrong");
    }
  }

  function filterOnSubmit(values: any) {
    const toastId = toast.loading("Loading...");

    try {
      if (values.location) dispatch(setLocation(values.location));
      if (values.checkIn) dispatch(setCheckIn(values.checkIn.toISOString()));
      if (values.checkOut) dispatch(setCheckOut(values.checkOut.toISOString()));
      if (values.guest) dispatch(setGuest(values.guest));

      toast.success("Filters applied", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
    }
  }

  // common style
  const filter =
    "border-solid border-[0.2px] border-black text-black rounded-[0.5rem] py-7 max-[748px]:py-5 text-[1rem] max-[748px]:text-[0.7rem]";

  return (
    <>
      <Button
        type="button"
        className="ease-in-out text-black transform transition-transform duration-300 hover:scale-103 bg-gradient-to-br from-purple-300 via-white to-purple-100 text-[1.1rem] py-6 w-[140px] max-[748px]:w-[110px] max-[748px]:py-4 max-[748px]:text-[11px] rounded-3xl"
        onClick={switchButtonHandler}
      >
        {aiInput ? (
          <>
            {" "}
            <SlidersHorizontal/> Filters{" "}
          </>
        ) : (
          <>
            {" "}
            <b>
              <Sparkles />
            </b>
            <GradientText
              colors={["#111827", "#273449", "#3730a3", "#4f46e5", "#7c3aed"]}
              animationSpeed={3}
              showBorder={false}
              className="custom-class bg-clip-text bg-transparent"
            >
              <b>AI Search </b>
            </GradientText>
          </>
        )}
      </Button>

      {aiInput ? (
        <Form {...aiForm}>
          <form
            onSubmit={aiForm.handleSubmit(aiOnSubmit, (errors) => {
              if (errors.prompt) {
                toast.error(errors.prompt.message);
              }
            })}
            className="flex gap-3 mx-8"
          >
            <FormField
              control={aiForm.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Prompt"
                      className="w-218 max-[748px]:w-100 max-[748px]:text- py-7 px-8 rounded-4xl border-solid border-[0.2px] flex border-black bg-white dark:bg-black"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="prompt-search-btn transform transition-transform duration-300 hover:scale-103 bg-[var(--search-filter)] hover:bg-[var(--search-filter-hover)] w-28 max-[748px]:w-20 rounded-4xl text-black py-7 text-[1rem]"
            >
              <Search />
              <b>Search</b>
            </Button>
          </form>
        </Form>
      ) : (
        <div>
          <Form {...filterForm}>
            <form
              onSubmit={filterForm.handleSubmit(filterOnSubmit, (errors) => {
                console.log("Validation errors:", errors);
                if (errors.location) {
                  toast.error(errors.location.message);
                }
              })}
              className="flex flex-wrap items-center justify-center gap-2.5 mx-8"
            >
              <FormField
                control={filterForm.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="filters">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          className={`${filter} bg-[var(--location-filter)] hover:bg-[var(--location-filter-hover)] text-[1rem] max-[748px]:text-[0.7rem] w-56 max-[748px]:w-36 `}
                        >
                          <MapPin />
                          {field.value || "Where to ?"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-56 max-h-72 overflow-auto p-0">
                        <Command className="location-dropdown-content rounded-[0.5rem] w-full">
                          <CommandInput
                            placeholder="Search location..."
                            className="px-3"
                          />
                          <CommandGroup>
                            {locations?.map((location: any) => (
                              <CommandItem
                                key={location.name}
                                onSelect={() => {
                                  setOpen(false);
                                  field.onChange(location.name);
                                }}
                                className="location-dropdown text-[1rem] max-[748px]:text-[0.7rem] cursor-pointer py-2 px-3 hover:bg-amber-50 w-full"
                              >
                                {location.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              <FormField
                control={filterForm.control}
                name="checkIn"
                render={({ field }) => (
                  <FormItem>
                    <Popover>
                      <PopoverTrigger
                        className={`${filter} checkIn-btn bg-[var(--checkin-filter)] hover:bg-[var(--checkin-filter-hover)] w-52  max-[748px]:w-34 h-14 max-[748px]:h-10 flex justify-center items-center`}
                      >
                        <CalendarIcon size={15} className="m-2" />
                        {field.value
                          ? field.value.toLocaleDateString()
                          : "Check-in Date"}
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => field.onChange(date)}
                          className="rounded-md border shadow-sm"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              <FormField
                control={filterForm.control}
                name="checkOut"
                render={({ field }) => (
                  <FormItem>
                    <Popover>
                      <PopoverTrigger
                        className={`${filter} checkout-btn bg-[var(--checkout-filter)] hover:bg-[var(--checkout-filter-hover)] w-52 max-[748px]:w-34 h-14 max-[748px]:h-10 flex justify-center items-center`}
                      >
                        <CalendarIcon size={15} className="m-2" />
                        {field.value
                          ? field.value.toLocaleDateString()
                          : "Check-out date"}
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => field.onChange(date)}
                          className="rounded-md border shadow-sm"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              <FormField
                control={filterForm.control}
                name="guest"
                render={({ field }) => (
                  <FormItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          type="button"
                          className={`${filter} guest-btn bg-[var(--guest-filter)] hover:bg-[var(--guest-filter-hover)] w-48 max-[748px]:w-32`}
                        >
                          <Users />
                          {field.value || "Select guests"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className=" bg-[var(--guest-dropdown-content)] flex flex-col items-center rounded-[0.5rem] py-[0.5rem] max-[748px]:py-[0.16rem] w-48 max-[748px]:w-32 text-[1rem] max-[748px]:text-[0.7rem]">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <DropdownMenuItem
                            key={i}
                            onClick={() => field.onChange(i)}
                            className="hover:bg-[var(--guest-dropdown-content-hover)] cursor-pointer py-1 max-[748px]:py-0 text-center w-46 max-[748px]:w-29 rounded-[0.75rem]"
                          >
                            {i == 1
                              ? `${i} Guest`
                              : i === 5
                              ? `${i}+ Guests`
                              : `${i} Guests`}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className={`filter-search ${filter} border-none transform transition-transform duration-300 hover:scale-103 filter-search bg-[var(--search-filter)] hover:bg-[var(--search-filter-hover)] ml-3 w-28 max-[748px]:w-20 rounded-4xl`}
              >
                <Search />
                <b>Search</b>
              </Button>
            </form>
          </Form>
        </div>
      )}

      <Toaster />
    </>
  );
}
