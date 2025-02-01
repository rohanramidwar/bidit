import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Ellipsis, StopCircle, Trash2 } from "lucide-react";

const ManageAuction = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button size={"sm"} variant={"teal"}>
            <Ellipsis />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="px-0">
          <div className="grid gap-4">
            <div>
              <h4 className="text-center text-sm font-medium text-teal-900">
                Manage auction
              </h4>
            </div>
            <div>
              <Button
                className="flex justify-start w-full rounded-none font-normal"
                variant="ghost"
              >
                <StopCircle /> End auction
              </Button>

              <Button
                className="flex justify-start w-full rounded-none font-normal"
                variant="ghost"
              >
                <Trash2 /> Delete auction
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ManageAuction;
