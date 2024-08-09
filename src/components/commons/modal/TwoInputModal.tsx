import Input from "@components/commons/Input";
import Label from "@components/commons/Label";
import Textarea from "@components/commons/TextArea";
import { IconClose } from "@utils/icon";
import Button from "../Button";

interface TwoInputModalProps {
  title: string;
  content?: string;
  firstTitle: string;
  firstPlaceholder: string;
  firstType?: "input" | "textarea";
  firstValue?: string;
  secondTitle: string;
  secondPlaceholder: string;
  secondType?: "input" | "textarea";
  secondValue?: string;
  buttonText: string;
  onConfirm: () => void;
  onClose?: () => void;
  firstOnChange?:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | ((event: React.ChangeEvent<HTMLTextAreaElement>) => void);
  secondOnChange?:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | ((event: React.ChangeEvent<HTMLTextAreaElement>) => void);
  closeButton?: boolean;
}
/**
 * 두개의 인풋이 들어가는 형식의 모달입니다.
 * 자세한 사용방법은 https://github.com/Codeit-Sprint-6th-Part-4-Team-6/coworkers/pull/14 를 참고해주세요.
 * @param title - 모달의 상단 제목 부분입니다.
 * @param content - 모달의 중간 내용 부분입니다.
 * @param firstTitle - 첫번째 인풋에 들어가는 텍스트입니다.
 * @param firstPlaceholder - 첫번째 인풋에 들어가는 텍스트입니다.
 * @param firstType - input인지, textarea인지 확인하는 props입니다.
 * @param secondTitle - 두번째 인풋에 들어가는 텍스트입니다.
 * @param secondPlaceholder - 두번째 인풋에 들어가는 텍스트입니다.
 * @param secondType - input인지, textarea인지 확인하는 props입니다.
 * @param buttonText - 버튼에 들어가는 텍스트입니다.
 * @param onConfirm - 버튼을 눌렀을때 동작하는 함수입니다.
 * @param onClose - 닫기버튼을 눌렀을때 동작하는 함수입니다.
 * @param closeButton - 닫기버튼과 X버튼을 위한 props입니다.
 */
export default function TwoInputModal({
  title,
  content,
  firstTitle,
  firstPlaceholder,
  firstType = "input",
  firstValue,
  secondTitle,
  secondPlaceholder,
  secondType = "input",
  secondValue,
  buttonText,
  onConfirm,
  onClose,
  firstOnChange,
  secondOnChange,
  closeButton = false,
}: TwoInputModalProps) {
  return (
    <div className="modal">
      {!closeButton && <IconClose className="modal-close-icon" onClick={onClose} />}
      <p className="modal-title">{title}</p>
      {content && <p className="modal-content">{content}</p>}
      <div className="flex w-full flex-col">
        <Label htmlFor="first" content={firstTitle} marginBottom={12} type="label" />
        {firstType === "input" ? (
          <Input
            value={firstValue}
            id="first"
            placeholder={firstPlaceholder}
            onChange={firstOnChange as (event: React.ChangeEvent<HTMLInputElement>) => void}
          />
        ) : (
          <Textarea
            value={firstValue}
            id="first"
            placeholder={firstPlaceholder}
            type="small"
            height={80}
            onChange={firstOnChange as (event: React.ChangeEvent<HTMLTextAreaElement>) => void}
          />
        )}
      </div>
      <div className="mt-12 flex w-full flex-col">
        <Label htmlFor="second" content={secondTitle} marginBottom={12} type="label" />
        {secondType === "input" ? (
          <Input
            value={secondValue}
            id="second"
            placeholder={secondPlaceholder}
            onChange={secondOnChange as (event: React.ChangeEvent<HTMLInputElement>) => void}
          />
        ) : (
          <Textarea
            value={secondValue}
            id="second"
            placeholder={secondPlaceholder}
            type="small"
            height={80}
            onChange={secondOnChange as (event: React.ChangeEvent<HTMLTextAreaElement>) => void}
          />
        )}
      </div>
      {closeButton ? (
        <div className="mt-30 flex gap-10">
          <Button buttonStyle="outlined" onClick={onClose} size="medium">
            닫기
          </Button>
          <Button onClick={onConfirm} size="medium">
            {buttonText}
          </Button>
        </div>
      ) : (
        <Button onClick={onConfirm} className="mt-30">
          {buttonText}
        </Button>
      )}
    </div>
  );
}
