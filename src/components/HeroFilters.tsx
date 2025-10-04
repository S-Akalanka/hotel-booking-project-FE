import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { DevTool } from "@hookform/devtools";
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

const promptFormSchema = z.object({
  prompt: z.string().min(1, {
    message: "Description is required",
  }),
});

const filterFormSchema = z.object({
  location: z.string().min(1, {
    message: "Location is required",
  }),
  checkIn: z.date().min(1, {
    message: "Check in date is required",
  }),
  checkOut: z.date().min(1, {
    message: "Check out date is required",
  }),
  guest: z.number().min(1, {
    message: "No. guest is required",
  }),
});

export default function HeroFilters() {
  const [aiInput, setAiInput] = useState(true);

  const aiSearchBtnHandler = () => {
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
      toast.success("Loading...");
    } catch (error) {
      console.error(error);
      toast.error("Something wrong");
    }
  }

  return (
    <>
      <div className="text-white">
        <Button type="button" className="" onClick={aiSearchBtnHandler}>
          <Sparkles /> AI Search
        </Button>
      </div>

      {aiInput ? (
        <Form {...aiForm}>
          <form
            onSubmit={aiForm.handleSubmit(aiOnSubmit, (errors) => {
              if (errors.prompt) {
                toast.error(errors.prompt.message);
              }
            })}
            className=""
          >
            <FormField
              control={aiForm.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Prompt" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit">Search</Button>
            <DevTool control={aiForm.control} />
          </form>
        </Form>
      ) : (
        <div>
          <Form {...filterForm}>
            <form className="flex gap-10">
              <FormField
                control={filterForm.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button type="button">
                          {field.value || "Select location"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {["Tokyo", "Osaka", "Nagoya"].map((city) => (
                          <DropdownMenuItem
                            key={city}
                            onClick={() => field.onChange(city)}
                          >
                            {city}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormItem>
                )}
              />

              <FormField
                control={filterForm.control}
                name="checkIn"
                render={({ field }) => (
                  <FormItem>
                    <Popover>
                      <PopoverTrigger>
                        <Button type="button">
                          {field.value
                            ? field.value.toLocaleDateString()
                            : "Select the date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => field.onChange(date)}
                          className="rounded-lg border bg-black "
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
                      <PopoverTrigger>
                        <Button type="button">
                          {field.value
                            ? field.value.toLocaleDateString()
                            : "Select the date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => field.onChange(date)}
                          className="rounded-lg border bg-black "
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
                        <Button type="button">
                          {field.value || "Select guests"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {[1, 2, 3].map((city) => (
                          <DropdownMenuItem
                            key={city}
                            onClick={() => field.onChange(city)}
                          >
                            {city}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormItem>
                )}
              />

              <Button type="submit">Search</Button>

              <DevTool control={filterForm.control} />
            </form>
          </Form>
        </div>
      )}

      <Toaster />
    </>
  );
}
