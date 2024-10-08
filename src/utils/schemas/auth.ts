import * as zod from "zod";

export const LoginSchema = zod.object({
  email: zod
    .string()
    .min(1, "이메일은 필수 입력입니다.")
    .email({ message: "이메일 형식으로 작성해 주세요." }),
  password: zod.string().min(1, "비밀번호는 필수 입력입니다."),
});

export const RegisterSchema = zod
  .object({
    email: zod
      .string()
      .min(1, "이메일은 필수 입력입니다.")
      .email({ message: "이메일 형식으로 작성해 주세요." }),
    nickname: zod
      .string()
      .min(1, "닉네임은 필수 입력입니다.")
      .max(10, "닉네임은 최대 10자까지 가능합니다.")
      .regex(/\S+/g, "닉네임에 공백 문자는 포함될 수 없습니다.")
      .trim(),
    password: zod
      .string()
      .min(1, "비밀번호는 필수 입력입니다.")
      .min(8, "비밀번호는 최소 8자 이상입니다.")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
        "비밀번호는 숫자, 영문, 특수문자(!@#$%^&*)로만 가능합니다."
      ),
    passwordConfirmation: zod.string().min(1, "비밀번호 확인을 입력해주세요."),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirmation"],
  });

export const ResetPasswordSchema = zod
  .object({
    password: zod
      .string()
      .min(1, "비밀번호는 필수 입력입니다.")
      .min(8, "비밀번호는 최소 8자 이상입니다.")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
        "비밀번호는 숫자, 영문, 특수문자(!@#$%^&*)로만 가능합니다."
      ),
    passwordConfirmation: zod.string().min(1, "비밀번호 확인을 입력해주세요."),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirmation"],
  });
