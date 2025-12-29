import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <div className="alabaster-bg min-h-screen">
      <main className="mx-auto w-full max-w-3xl px-6 sm:px-8 md:px-10 py-16">
        <header className="space-y-3">
          <p className="font-inter text-sm text-muted-foreground">Legal</p>
          <h1 className="font-serif text-3xl md:text-4xl text-soft-black tracking-tight">
            Privacy Policy
          </h1>
          <p className="font-inter text-sm text-gray leading-relaxed break-keep">
            Last updated: 2025-12-29
          </p>
        </header>

        <section className="mt-10 space-y-6">
          <div className="rounded-3xl border bg-card/60 p-6 md:p-8 shadow-soft">
            <h2 className="font-serif text-xl text-soft-black">Summary</h2>
            <p className="mt-3 font-inter text-[0.95rem] sm:text-base md:text-lg text-gray leading-loose break-keep">
              본 서비스는 사용자가 입력한 이름을 기반으로 상형문자 스타일 결과를 화면에 표시합니다.
              회원가입 기능이 없으며, 입력한 이름을 서버로 저장하기 위한 별도의 데이터베이스를 운영하지
              않습니다.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-2xl text-soft-black">1. Information We Collect</h2>
            <p className="font-inter text-[0.95rem] sm:text-base md:text-lg text-gray leading-loose break-keep">
              원칙적으로 서비스 이용을 위해 실명/이메일/전화번호 등 개인식별정보를 요구하지 않습니다.
              사용자가 입력하는 이름(텍스트)은 변환 결과를 생성하기 위한 용도로만 사용되며,
              페이지를 닫거나 새로고침하면 브라우저 메모리 상태는 초기화될 수 있습니다.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-2xl text-soft-black">2. Cookies & Advertising</h2>
            <p className="font-inter text-[0.95rem] sm:text-base md:text-lg text-gray leading-loose break-keep">
              본 사이트는 광고(예: Google AdSense)를 게재할 수 있습니다. 광고 제공자는 쿠키를 사용해
              사용자의 관심사에 맞춘 광고를 표시할 수 있으며, 이는 광고 제공자의 정책에 따릅니다.
              사용자는 브라우저 설정을 통해 쿠키를 관리/차단할 수 있습니다.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-2xl text-soft-black">3. Sharing & Clipboard</h2>
            <p className="font-inter text-[0.95rem] sm:text-base md:text-lg text-gray leading-loose break-keep">
              사용자가 버튼을 누를 때에만(사용자 동작 기반) 상형문자 텍스트 복사, 이미지 저장,
              공유 기능이 동작합니다. 공유 기능은 사용자의 기기/브라우저가 제공하는 공유 시트를
              통해 이루어지며, 당사가 별도로 데이터를 수집하는 방식이 아닙니다.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-2xl text-soft-black">4. Contact</h2>
            <p className="font-inter text-[0.95rem] sm:text-base md:text-lg text-gray leading-loose break-keep">
              개인정보/정책 관련 문의는 아래 이메일로 연락해 주세요: {" "}
              <a
                className="underline underline-offset-4"
                href="mailto:jowheemin@gmail.com"
              >
                jowheemin@gmail.com
              </a>
              .
            </p>
          </div>

          <div className="pt-6">
            <Link
              to="/"
              className="font-inter text-sm text-gold underline underline-offset-4"
            >
              ← Back to Home
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
