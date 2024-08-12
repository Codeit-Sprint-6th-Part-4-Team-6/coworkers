import { useState } from "react";
import { User, UserInfo } from "@coworkers-types";
import { useMutation } from "@tanstack/react-query";
import Button from "@components/commons/Button";
import Input from "@components/commons/Input";
import ImageInput from "@components/commons/Input/ImageInput";
import Label from "@components/commons/Label";
import { useToast } from "@hooks/useToast";
import { useAuthStore } from "@store/useAuthStore";
import { postImageURL } from "@api/imageApi";
import { patchUser } from "@api/userApi";

export default function EditUserForm() {
  const { user, setUser } = useAuthStore();
  const [profileImage, setProfileImage] = useState<string | File | null>(user?.image ?? null);
  const [name, setName] = useState(user?.nickname);
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();

  const handleFileChange = (value: string | File | null) => {
    setProfileImage(value);
  };

  const handleNickNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const patchUserMutation = useMutation({
    mutationFn: ({ nickname, image }: { nickname?: string; image?: string }) =>
      patchUser({ nickname, image }),
    onSuccess: () => {
      // TODO: 변경된 유저 정보 store에 저장
      toast("success", "계정 설정 변경에 성공하셨습니다.");
    },
    onError: (error: any) => {
      const message = error.response.data?.message;
      setErrorMessage(message);
    },
  });

  const imagePostMutation = useMutation({
    mutationFn: (file: File) => postImageURL(file),
    onSuccess: (data: { url: string }) => {
      patchUserMutation.mutate({ nickname: name, image: data.url });
    },
    onError: (error: any) => {
      alert(`Error uploading image: ${error}`);
    },
  });

  const isPending = patchUserMutation.isPending || imagePostMutation.isPending;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name) return;

    if (profileImage instanceof File) {
      imagePostMutation.mutate(profileImage);
    } else {
      patchUserMutation.mutate({ nickname: name });
    }
  };

  return (
    <form className="flex flex-col gap-24" onSubmit={handleSubmit}>
      <div className="absolute right-0 top-24 lg:top-40">
        <Button type="submit" size="small" isPending={isPending}>
          변경하기
        </Button>
      </div>
      <ImageInput
        id="profile-image"
        type="my-profile"
        onChange={handleFileChange}
        defaultValue={user?.image ?? ""}
      />
      <div>
        <Label content="이메일" marginBottom={12} />
        <Input value={user?.email} disabled />
      </div>
      <div>
        <Label htmlFor="nickname" content="이름" marginBottom={12} />
        <Input
          id="nickname"
          name="nickname"
          defaultValue={user?.nickname}
          errorMessage={errorMessage}
          onChange={handleNickNameChange}
        />
      </div>
    </form>
  );
}
