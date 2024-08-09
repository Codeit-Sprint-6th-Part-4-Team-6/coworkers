import classNames from "classnames";

type LabelProps = {
  type?: "none" | "label" | "essential";
  content: string;
  className?: string;
  htmlFor?: string;
  marginBottom?: 8 | 12 | 16;
  center?: boolean;
};

/**
 * @type "none" : h3 태그가 생성됩니다. "label" : input과 연결할 수 있는 일반 라벨입니다. "essential" : 필수값을 의미하는 *가 들어간 라벨입니다.
 * @props type?: "none" | "label" | "essential"; 작성하지 않으면 기본적으로 none로 설정됩니다.
 * @props content: string;
 * @props htmlFor?: string;
 * @props marginBottom?: 8 | 12 | 16; 라벨과 아래 요소 사이의 마진 값을 8, 12, 16으로 설정 가능합니다.
 * @props center?: boolean; 라벨을 가운데로 정렬할 수 있습니다. 사용하면 true 사용하지 않으면 기본값(left)으로 처리됩니다.
 * @메모 기본적으로 display: block입니다. 옆에 다른 요소를 놓고 싶을 떄는 부모요소에 flex를 주고 margin bottom도 부모에서 한번에 처리해주세요.
 */

export default function Label({
  type = "none",
  content,
  className,
  htmlFor,
  marginBottom,
  center,
}: LabelProps) {
  const marginClasses = {
    8: "mb-8",
    12: "mb-12",
    16: "mb-16",
  };

  const classnames = classNames(
    `font-medium text-text-primary block ${className}`,
    type === "essential" ? "text-md md:text-lg" : "text-lg",
    marginBottom ? marginClasses[marginBottom] : "",
    {
      "text-center": center,
    }
  );

  return type === "none" ? (
    <h3 className={classnames}>{content}</h3>
  ) : (
    <label htmlFor={htmlFor} className={classnames}>
      {type === "essential" ? (
        <>
          <span className="text-brand-tertiary">* </span>
          {content}
        </>
      ) : (
        content
      )}
    </label>
  );
}
