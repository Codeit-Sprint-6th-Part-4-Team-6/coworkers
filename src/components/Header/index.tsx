import { useEffect, useState } from "react";
import { UserGroup, UserInfo } from "@coworkers-types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import NameTag from "@components/commons/NameTag";
import Popover from "@components/commons/Popover";
import { useAuth } from "@hooks/auth/useAuth";
import { IconList, IconToggle } from "@utils/icon";
import { getUserGroups } from "@api/userApi";
import LOGO from "@images/logo.png";

export default function Header() {
  // 현재 유저 정보 가져오기
  const cache = useQueryClient();
  const user = cache.getQueryData(["user"]) as UserInfo;

  const router = useRouter();
  const { pathname, query } = router;
  const { data: groups } = useQuery({
    queryKey: ["userGroups"],
    queryFn: getUserGroups,
    enabled: !!user,
  });

  // 현재 페이지가 특정한 팀 페이지라면 상단에 Menu Select
  const getCurTeamPage = () => groups?.find((group) => group.id?.toString() === query.teamId);

  // 현재 팀 페이지 정보 저장 상태
  const [curTeamPage, setCurTeamPage] = useState<UserGroup | undefined>(getCurTeamPage);
  // 모바일 사이드 바 상태
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { logout } = useAuth();

  const handleSignOut = (): void => {
    alert("로그아웃 되었습니다.");
    logout();
  };

  // 현재 페이지가 로그인 or 회원가입인지
  const isAuthPage = pathname === "/login" || pathname === "/register";

  useEffect(() => {
    setCurTeamPage(getCurTeamPage());
  }, [groups, query.teamId]);

  // 라우팅이 체인지될 때 사이드바 닫기
  useEffect(() => {
    const handleRouteChange = () => {
      setSidebarOpen(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  return (
    <header className="relative flex h-60 items-center justify-center border-b border-border-primary border-opacity-10 bg-background-secondary">
      <nav className="flex w-full max-w-full items-center justify-between px-10 md:min-w-696 md:max-w-1200">
        <div className="flex gap-10">
          <button
            // 모바일 사이즈 때만 보이는 햄버거 아이콘
            className="md:hidden"
            onClick={() => {
              setSidebarOpen(true);
            }}
          >
            <IconList />
          </button>
          <Link href={user ? "/teams" : "/"}>
            <Image src={LOGO} alt="코워커스 로고 이미지" className="w-102 md:w-158" priority />
          </Link>
        </div>
        {
          // 로그인 & 회원가입 페이지가 아니거나, 로그인 정보가 있을 때만 자유게시판, 팀 리스트 보여줌
          !isAuthPage && user && (
            <>
              <div
                // 모바일 사이즈일 때는 hidden
                className="hidden flex-grow items-center gap-10 px-20 text-lg md:flex"
              >
                <Link href="/boards" className="text-nowrap">
                  자유게시판
                </Link>
                <Popover>
                  <Popover.Toggle>
                    {curTeamPage?.name || "팀 리스트"} <IconToggle />
                  </Popover.Toggle>
                  <Popover.Wrapper>
                    {groups?.map((group) => (
                      <Popover.TeamItem
                        key={`group-${group.id}`}
                        title={group.name}
                        id={group.id}
                        imgSrc={group.image}
                      />
                    ))}
                    <Popover.InnerButton
                      onClick={() => {
                        router.push("/add-team");
                      }}
                    />
                  </Popover.Wrapper>
                </Popover>
              </div>

              {user ? (
                <Popover>
                  <Popover.Toggle>
                    <NameTag type="profile" name={user.nickname} image={user.image} />
                  </Popover.Toggle>
                  <Popover.Wrapper popDirection="left">
                    <Popover.Item
                      onClick={() => {
                        router.push("/user/history");
                      }}
                    >
                      마이 히스토리
                    </Popover.Item>
                    <Popover.Item
                      onClick={() => {
                        router.push("/user/edit");
                      }}
                    >
                      계정 설정
                    </Popover.Item>
                    <Popover.Item
                      onClick={() => {
                        router.push("/join-team");
                      }}
                    >
                      팀 참여
                    </Popover.Item>
                    <Popover.Item onClick={handleSignOut}>로그아웃</Popover.Item>
                  </Popover.Wrapper>
                </Popover>
              ) : (
                <Link href="/login">로그인</Link>
              )}
            </>
          )
        }
      </nav>
      <div
        className={classNames(
          "absolute left-0 top-0 z-50 h-[100vh] w-204 bg-background-tertiary p-16 transition-transform duration-300 md:hidden",
          {
            "translate-x-0 transform": sidebarOpen,
            "-translate-x-full transform": !sidebarOpen,
          }
        )}
      >
        <div className="mb-24 flex w-full justify-end">
          <button onClick={() => setSidebarOpen(false)}>
            <Image src="/icons/icon_close.svg" alt="사이드바 닫기 버튼" width={24} height={24} />
          </button>
        </div>
        <div className="flex flex-col gap-24">
          <Link href="/boards" className="text-md">
            자유게시판
          </Link>
          <Link href="/teams" className="text-md">
            팀 리스트
          </Link>
          {groups?.map((group) => (
            <Link className="text-md" href={`/teams/${group.id}`} key={group.id}>
              {group.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
