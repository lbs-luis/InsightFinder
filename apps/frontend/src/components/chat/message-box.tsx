"use client";

import { cn } from "@/src/utils/cn";
import * as React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "../ui/input-group";
import { Textarea } from "../ui/textarea";

interface MessageBoxProps {
  className?: string;
  action: () => void;
  placeholder: string;
  disabled: boolean;
}

export const MessageBox = React.forwardRef<
  HTMLTextAreaElement,
  MessageBoxProps
>(({ action, className, disabled, placeholder }, ref) => {
  return (
    <InputGroup className={cn(className)}>
      <Textarea
        ref={ref}
        data-slot="input-group-control"
        className="flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none text-white md:text-sm border-none focus-visible:ring-[0px] shadow-none"
        placeholder={placeholder}
        disabled={disabled}
      />
      <InputGroupAddon align="block-end">
        <InputGroupButton
          className="ml-auto"
          size="sm"
          variant="secondary"
          onClick={action}
          disabled={disabled}
        >
          Enviar
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
});
MessageBox.displayName = "MessageBox";
