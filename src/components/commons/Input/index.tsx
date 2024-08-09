import { useState } from "react";
import classNames from "classnames";
import { IconClose, IconSearch, IconVisibilityOff, IconVisibilityOn } from "@utils/icon";

type InputProps = {
  type?: "text" | "email" | "password" | "search";
  name?: string;
  id?: string;
  placeholder: string;
  value?: string;
  className?: string;
  errorMessage?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onDelete?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

/**
 * @props type?: "text" | "email" | "password" | "search";
 * @props name?: string;
 * @props id?: string;
 * @props placeholder: string;
 * @props value?: string;
 * @props errorMessage?: string;
 * @props disabled?: boolean;
 * @props onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
 * @props onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
 * @props onDelete?: (event: React.MouseEvent<HTMLButtonElement>) => void; type이 search일 때 검색어 입력했을 때 나오는 x button에 등록할 이벤트 핸들러입니다.
 */

export default function Input({
  type = "text",
  name,
  id,
  placeholder,
  value,
  className,
  errorMessage,
  disabled,
  onChange,
  onKeyDown,
  onBlur,
  onDelete,
}: InputProps) {
  const [inputType, setInputType] = useState(type === "search" ? "text" : type);

  const handlePasswordViewClick = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  const inputClassnames = classNames(
    `w-full h-48 md:h-48 text-md font-normal md:text-lg rounded-[12px] border border-solid text-text-primary placeholder-text-default focus:border-interaction-focus`,
    errorMessage ? "!border-status-danger" : "border-border-primary",
    disabled ? "bg-background-tertiary" : "bg-background-secondary",
    type === "password" ? "pl-16 pr-40" : "px-16",
    type === "search" ? "pr-16 pl-44" : ""
  );

  return (
    <div className={`relative w-full ${className}`}>
      <input
        type={inputType}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        className={inputClassnames}
      />
      {type === "password" && (
        <button
          type="button"
          className="absolute right-16 top-12"
          onClick={handlePasswordViewClick}
          aria-label="Toggle password visibility"
        >
          {inputType === "password" ? <IconVisibilityOff /> : <IconVisibilityOn />}
        </button>
      )}
      {type === "search" && (
        <>
          <IconSearch className="absolute left-16 top-12" />
          {value && (
            <button
              type="button"
              className="absolute right-16 top-6 cursor-pointer"
              onClick={onDelete}
              aria-label="Clear search"
            >
              <IconClose />
            </button>
          )}
        </>
      )}
      {errorMessage && (
        <p className="mt-8 text-md font-medium text-status-danger">{errorMessage}</p>
      )}
    </div>
  );
}
