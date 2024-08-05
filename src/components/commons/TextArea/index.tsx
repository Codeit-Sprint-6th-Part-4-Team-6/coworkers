import { useEffect, useRef } from "react";
import classNames from "classnames";

type TextAreaProps = {
  type: "small" | "big" | "innerButton" | "transparent";
  name?: string;
  id?: string;
  placeholder: string;
  value?: string;
  defaultValue: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  height?: number;
};

/**
 * @props type: "small" | "big" | "innerButton | "transparent"; "small"은 모달 등에 들어가는 작은 폰트를 가지고, "big"은 상대적으로 큰 폰트를 가집니다(자유게시판), "innerButton"은 안쪽에 버튼을 넣는 경우로 오른쪽 패딩값이 설정되어 있습니다, "transparent"는 스타일이 거의 없이 투명하기에, 콘텐츠를 보여주다가 에디터로 전환하는 때 사용합니다.
 * @props name?: string;
 * @props id?: string;
 * @props placeholder: string;
 * @props value?: string;
 * @props defaultValue: string; 기본값을 넣어줄 수 있습니다. 사용하지 않을 시 자동으로 빈 문자열이 됩니다.
 * @props onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
 * @props onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
 * @props height?: number; Textarea의 높이를 설정합니다. type이 "innerButton일" 경우 설정된 높이값에 따라 자동으로 위 아래 패딩값이 정해집니다. defaultValue prop을 받을 경우 이 값은 딱히 필요 없이, 기본값의 높이에 맞춰서 자동으로 높이가 정해집니다.
 */

export default function Textarea({
  type,
  name,
  id,
  placeholder,
  value,
  defaultValue = "",
  onChange,
  onBlur,
  height,
}: TextAreaProps) {
  const classnames = classNames(
    "block w-full text-text-primary placeholder-text-default font-normal resize-none",
    {
      "border-solid border-border-primary": type !== "transparent",
      "text-md bg-[rgba(0,0,0,0)]": type === "transparent",
      "pr-32 text-md border-y bg-[rgba(0,0,0,0)]": type === "innerButton",
      "py-12 px-16 text-lg": type === "small",
      "px-24 py-16 text-14 leading-26 md:text-16": type === "big",
      "border focus:border-interaction-focus rounded-[12px] bg-background-secondary":
        type === "big" || type === "small",
    }
  );

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const regulateTextarea = () => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const { scrollHeight } = textareaRef.current;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(event);
    }
    // textarea 높이 조절
    regulateTextarea();
  };

  useEffect(() => {
    if (defaultValue) {
      regulateTextarea();
    }
  }, []);

  return (
    <textarea
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={type === "innerButton" || type === "transparent" ? handleChange : onChange}
      onBlur={onBlur}
      className={classnames}
      style={{
        height: `${height}px`,
        paddingTop: `${type === "innerButton" && height && (height - 17) / 2}px`,
        paddingBottom: `${type === "innerButton" && height && (height - 17) / 2}px`,
      }}
      ref={textareaRef}
    />
  );
}
