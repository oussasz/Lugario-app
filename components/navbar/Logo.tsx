import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="hidden md:block">
      <Image
        src="/images/logo.png"
        alt="logo"
        width={120}
        height={40}
        priority
        unoptimized
        style={{ width: "auto", height: "35px" }}
      />
    </Link>
  );
};

export default Logo;