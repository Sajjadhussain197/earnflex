"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function HeaderPanel() {
  const router = useRouter();
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSelected(window.location.pathname);
    }
  }, []); 

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleButtonClick = (path: string) => {
    if (isMounted) {
      router.push(path);
      setSelected(path);
    }
  };

  return (
    <div className="flex items-center justify-between border-b p-4">
      <div className="flex items-center gap-4">
        <div className="flex bg-white h-11 w-40 rounded-full border border-gray-500 ">
          <button
            className={`rounded-l-full h-full w-1/2 ${selected === '/user-list' ? 'bg-gradient-to-b from-emerald-600 to-emerald-400' : ''}`}
            onClick={() => handleButtonClick('/user-list')}
          >
            User List
          </button>
          <button
            className={`rounded-r-full h-full w-1/2 ${selected === '/location' ? 'bg-gradient-to-b from-emerald-600 to-emerald-400' : ''}`}
            onClick={() => handleButtonClick('/location')}
          >
            Location
          </button>
        </div>
      </div>
    </div>
  );
}
