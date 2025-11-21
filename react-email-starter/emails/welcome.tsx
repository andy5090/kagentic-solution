import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface WelcomeEmailProps {
  username: string;
  buttonLink: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const WelcomeEmail = ({ username, buttonLink }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Andineering에 가입하신것을 환영합니다!</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-[#eaeaea] border-solid p-[20px]">
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Andineering
            </Heading>
            <Section className="mt-[16px] mb-[16px] text-center">
              <Text className="text-[16px] leading-[26px]">
                안녕하세요 {username}님,
              </Text>
              <Text className="text-[16px] leading-[26px]">
                에이전틱 AI가 도대체 무엇인지 궁금하신가요?
              </Text>
            </Section>
            <Section className="mt-[32px] mb-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={buttonLink}
              >
                Andineering 안내 페이지 바로가기
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

WelcomeEmail.PreviewProps = {
  username: "Alan",
  buttonLink: `${baseUrl}/agentic`,
} as WelcomeEmailProps;

export default WelcomeEmail;
