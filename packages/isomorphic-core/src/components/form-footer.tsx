"use client";

import { Button } from "rizzui";
import cn from "../utils/class-names";

interface FormFooterProps {
  className?: string;
  altBtnText?: string;
  submitBtnText?: string;
  isLoading?: boolean;
  handleAltBtn?: () => void;
  deleteBtn?: boolean;
  handleDelete?: () => void;
}

export const negMargin = "-mx-4 md:-mx-5 lg:-mx-6 3xl:-mx-8 4xl:-mx-10";

export default function FormFooter({
  isLoading,
  altBtnText = "Save as Draft",
  submitBtnText = "Submit",
  className,
  handleAltBtn,
  deleteBtn = false,
  handleDelete,
}: FormFooterProps) {
  return (
    <div
      className={cn(
        "sticky bottom-0 left-0 right-0 z-10 -mb-8 flex items-center justify-end gap-4 border-t bg-white px-4 py-4 md:px-5 lg:px-6 3xl:px-8 4xl:px-10 dark:bg-gray-50",
        className,
        negMargin
      )}
    >
      {deleteBtn && (
        <Button
          variant="solid"
          className="w-full @xl:w-auto bg-[#2E8074] hover:bg-[#25675E] text-white"
          onClick={handleDelete}
          disabled={isLoading}
        >
          Yes
        </Button>
      )}

      <Button
        variant="outline"
        className="w-full @xl:w-auto"
        onClick={handleAltBtn}
        disabled={isLoading}
      >
        {altBtnText}
      </Button>

      <Button
        type="submit"
        isLoading={isLoading}
        className="w-full @xl:w-auto flex items-center justify-center gap-2 bg-[#2E8074] hover:bg-[#25675E] text-white transition-all duration-200 data-[loading=true]:cursor-not-allowed data-[loading=true]:opacity-90"
      >
        {/* Spinner kecil di dalam tombol */}
        {isLoading && (
          <span className="inline-block h-4 w-4 border-[2px] border-[#C8E9E3] border-t-white rounded-full animate-spin" />
        )}
        <span>{isLoading ? "Processing..." : submitBtnText}</span>
      </Button>
    </div>
  );
}
