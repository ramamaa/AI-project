import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MessageCircle } from "lucide-react";
import { Gemini } from "./Gemini";
type ChatBotProps = {
  className: string;
};

export const ChatBot = ({ className }: ChatBotProps) => {
  return (
    <div className={className}>
      <Popover>
        <PopoverTrigger className="w-12 h-12 rounded-full bg-primary flex justify-center items-center">
          <MessageCircle className="text-white " />
        </PopoverTrigger>
        <PopoverContent>
          <Gemini />
        </PopoverContent>
      </Popover>
    </div>
  );
};
