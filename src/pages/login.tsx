import { useRouter } from "next/router";
import LoginForm from "@components/auth/LoginForm";
import TextButton from "@components/commons/Button/TextButton";
import SocialLoginBox from "@components/commons/SocialLoginBox";

// TODO: 배포하고나서 url 바꿔야됨
export default function LoginPage() {
  const router = useRouter();

  const handleGoogleAuth = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = "http://localhost:3000/oauth/google";
    const responseType = "code";
    const scope = process.env.NEXT_PUBLIC_GOOGLE_SCOPE;
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

    router.push(url);
  };

  const handleKakaoAuth = () => {
    const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const redirectUri = "http://localhost:3000/oauth/kakao";
    const responseType = "code";
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`;

    router.push(url);
  };

  return (
    <section className="mx-16 py-24 md:mx-auto md:w-460">
      <h2 className="mb-24 text-center text-4xl md:mb-80">로그인</h2>
      <LoginForm />
      <div className="mb-48 mt-24 text-center">
        <span className="mr-12">아직 계정이 없으신가요?</span>
        <TextButton buttonType="link" textStyle="underline" href="/register">
          가입하기
        </TextButton>
      </div>
      <SocialLoginBox
        type="login"
        onGoogleClick={handleGoogleAuth}
        onKakaoClick={handleKakaoAuth}
      />
    </section>
  );
}
