import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const nav = useNavigate();

  return (
    <Card className="w-[500px] mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl">SIGN UP</CardTitle>
        <CardDescription>
          안녕하세요, 이 UI는 shadcn을 이용하였습니다.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="name"
                className="font-bold"
              >
                아이디
              </Label>
              <Input
                id="name"
                placeholder="아이디를 입력해 주세요."
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="name"
                className="font-bold"
              >
                비밀번호
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력해 주세요."
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="name"
                className="font-bold"
              >
                비밀번호 확인
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력해 주세요."
              />
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => nav("/")}
        >
          로그인
        </Button>
        <Button>가입하기</Button>
      </CardFooter>
    </Card>
  );
};

export default SignUpForm;
