import { IconAlert } from "@utils/icon";
import Button from "../Button";

interface WarnModalProps {
  warnIcon?: boolean;
  title: string;
  content?: string;
  buttonText: string;
  onConfirm?: () => void;
  onClose?: () => void;
}

/**
 * 경고 형식의 모달입니다.
 * 자세한 사용방법은 https://github.com/Codeit-Sprint-6th-Part-4-Team-6/coworkers/pull/14 를 참고해주세요.
 * @param warnIcon - 경고 아이콘을 위한 props 입니다.
 * @param title - 모달의 상단 제목 부분입니다.
 * @param content - 모달의 중간 내용 부분입니다.
 * @param buttonText - 버튼에 들어가는 텍스트입니다.
 * @param onConfirm - 버튼을 눌렀을때 동작하는 함수입니다.
 * @param onClose - 닫기버튼을 눌렀을때 동작하는 함수입니다.
 */
export default function WarnModal({
  warnIcon = false,
  title,
  content,
  buttonText,
  onConfirm,
  onClose,
}: WarnModalProps) {
  return (
    <div className="modal">
      {warnIcon && <IconAlert className="mb-16" />}
      <p className="modal-title">{title}</p>
      {content && <p className="modal-content">{content}</p>}
      <div className="mt-30 flex gap-10">
        <Button buttonStyle="outlined" onClick={onClose} size="medium">
          닫기
        </Button>
        <Button buttonStyle="danger" onClick={onConfirm} size="medium">
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
