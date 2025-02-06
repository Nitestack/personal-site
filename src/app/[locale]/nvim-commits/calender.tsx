"use client";

import { useSearchParams } from "next/navigation";
import { type ChangeEvent, type FC } from "react";

import { useRouter } from "@/i18n/routing";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";

const Calender: FC<{ type: "until" | "since" }> = ({ type }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleChange(ev: ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, ev.target.value);
    router.replace("/nvim-commits?" + params.toString());
  }

  return (
    <div className="w-full space-y-1">
      <Label htmlFor={`calender-${type}`}>
        {type[0]?.toUpperCase() + type.slice(1)}
      </Label>
      <Input
        defaultValue={
          searchParams.get(type) ??
          (type === "until" ? new Date().toISOString().split("T")[0] : "")
        }
        id={`calender-${type}`}
        type="date"
        onInput={handleChange}
      />
    </div>
  );
};

export default Calender;
