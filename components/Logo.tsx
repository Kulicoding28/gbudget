import { PiggyBank } from "lucide-react";
import React from "react";

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2">
      <PiggyBank className="stroke w-11 h-11 stroke-violet-400 stroke-[1.5]" />
      <p className="bg-gradient-to-r from-violet-400 to-purple-500 text-transparent bg-clip-text text-3xl font-bold leading-tight tracking-tighter">
        GbudgetTracker
      </p>
    </a>
  );
}

export function LogoMobile() {
  return (
    <a href="/" className="flex items-center gap-2">
      <p className="bg-gradient-to-r from-violet-400 to-purple-500 text-transparent bg-clip-text text-3xl font-bold leading-tight tracking-tighter">
        GbudgetTracker
      </p>
    </a>
  );
}

export default Logo;
