import type { ReactNode } from "react";
import { Pyramid, ScrollText, Feather, Shield, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type SectionHeaderProps = {
  icon: ReactNode;
  title: string;
  subtitle?: string;
};

function SectionHeader({ icon, title, subtitle }: SectionHeaderProps) {
  return (
    <header className="flex items-start gap-3 mb-6">
      <div className="mt-1 text-gold">{icon}</div>
      <div>
        <h2 className="font-serif text-2xl md:text-3xl text-soft-black tracking-tight">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-3 font-inter text-[0.95rem] sm:text-base md:text-lg text-gray leading-loose break-keep">
            {subtitle}
          </p>
        ) : null}
      </div>
    </header>
  );
}

export default function LandingSections() {
  const bodyTextClassName =
    "font-inter text-[0.95rem] sm:text-base md:text-lg text-gray leading-loose break-keep";

  return (
    <div className="w-full">
      <main className="mx-auto w-full max-w-3xl px-6 sm:px-8 md:px-10 py-24">
        <div className="space-y-20 md:space-y-28">
          {/* Section 1: Introduction (The History) */}
          <section aria-labelledby="section-history" className="scroll-mt-24">
            <div className="grid gap-8 md:grid-cols-2 md:items-start">
              <div className="space-y-6">
                <div id="section-history">
                  <SectionHeader
                    icon={<Pyramid className="h-10 w-10" />}
                    title="신들의 언어, 히에로그리프"
                    subtitle="히에로그리프(상형문자)는 3,000년이 넘는 시간 동안 고대 이집트에서 사용된 문자 체계로, 파라오의 권위와 영원함을 상징하는 기록 방식이었습니다. 신전의 벽화, 무덤의 비문, 의례 문서에 새겨진 글자들은 ‘이름을 남긴다’는 행위 자체가 곧 힘과 명예가 되는 시대의 감각을 담고 있습니다."
                  />
                </div>

                <p className={bodyTextClassName}>
                  이 페이지의 번역기는 그런 상징성을 ‘현대의 이름’에 적용해, 간단한 입력만으로도
                  고대 분위기의 카르투슈 형태로 결과를 보여줍니다. 상단은 간결하지만, 아래로
                  내려가면 변환 방식과 문화적 맥락을 더 자세히 설명합니다.
                </p>
              </div>

              <div className="rounded-3xl border bg-card/70 p-8 md:p-10 shadow-soft">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-muted/60 flex items-center justify-center">
                      <Pyramid className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <p className="font-serif text-lg text-soft-black">박물관 도슨트 노트</p>
                      <p className="font-inter text-sm text-muted-foreground">
                        읽기 쉬운 정보 중심 섹션
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="font-inter text-[0.95rem] text-gray leading-loose break-keep">
                      - 상형문자는 ‘그림 문자’로 알려져 있지만, 실제로는 의미(상징)와 소리(음가)를
                      함께 쓰는 복합 체계였습니다.
                    </p>
                    <p className="font-inter text-[0.95rem] text-gray leading-loose break-keep">
                      - 이름을 둘러싼 타원형 테두리(카르투슈)는 보호와 영속성의 상징으로 여겨졌습니다.
                    </p>
                    <p className="font-inter text-[0.95rem] text-gray leading-loose break-keep">
                      - 본 서비스는 교육·엔터테인먼트 목적의 ‘발음 기반 심미적 변환’에 초점을 둡니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: How it Works (The Logic) */}
          <section aria-labelledby="section-logic" className="scroll-mt-24">
            <div className="space-y-6" id="section-logic">
              <SectionHeader
                icon={<Feather className="h-10 w-10" />}
                title="가디너 리스트(Gardiner's Sign List) 기반 변환"
                subtitle="이 번역기는 고대 이집트 학자 앨런 가디너가 정리한 음성 기호표를 참고하는 방식에서 영감을 받아, 당신의 한글/영문 이름을 가장 근접한 상형문자 ‘발음 이미지’로 치환합니다."
              />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border bg-card/60 p-5 shadow-soft">
                  <div className="flex items-start gap-3">
                    <ScrollText className="h-6 w-6 text-gold" />
                    <div className="space-y-2">
                      <p className="font-serif text-lg text-soft-black">1) 이름을 로마자로 정리</p>
                      <p className="font-inter text-[0.95rem] text-gray leading-loose break-keep">
                        한글 이름은 로마자 표기법 규칙에 따라 1차로 영문 형태로 바꾼 뒤, 사용자가 원하면
                        철자를 직접 수정할 수 있습니다.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border bg-card/60 p-5 shadow-soft">
                  <div className="flex items-start gap-3">
                    <Feather className="h-6 w-6 text-gold" />
                    <div className="space-y-2">
                      <p className="font-serif text-lg text-soft-black">2) 문자 단위로 매핑</p>
                      <p className="font-inter text-[0.95rem] text-gray leading-loose break-keep">
                        로마자 알파벳을 대응하는 상형문자 유니코드 심볼로 매핑해, 고대 문헌의 느낌을
                        살린 결과를 만들어냅니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border bg-card/60 p-6 md:p-8 shadow-soft">
                <div className="flex items-center gap-3">
                  <Feather className="h-6 w-6 text-gold" />
                  <h3 className="font-serif text-xl text-soft-black">간단 매핑 예시</h3>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border bg-background/60 p-4">
                    <p className="font-inter text-sm text-muted-foreground">A</p>
                    <p className="mt-1 font-serif text-lg text-soft-black">Vulture (예시)</p>
                    <p className="mt-3 font-inter text-[0.95rem] text-gray leading-loose break-keep">
                      알파벳 A를 대표하는 상형 기호로 치환합니다.
                    </p>
                  </div>

                  <div className="rounded-2xl border bg-background/60 p-4">
                    <p className="font-inter text-sm text-muted-foreground">B</p>
                    <p className="mt-1 font-serif text-lg text-soft-black">Foot (예시)</p>
                    <p className="mt-3 font-inter text-[0.95rem] text-gray leading-loose break-keep">
                      알파벳 B를 대표하는 상형 기호로 치환합니다.
                    </p>
                  </div>
                </div>

                <p className="mt-8 font-inter text-[0.95rem] text-muted-foreground leading-loose break-keep">
                  참고: 고대 이집트어는 시대·지역·학설에 따라 해석이 달라질 수 있습니다. 본 서비스는
                  학술적 번역이라기보다, 이름을 ‘고대 분위기’로 표현하는 교육·엔터테인먼트 목적의
                  변환입니다.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: What is a Cartouche? (The Value) */}
          <section aria-labelledby="section-cartouche" className="scroll-mt-24">
            <div className="space-y-6" id="section-cartouche">
              <SectionHeader
                icon={<Shield className="h-10 w-10" />}
                title="왕의 이름을 감싸는 보호막, 카르투슈"
                subtitle="결과 화면에 나타나는 타원형 테두리는 ‘카르투슈(Cartouche)’라고 하며, 고대 이집트에서 파라오의 이름을 감싸 악귀로부터 보호하고 영원한 생명을 기원하는 의미를 담고 있습니다."
              />

              <div className="rounded-3xl border bg-card/60 p-6 md:p-8 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-muted/60 flex items-center justify-center">
                    <Shield className="h-7 w-7 text-gold" />
                  </div>
                  <div className="space-y-3">
                    <p className={bodyTextClassName}>
                      카르투슈는 단순한 장식이 아니라, ‘이름’이라는 정체성을 상징적으로 보호하는
                      프레임이었습니다. 이 번역기는 그 형식을 빌려, 당신의 이름을 특별한 표식처럼
                      남길 수 있도록 디자인했습니다.
                    </p>
                    <p className="font-inter text-[0.95rem] text-muted-foreground leading-loose break-keep">
                      실제 고고학적 표기와 1:1로 일치하지 않을 수 있으며, 결과는 심미적/상징적 표현을
                      포함합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: FAQ */}
          <section aria-labelledby="section-faq" className="scroll-mt-24">
            <div className="space-y-6" id="section-faq">
              <SectionHeader
                icon={<HelpCircle className="h-10 w-10" />}
                title="자주 묻는 질문 (FAQ)"
                subtitle="서비스 사용 전에 많이 궁금해하시는 질문을 모았습니다."
              />

              <div className="rounded-3xl border bg-card/60 p-2 md:p-4 shadow-soft">
                <Accordion type="single" collapsible className="px-4">
                  <AccordionItem value="q1">
                    <AccordionTrigger className="font-inter text-soft-black">
                      이 번역 결과로 타투를 해도 되나요?
                    </AccordionTrigger>
                    <AccordionContent className="font-inter text-[0.95rem] text-gray leading-loose break-keep">
                      네. 이 서비스는 발음 기반의 심미적 변환이므로 디자인적으로 활용하기 좋습니다.
                      다만 개인의 의미 부여가 중요한 만큼, 최종 도안은 본인이 충분히 검토한 뒤
                      결정하시길 권장합니다.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q2">
                    <AccordionTrigger className="font-inter text-soft-black">
                      한글 이름은 어떻게 변환되나요?
                    </AccordionTrigger>
                    <AccordionContent className="font-inter text-[0.95rem] text-gray leading-loose break-keep">
                      로마자 표기법에 따라 영문으로 1차 변환한 뒤, 알파벳 단위로 상형문자 심볼에
                      매핑됩니다. 자동 변환된 철자는 연필 아이콘을 눌러 직접 수정할 수 있습니다.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="q3">
                    <AccordionTrigger className="font-inter text-soft-black">
                      결과가 100% 정확한 고대 이집트어 번역인가요?
                    </AccordionTrigger>
                    <AccordionContent className="font-inter text-[0.95rem] text-gray leading-loose break-keep">
                      아닙니다. 본 서비스는 고고학적 정확성을 100% 보장하지 않으며, 교육 및 유희
                      목적으로 제작되었습니다. 고대 이집트어는 시대·학설에 따라 표기가 달라질 수 있고,
                      현대 이름을 완전하게 대응시키기 어렵습니다.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-soft-black">
        <div className="mx-auto w-full max-w-3xl px-4 md:px-6 py-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-gold" />
              <p className="font-serif text-base text-alabaster">
                Ancient Egypt Lab
              </p>
            </div>

            <p className="font-inter text-sm text-alabaster/80 leading-relaxed">
              Contact:{" "}
              <a
                href="mailto:jowheemin@gmail.com"
                className="underline underline-offset-4 hover:text-alabaster"
              >
                jowheemin@gmail.com
              </a>
              {" "}(오류 제보 및 문의)
            </p>

            <p className="font-inter text-sm text-alabaster/70 leading-relaxed">
              © 2025 Ancient Egypt Lab. All rights reserved.
            </p>

            <p className="font-inter text-xs text-alabaster/60 leading-relaxed">
              Disclaimer: 이 서비스는 엔터테인먼트 및 교육 목적으로 제작되었습니다. 본 번역기는
              고고학적 정확성을 100% 보장하지 않으며, 결과는 참고용으로만 제공됩니다.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
