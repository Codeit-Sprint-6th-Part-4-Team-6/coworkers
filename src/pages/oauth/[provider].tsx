import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Loading from "@components/commons/LottieAnimation/Loading";
import { useAuth } from "@hooks/auth/useAuth";
import { socialLogin } from "@api/authApi";

function OAuthRedirect() {
  const router = useRouter();
  const { provider, code } = router.query;
  const { login } = useAuth();

  useEffect(() => {
    if (provider === "google") {
      handleRedirectGoogle(provider);
    } else if (provider === "kakao") {
      handleRedirectKakao(provider);
    } else {
      router.push("/login");
    }
  }, [provider]);

  const handleRedirectGoogle = async (type: string) => {
    if (code) {
      const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/oauth/${type}`;
      const googleTokenResponse = await axios.post("https://oauth2.googleapis.com/token", {
        code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_GOOGLE_SECRET_KEY,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      });

      const token = googleTokenResponse.data.id_token;

      const response = await socialLogin(type.toUpperCase(), {
        redirectUri,
        token,
      });

      login(response);
    }
  };

  const handleRedirectKakao = async (type: string) => {
    if (code) {
      const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/oauth/${type}`;

      const config = {
        redirectUri,
        token: code as string,
      };

      const response = await socialLogin(type.toUpperCase(), config);
      login(response);
    }
  };

  return <Loading />;
}

export default OAuthRedirect;
