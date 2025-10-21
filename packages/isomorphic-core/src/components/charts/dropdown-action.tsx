"use client";

import { useState, useRef, useEffect } from "react";
import cn from "../../utils/class-names";
import { PiCalendarBlank, PiCaretDownBold } from "react-icons/pi";

type Option = { value: string; label: string };

type DropdownActionProps = {
  options: Option[];
  onChange: (value: string) => void;
  defaultValue?: string;
  className?: string;
  dropdownClassName?: string;
  selectClassName?: string;
  prefixIconClassName?: string;
  suffixIconClassName?: string;
};

export default function DropdownAction({
  options,
  onChange,
  defaultValue,
  className,
  dropdownClassName,
  selectClassName,
  prefixIconClassName,
  suffixIconClassName,
}: DropdownActionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    options.find((o) => o.value === defaultValue) || options[0]
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(option: Option) {
    setSelected(option);
    onChange(option.value);
    setIsOpen(false);
  }

  return (
    <div className={cn("relative inline-block", className)} ref={dropdownRef}>
      <button
        type="button"
        className={cn(
          "flex items-center justify-between border rounded px-3 py-1 h-8 cursor-pointer bg-white dark:bg-gray-800",
          selectClassName
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-1">
          <PiCalendarBlank
            className={cn("h-5 w-5 text-gray-500", prefixIconClassName)}
          />
          <span>{selected.label}</span>
        </div>
        <PiCaretDownBold
          className={cn("h-3 w-3 ml-2 transition-transform", {
            "rotate-180": isOpen,
            [suffixIconClassName || ""]: !!suffixIconClassName,
          })}
        />
      </button>

      {isOpen && (
        <ul
          className={cn(
            "absolute mt-1 w-full rounded-md border bg-white dark:bg-gray-800 shadow-lg z-50 max-h-60 overflow-auto py-1",
            dropdownClassName
          )}
        >
          {options.map((option) => (
            <li
              key={option.value}
              className={cn(
                "px-3 py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700",
                option.value === selected.value ? "font-semibold" : ""
              )}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
