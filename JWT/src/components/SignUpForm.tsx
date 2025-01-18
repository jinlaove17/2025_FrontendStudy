import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

import { registerUser } from "../api/user.ts";
import { User } from "../types.ts";

const SignUpForm = () => {
  const [userInput, setUserInput] = useState<User>({
    email: "",
    password: "",
  });
  const nav = useNavigate();

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onSubmitSignUpForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerUser(userInput);
  };

  return (
    <Card className="w-[500px] mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl">SIGN UP</CardTitle>
        <CardDescription>
          안녕하세요, 이 UI는 shadcn을 이용하였습니다.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmitSignUpForm}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="email"
                className="font-bold"
              >
                이메일
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="이메일을 입력해 주세요."
                required
                onChange={onChangeInput}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="password"
                className="font-bold"
              >
                비밀번호
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                required
                onChange={onChangeInput}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="confirmPassword"
                className="font-bold"
              >
                비밀번호 확인
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="비밀번호를 한 번 더 입력해 주세요."
                required
              />
            </div>
          </div>

          <div className="flex justify-between mt-5">
            <Button
              type="button"
              onClick={() => nav("/")}
            >
              로그인
            </Button>
            <Button>가입하기</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
