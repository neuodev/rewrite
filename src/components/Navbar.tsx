import React from "react";

const Navbar: React.FC<{}> = () => {
  return (
    <div className="flex items-center justify-center h-20 bg-gray-100 shadow-sm">
      <img
        src="/logo192.png"
        alt="logo"
        title="Rewrite"
        className="inline-block mr-4 w-8 h-8 overflow-hidden object-contain"
      />
      <h1 className="text-2xl font-bold">Rewrite</h1>
    </div>
  );
};

export default Navbar;
