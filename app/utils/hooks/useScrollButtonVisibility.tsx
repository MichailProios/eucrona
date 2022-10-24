import { useEffect, useState } from "react";

// type ScrollButton = {
//  boolean
// };

function useScrollButtonVisibility() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScrollButtonVisiblity = () => {
        window.pageYOffset > 300 ? setShowButton(true) : setShowButton(false);
      };
      window.addEventListener("scroll", handleScrollButtonVisiblity);
      return () => {
        window.removeEventListener("scroll", handleScrollButtonVisiblity);
      };
    }
  }, []); // Empty array ensures that effect is only run on mount
  return showButton;
}

export default useScrollButtonVisibility;
