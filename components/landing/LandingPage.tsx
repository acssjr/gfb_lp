import { AnalyticsInitializer } from "@/components/landing/AnalyticsInitializer";
import { AnimatedLanding } from "@/components/landing/AnimatedLanding";
import { AtmosphereGallery } from "@/components/landing/AtmosphereGallery";
import { CohortSection } from "@/components/landing/CohortSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { FinalCta } from "@/components/landing/FinalCta";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { LearningSection } from "@/components/landing/LearningSection";
import { LevelingSection } from "@/components/landing/LevelingSection";
import { LocationSection } from "@/components/landing/LocationSection";
import { MobileConversionBar } from "@/components/landing/MobileConversionBar";
import { PricingSection } from "@/components/landing/PricingSection";
import { ProofSection } from "@/components/landing/ProofSection";
import { RecognitionSection } from "@/components/landing/RecognitionSection";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { TeamSection } from "@/components/landing/TeamSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { WhyGfbSection } from "@/components/landing/WhyGfbSection";

export function LandingPage() {
  return (
    <AnimatedLanding>
      <AnalyticsInitializer />
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main id="conteudo">
        <HeroSection />
        <RecognitionSection />
        <ProofSection />
        <AtmosphereGallery />
        <HowItWorks />
        <LearningSection />
        <WhyGfbSection />
        <TeamSection />
        <PricingSection />
        <TestimonialsSection />
        <LevelingSection />
        <CohortSection />
        <LocationSection />
        <FaqSection />
        <FinalCta />
      </main>
      <SiteFooter />
      <MobileConversionBar />
    </AnimatedLanding>
  );
}
