import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="alabaster-bg min-h-screen">
      <main className="mx-auto w-full max-w-3xl px-6 sm:px-8 md:px-10 py-16">
        <header className="space-y-3">
          <p className="font-inter text-sm text-muted-foreground">Legal</p>
          <h1 className="font-serif text-3xl md:text-4xl text-soft-black tracking-tight">
            Terms of Service
          </h1>
          <p className="font-inter text-sm text-gray leading-relaxed break-keep">
            Last updated: 2025-12-29
          </p>
        </header>

        <section className="mt-10 space-y-6">
          <div className="rounded-3xl border bg-card/60 p-6 md:p-8 shadow-soft">
            <h2 className="font-serif text-xl text-soft-black">Overview</h2>
            <p className="mt-3 font-inter text-[0.95rem] sm:text-base md:text-lg text-gray leading-loose break-keep">
              본 서비스는 사용자가 입력한 이름을 고대 이집트 상형문자 ‘스타일’로 변환해 보여주는
              교육/엔터테인먼트 목적의 도구입니다. 서비스 이용으로 발생하는 결과물의 활용 책임은
              사용자에게 있습니다.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-2xl text-soft-black">1. Acceptable Use</h2>
            <p className="font-inter text-[0.95rem] sm:text-base md:text-lg text-gray leading-loose break-keep">
              사용자는 관련 법령을 준수해야 하며, 타인의 권리를 침해하거나 불법/유해한 콘텐츠를
              생성·공유하는 목적으로 본 서비스를 이용할 수 없습니다.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-2xl text-soft-black">2. Disclaimer</h2>
            <p className="font-inter text-[0.95rem] sm:text-base md:text-lg text-gray leading-loose break-keep">
              변환 결과는 학술적 번역을 보장하지 않으며, 고고학적/언어학적 정확성을 100% 보증하지
              않습니다. 타투/상업적 사용 등 중요한 용도에는 사용자가 추가 검증을 권장합니다.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-2xl text-soft-black">3. Changes</h2>
            <p className="font-inter text-[0.95rem] sm:text-base md:text-lg text-gray leading-loose break-keep">
              본 약관은 서비스 개선/법령 변경 등을 이유로 업데이트될 수 있습니다.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-2xl text-soft-black">4. Contact</h2>
            <p className="font-inter text-[0.95rem] sm:text-base md:text-lg text-gray leading-loose break-keep">
              문의: {" "}
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
