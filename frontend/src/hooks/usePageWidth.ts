import { useEffect, useState } from "react";

const usePageWidth = () => {
  //@ts-ignore
  const [width, setWidth] = useState<number>(
    (typeof window !== "undefined" && window.innerWidth) || 0
  );
  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);
  }, []);

  return width;
};

export default usePageWidth;
