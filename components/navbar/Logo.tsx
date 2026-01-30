import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="block shrink-0">
      <Image
        src="/images/logo.png"
        alt="logo"
        width={120}
        height={40}
        priority
        unoptimized
        className="w-auto h-[28px] md:h-[35px]"
      />
    </Link>
  );
};

export default Logo;
