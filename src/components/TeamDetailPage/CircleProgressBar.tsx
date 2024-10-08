import React, { useEffect, useState } from "react";

// Props 타입 정의
interface ProgressProps {
  progress?: number; // 진행률 (0 ~ 100)
  strokeWidth?: number; // 원형 경로의 두께
  transitionDuration?: number; // 애니메이션 지속 시간 (초)
  className?: string; // 추가적인 CSS 클래스
  isGradientCircle?: boolean; // 그라데이션 사용 여부
}

// CircleProgressBar 컴포넌트 정의
function CircleProgressBar({
  progress = 0, // 기본 진행률은 0%
  strokeWidth = 4, // 기본 원형 경로의 두께는 4px
  transitionDuration = 0.5, // 기본 애니메이션 지속 시간은 0.5초
  className, // 사용자 정의 CSS 클래스 적용
  isGradientCircle = false, // 기본적으로 그라데이션은 사용하지 않음
}: ProgressProps) {
  const [displayProgress, setDisplayProgress] = useState(0);

  // 애니메이션을 위한 useEffect
  useEffect(() => {
    // 500ms 후에 진행률 설정
    const timeout = setTimeout(() => {
      setDisplayProgress(progress);
    }, 500); // 500ms 후에 진행률 업데이트

    return () => clearTimeout(timeout); // 클린업
  }, [progress]);

  // isGradient가 true일 경우, 기본 그라데이션 색상 배열 설정
  const appliedGradient = isGradientCircle
    ? [
        { stop: 0, color: "#ffd43b" },
        { stop: 0.6, color: "#e8590c" },
        { stop: 1, color: "#e8590c" },
      ]
    : [
        { stop: 0, color: "#FF9F0D" },
        { stop: 1, color: "#FF9F0D" },
      ];

  const reduction = 2;
  const roundedProgress = Math.round(displayProgress * 100) / 100; // 진행률 소수점 두 자리로 반올림
  const width = 200; // SVG의 너비
  const center = width / 2; // SVG의 중심 좌표
  const height = 200 || center + center * Math.cos(reduction * Math.PI); // SVG의 높이 계산
  const [unique] = useState(() => Math.random().toString()); // 유니크한 ID 생성
  const rotate = 90 + 180 * reduction; // 원형의 회전 각도 계산
  const r = center - strokeWidth / 2 - 16 / 2; // 원형의 반지름 계산
  const circumference = Math.PI * r * 2; // 원형의 둘레 계산
  const offset = (circumference * (100 - roundedProgress * (1 - reduction))) / 100; // 진행률에 따른 원형의 오프셋 계산

  return (
    <div className={`relative ${className}`}>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
        <defs>
          {/* 그라데이션 정의 */}
          <linearGradient id={`gradient${unique}`} x1="0%" y1="0%" x2="0%" y2="100%">
            {appliedGradient.map(({ stop, color }) => (
              <stop key={stop} offset={`${stop * 100}%`} stopColor={color} />
            ))}
          </linearGradient>
        </defs>
        {/* 배경 원형 경로 */}
        <circle
          transform={`rotate(${rotate} ${center} ${center})`}
          cx={center}
          cy={center}
          r={r}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * reduction}
          fill="none"
          stroke={isGradientCircle ? "#2e3135" : "#F8FAFC"}
          strokeLinecap="round"
        />
        {/* 진행률에 따른 원형 경로 */}
        <circle
          style={{
            transition: `stroke-dashoffset ${transitionDuration}s ease-in-out`,
          }}
          transform={`rotate(${rotate} ${center} ${center})`}
          cx={center}
          cy={center}
          r={r}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="none"
          stroke={`url(#gradient${unique})`}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
// React.memo를 사용하여 불필요한 재렌더링을 방지
export default React.memo(CircleProgressBar);
