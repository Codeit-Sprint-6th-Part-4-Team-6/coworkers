import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Button from "@components/commons/Button";

const PopoverContext = createContext({
  isOpen: false,
  togglePopover: () => {},
  closePopover: () => {},
});

export default function Popover({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const togglePopover = () => setIsOpen(!isOpen);
  const closePopover = () => setIsOpen(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const providerValue = useMemo(
    () => ({
      isOpen,
      togglePopover,
      closePopover,
    }),
    [isOpen]
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closePopover();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, closePopover]);

  return (
    <PopoverContext.Provider value={providerValue}>
      <div ref={dropdownRef} className="relative">
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

function Toggle({ children }: { children: React.ReactNode }) {
  const { togglePopover } = useContext(PopoverContext);

  return (
    <button
      type="button"
      onClick={togglePopover}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          togglePopover();
        }
      }}
      tabIndex={0}
      className="flex cursor-pointer items-center gap-5 text-nowrap"
    >
      {children}
    </button>
  );
}

function Wrapper({
  children,
  popDirection = "right",
}: {
  children: React.ReactNode;
  popDirection?: "left" | "right";
}) {
  const { isOpen } = useContext(PopoverContext);

  const wrapperClassName = classNames(
    `${popDirection === "left" ? "right-0" : ""} z-50 absolute top-30 rounded-12 border border-solid border-background-tertiary bg-background-secondary px-16 py-8 text-center box-border max-w-218 min-w-120 md:min-w-135`
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={wrapperClassName}
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

function Item({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <div
      className="cursor-pointer text-nowrap rounded-8 py-7 text-md text-text-primary transition-all hover:bg-background-tertiary md:text-lg"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  );
}

function InnerButton({ onClick }: { onClick: () => void }) {
  const { closePopover } = useContext(PopoverContext);

  const handleClick = () => {
    closePopover();
  };

  return (
    <Button
      buttonStyle="transparent-white"
      icon="plus"
      onClick={() => {
        onClick();
        handleClick();
      }}
    >
      팀 생성하기
    </Button>
  );
}

function TeamItem({ id, imgSrc, title }: { id: number; imgSrc: string | null; title: string }) {
  const { closePopover } = useContext(PopoverContext);

  const handleClick = () => {
    closePopover();
  };

  return (
    <Link href={`/teams/${id}`}>
      <button
        type="button"
        className="my-10 box-border flex h-[48px] w-[186px] items-center justify-between gap-20 rounded-8 px-8 py-7 hover:bg-background-tertiary"
        onClick={handleClick}
      >
        <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-6">
          <Image
            src={imgSrc || "/icons/icon_default_image.svg"}
            alt={`${title} logo`}
            fill
            className="object-cover"
          />
        </div>
        <span className="flex-grow truncate text-left text-lg">{title}</span>
      </button>
    </Link>
  );
}

Popover.Toggle = Toggle;
Popover.Wrapper = Wrapper;
Popover.Item = Item;
Popover.InnerButton = InnerButton;
Popover.TeamItem = TeamItem;
