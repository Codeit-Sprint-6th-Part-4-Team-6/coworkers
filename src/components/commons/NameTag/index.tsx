import classNames from "classnames";
import Image from "next/image";
import { IconMember, IconUser } from "@utils/icon";

type NameTagProps = {
  type: "default-6" | "default-12" | "email" | "profile";
  image: string | null;
  name: string;
  email?: string;
  onClick?: () => void;
};

/**
 * type에는 4가지 종류가 있습니다.
 * default-6 : 기본적인 형태이지만 모바일일 때 gap이 6으로 줄어듭니다(게시글 상세페이지)
 * default-12 : 기본적인 형태이지만 gap이 12로 설정된 후 변하지 않습니다(자유게시판)
 * profile : 상단 nav바에 넣을 프로필 이름표입니다.
 * @prop type: "default-6" | "default-12" | "email" | "profile";
 * @prop image: string | null;
 * @prop name: string;
 * @prop email?: string;
 * @prop onClick?: () => void; 프로필처럼 클릭했을 때 드롭다운 같은걸 열어야 할 때 사용해주세요
 * 기본적으로 이름(닉네임)과 이메일은, 설정된 최대 너비를 넘기면 스크롤됩니다(스크롤바는 숨김)
 */

export default function NameTag({ type, image, name, email, onClick }: NameTagProps) {
  const layoutStyles = classNames(
    type === "email"
      ? "grid grid-cols-[auto_1fr] grid-rows-[auto_auto] items-center gap-x-8 md:gap-x-12 gap-y-6 md:gap-y-2"
      : "flex items-center",
    {
      "max-w-200 md:max-w-none": type === "default-6" || type === "default-12",
      "gap-6 md:gap-12": type === "default-6",
      "gap-12": type === "default-12",
      "gap-8 max-w-140": type === "profile",
      "max-w-108 md:max-w-146 lg:max-w-312": type === "email",
      "cursor-pointer": onClick,
    }
  );
  const profileStyles = classNames("rounded-full relative shrink-0", {
    "w-24 h-24 md:w-16 md:h-16": type === "profile",
    "w-32 h-32": type === "default-6" || type === "default-12",
    "md:row-[1/3] w-24 h-24 md:w-32 md:h-32": type === "email",
  });
  const nameStyles = classNames(
    "font-medium text-text-primary overflow-x-scroll text-nowrap",
    type === "default-6" || type === "default-12" ? "text-xs md:text-md" : "text-md",
    type === "profile" ? "hidden lg:inline" : ""
  );

  return (
    <div className={layoutStyles} onClick={onClick}>
      {/* eslint-disable-next-line no-nested-ternary */}
      {image ? (
        <div className={profileStyles}>
          <Image src={image} alt="profile" className="rounded-full" fill />
        </div>
      ) : type === "profile" ? (
        <IconUser className="h-24 w-24 shrink-0 md:h-16 md:w-16" />
      ) : (
        <IconMember className={profileStyles} />
      )}
      <span className={nameStyles}>{name}</span>
      {type === "email" && email && (
        <span className="col-[1/3] grid overflow-x-scroll text-nowrap text-xs font-normal text-text-secondary md:col-auto">
          {email}
        </span>
      )}
    </div>
  );
}
