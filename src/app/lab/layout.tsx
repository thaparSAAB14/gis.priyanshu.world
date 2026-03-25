import React from "react";

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    // Implements the isolated styling namespace for all lab sub-routes without 
    // permanently altering the global <body> tag for other layouts. Note the 
    // application of `bg-background text-foreground min-h-screen` natively 
    // forces Tailwind to recalculate against the inline `.lab-theme` scope.
    <div className="lab-theme min-h-screen w-full bg-background text-foreground font-sans transition-colors duration-300">
      {children}
    </div>
  );
}
