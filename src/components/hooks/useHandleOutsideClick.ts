import { useEffect, useRef, useState } from "react";

interface UseHandleClickOutsideReturnType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ref: React.MutableRefObject<null>;
}

export const useHandleClickOutside = (initialState = false): UseHandleClickOutsideReturnType => {
  const [isOpen, setIsOpen] = useState(initialState);
  const ref: any = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [ref]);

  return { isOpen, setIsOpen, ref };
};
