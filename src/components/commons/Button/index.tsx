import classNames from "classnames";
import { motion } from "framer-motion";
import useMediaQuery from "@hooks/useMediaQuery";
import { IconCheckDisActive, IconPlus } from "@utils/icon";
import Spinner from "../Spinner";

export type ButtonProps = {
  buttonType?: "button" | "floating";
  type?: "button" | "submit";
  size?: "large" | "medium" | "small";
  icon?: "none" | "check" | "plus";
  buttonStyle?:
    | "default"
    | "outlined"
    | "outlined-secondary"
    | "danger"
    | "transparent"
    | "transparent-white";
  className?: string;
  children: string | React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isPending?: boolean;
};

/**
 * 일반 버튼과 플로팅 버튼을 골라서 렌더링 할 수 있습니다.
 * @param buttonType "button" 혹은 "floating" 을 선택할 수 있습니다.
 * @param type "button" 혹은 "submit" 을 선택할 수 있습니다.
 * @param size 기본 버튼 large (w-full) medium (w-184) small (w-74) / 플로팅 버튼 large (h-48) medium&small (h-40)
 * @param icon 'plus' 와 'check' 중에 골라주세요. 기본값은 'none'입니다.
 * @param buttonStyle 'default' / 'outlined' / outlined-secondary / danger / transparent / transparent-white 으로 이루어져 있습니다. (피그마와 이름 똑같음)
 * @param className 추가적인 스타일을 작성해주세요.
 * @param children 버튼의 텍스트를 작성해주세요.
 * @param onClick 버튼 눌렀을 때 작동할 함수를 넣어주세요.
 * @param disabled form에서 disabled가 필요할 때 사용해주세요.
 * @param isPending 로딩중인 상태를 나타내고 싶을 때 사용해주세요.
 * @returns 버튼을 렌더링합니다.
 */
export default function Button({
  buttonType = "button",
  type = "button",
  size = "large",
  icon = "none",
  buttonStyle = "default",
  className,
  children,
  onClick,
  disabled = false,
  isPending = false,
}: ButtonProps) {
  const { isMobile } = useMediaQuery();
  const baseButtonClassName =
    "transition-all duration-100 rounded-[12px] font-semibold flex justify-center items-center";

  const styleClassName = classNames(className, "group", {
    "text-text-inverse bg-brand-primary hover:bg-interaction-hover active:bg-interaction-pressed disabled:bg-interaction-inactive":
      buttonStyle === "default",
    "text-brand-primary bg-background-inverse border border-solid border-brand-primary hover:text-interaction-hover hover:border-interaction-hover active:text-interaction-pressed active:border-interaction-pressed disabled:text-interaction-inactive disabled:border-interaction-inactive":
      buttonStyle === "outlined",
    "border border-solid border-brand-primary bg-background-inverse text-text-default border border-solid border-text-secondary":
      buttonStyle === "outlined-secondary",
    "text-brand-primary border border-solid border-brand-primary hover:text-interaction-hover hover:border-interaction-hover active:text-interaction-pressed active:border-interaction-pressed disabled:text-interaction-inactive disabled:border-interaction-inactive":
      buttonStyle === "transparent",
    "text-text-inverse border border-solid border-text-inverse disabled:text-interaction-inactive disabled:border-interaction-inactive":
      buttonStyle === "transparent-white",
    "bg-status-danger text-text-inverse hover:bg-status-danger": buttonStyle === "danger",
  });

  const sizeClassName = classNames({
    "w-full h-44 md:h-48 text-14 md:text-16": size === "large",
    "w-154 h-40 md:w-184 md:h-44 text-14 md:text-16": size === "medium",
    "w-74 h-32 text-14 text-12 md:text-14": size === "small",
  });

  const floatingClassName = classNames(
    className,
    "fixed m-auto rounded-full md:rounded-[40px] text-12 md:text-16",
    {
      "size-45 md:px-21 md:h-48 md:w-130": size === "large", // 높이가 더 뚱뚱한걸 large로 적용했습니다.
      "size-36 md:px-21 md:h-40 md:min-w-138": size === "medium",
      "size-36 md:px-21 min-w-96 md:h-40 md:min-w-111": size === "small",
    }
  );

  const iconClassName = classNames("md:mr-6", {
    "stroke-brand-primary group-hover:stroke-interaction-hover group-active:stroke-interaction-pressed group-disabled:stroke-interaction-inactive":
      buttonStyle === "outlined",
    "stroke-text-inverse": buttonStyle === "default",
  });

  const buttonClassName = classNames(
    baseButtonClassName,
    styleClassName,
    buttonType === "button" ? sizeClassName : floatingClassName
  );

  const loaderColor =
    buttonStyle === "outlined-secondary" ||
    buttonStyle === "outlined" ||
    buttonStyle === "transparent"
      ? "primary"
      : "white";

  return (
    <motion.button
      whileTap={disabled ? { scale: 1 } : { scale: 0.97 }}
      type={type}
      className={buttonClassName}
      onClick={onClick}
      disabled={disabled}
    >
      {isPending ? (
        <Spinner color={loaderColor} />
      ) : (
        <>
          {icon !== "none" &&
            (icon === "check" ? (
              <IconCheckDisActive className={iconClassName} />
            ) : (
              <IconPlus className={iconClassName} />
            ))}
          {isMobile && buttonType === "floating" ? "" : children}
        </>
      )}
    </motion.button>
  );
}
