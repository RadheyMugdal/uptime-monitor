import Hero from "@/modules/landing-page/ui/components/hero";
import FeaturesSection from "@/modules/landing-page/ui/components/features-section";
import PricingSection from "@/modules/landing-page/ui/components/pricing-section";
import IntegrationsSection from "@/modules/landing-page/ui/components/integrations-section";
import CTASection from "@/modules/landing-page/ui/components/cta-section";
import Footer from "@/modules/landing-page/ui/components/footer";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Uptime Monitor",
  description:
    "Professional uptime monitoring for websites, APIs, and services. Get instant alerts via Email, Discord, Slack, and Webhooks.",
  url: "https://uptimemonitor.com",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  offers: [
    {
      "@type": "Offer",
      name: "Free Plan",
      price: "0",
      priceCurrency: "USD",
      description:
        "5 monitors, email notifications only, 24h history, 15 min check frequency",
    },
    {
      "@type": "Offer",
      name: "Pro Plan",
      price: "12",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "RecurringPaymentsPriceSpecification",
        billingDuration: "P1M",
      },
      description:
        "30 monitors, all notification channels, 30d history, 10 min frequency",
    },
    {
      "@type": "Offer",
      name: "Business Plan",
      price: "39",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "RecurringPaymentsPriceSpecification",
        billingDuration: "P1M",
      },
      description: "100 monitors, 6 months history, 5 min frequency",
    },
  ],
  featureList: [
    "Real-time monitoring",
    "Comprehensive dashboard",
    "Incident management",
    "Instant notifications",
    "Flexible check intervals",
    "Reliable & secure",
  ],
  provider: {
    "@type": "Organization",
    name: "Uptime Monitor",
    url: "https://uptimemonitor.com",
  },
};

const page = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <FeaturesSection />
      <IntegrationsSection />
      <PricingSection currentPlan="free" />
      <CTASection />
      <Footer />
    </>
  );
};

export default page;
