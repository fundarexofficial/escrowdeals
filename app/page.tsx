// app/page.tsx
import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { TierComparison } from "@/components/home/tier-comparison";
import { HowItWorks } from "@/components/home/how-it-works";
import { TrustpilotSection } from "@/components/home/trustpilot-section";
import { ProofSection } from "@/components/home/proof-section";
import { FAQSection } from "@/components/home/faq-section";
import { CommunitySection } from "@/components/home/community-section";
import { Footer } from "@/components/home/footer";

export default function HomePage() {
  // Optional: keep for debugging, but consider removing in production
  // console.log("[v0] Homepage rendering");

  return (
    <div className="min-h-screen bg-slate-950">
      <HeroSection />
      <StatsSection />
      <TierComparison />
      <HowItWorks />
      <TrustpilotSection />
      <ProofSection />
      <FAQSection />
      <CommunitySection />
      <Footer />
    </div>
  );
}