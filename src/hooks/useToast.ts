import { useToastStore } from "@store/useToastStore";

export const useToast = () => {
  const { setToast, setIsOpen } = useToastStore();

  /**
   * 토스트 내용을 지정할 수 있습니다.
   * @param type
   * "info" - 정보를 표시하는 파란색 `i` 아이콘 사용
   * "success" - 성공을 표시하는 녹색 체크 아이콘 사용
   * "warn" - 경고를 표시하는 노란색 ! 아이콘 사용
   * "danger" - 위험을 표시하는 빨간색 x 아이콘 사용
   * @param content 알림에 표시할 메세지를 기입합니다.
   */
  const toast = (type: "info" | "success" | "warn" | "danger", content: string) => {
    const data = { type, content };
    setToast(data);
    setIsOpen(true);

    setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  };

  return { toast };
};
