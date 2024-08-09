import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconToggle } from "@utils/icon";

// Dropdown Context 정의
const DropdownContext = createContext({
  isOpen: false,
  selectedValue: "",
  toggleDropdown: () => {},
  closeDropdown: () => {},
  selectItem: (value: string) => {},
});

export default function Dropdown({
  children,
  selectedValue,
  onSelect,
}: {
  children: React.ReactNode;
  selectedValue: string;
  onSelect: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dropdown 열기/닫기
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  // 아이템 선택 시 동작
  const selectItem = (value: string) => {
    onSelect(value);
    closeDropdown();
  };

  // Context Provider 값 생성
  const providerValue = useMemo(
    () => ({ isOpen, selectedValue, toggleDropdown, closeDropdown, selectItem }),
    [isOpen, selectedValue]
  );

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <DropdownContext.Provider value={providerValue}>
      <div ref={dropdownRef} className="relative">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

// Dropdown 버튼 (Toggle)
function Toggle({ children }: { children: React.ReactNode }) {
  const { toggleDropdown, selectedValue } = useContext(DropdownContext);

  // 선택된 값에 따른 텍스트 렌더링
  const renderText = (value: string) => {
    const options: { [key: string]: string } = {
      "": "반복 안함",
      ONCE: "한 번",
      DAILY: "매일",
      WEEKLY: "주 반복",
      MONTHLY: "월 반복",
      latest: "최신순",
      oldest: "오래된순",
      likes: "좋아요 많은순",
    };
    return options[value] || value;
  };

  return (
    <button
      className="box-border flex min-w-140 items-center justify-between rounded-12 bg-[#18212F] px-10 py-8"
      type="button"
      onClick={toggleDropdown}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleDropdown()}
      tabIndex={0}
    >
      <span className="text-md">
        {selectedValue ? (
          renderText(selectedValue)
        ) : (
          <span className="text-text-default">{children}</span>
        )}
      </span>
      <IconToggle />
    </button>
  );
}

// Dropdown 리스트 Wrapper
function Wrapper({ children }: { children: React.ReactNode }) {
  const { isOpen } = useContext(DropdownContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute top-50 box-border w-full rounded-12 border border-solid border-background-tertiary bg-background-secondary px-16 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Dropdown 항목 (Item)
function Item({ children, value }: { children: React.ReactNode; value: string }) {
  const { selectItem } = useContext(DropdownContext);

  return (
    <div
      className="cursor-pointer text-nowrap rounded-8 px-8 py-7 text-md text-text-primary transition-all hover:bg-background-tertiary md:text-lg"
      onClick={() => selectItem(value)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && selectItem(value)}
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  );
}

// Dropdown 컴포넌트의 서브 컴포넌트로 등록
Dropdown.Toggle = Toggle;
Dropdown.Wrapper = Wrapper;
Dropdown.Item = Item;
