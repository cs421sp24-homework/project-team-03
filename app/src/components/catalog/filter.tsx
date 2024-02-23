import { Button } from "@/components/catalog/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/catalog/dropdown-menu";
import { useState } from "react";

const DeckActions = () => {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <DropdownMenu open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex h-8 w-20 p-0 data-[state=open]:bg-muted"
        >
          Filters
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
      <DropdownMenuItem>
            Highest Rating
        </DropdownMenuItem>
        <div className="border-t border-gray-300" style={{ borderWidth: '1px'}}></div>
        <DropdownMenuItem className="text-blue-500">
            Lowest Price
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-blue-500"
        >
          Highest Price
        </DropdownMenuItem>
        <div className="border-t border-gray-300" style={{ borderWidth: '1px'}}></div>
        <DropdownMenuItem className="text-orange-500">
            Lowest Distance
        </DropdownMenuItem>
        <DropdownMenuItem className="text-orange-500">
            Highest Distance
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DeckActions;

// <DotsVerticalIcon className="w-4 h-4" />

/*
     <DropdownMenuTrigger asChild>
        <Button
          className="flex h-8 w-20 p-0 data-[state=open]:bg-muted"
          onClick={() => setEditDialogOpen(true)}
        >
          Filters
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
*/