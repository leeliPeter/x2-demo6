import React from "react";
import Image from "next/image";

interface joshuaBallProps {
  size: number;
}

export default function joshuaBall({ size }: joshuaBallProps) {
  return (
    <div className={`relative w-[${size}px] h-[${size}px]`}>
      <div className="absolute inset-0 rounded-full animate-[twinkle_2s_ease-in-out_infinite] bg-transparent" />
      <div className="relative w-full h-full rounded-full shadow-md overflow-hidden z-10">
        <Image
          src="/images/icons/joshsua.svg"
          alt="joshsua"
          width={100}
          height={100}
          className="object-cover"
        />
      </div>
    </div>
  );
}
