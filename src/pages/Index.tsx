import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import HieroglyphTranslator from "@/components/HieroglyphTranslator";
import LandingSections from "@/components/LandingSections";

const Index = () => {
  return (
    <div className="alabaster-bg min-h-screen">
      {/* Hero: Above the fold */}
      <section className="min-h-[100dvh] flex flex-col items-center justify-center px-4 md:px-6 py-10">
        <div className="relative z-10 w-full flex flex-col items-center">
          <HieroglyphTranslator />

          <motion.div
            className="mt-10 flex flex-col items-center gap-2 text-muted-foreground"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            <ArrowDown className="h-5 w-5" />
            <span className="font-inter text-xs">더 알아보기</span>
          </motion.div>
        </div>
      </section>

      {/* Content: Below the fold */}
      <LandingSections />
    </div>
  );
};

export default Index;
