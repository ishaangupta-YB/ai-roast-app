export enum PopularPlan {
  NO = 0,
  YES = 1,
}

export interface PlanProps {
  title: string;
  popular: PopularPlan;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
  href: string;
}

export const plans: PlanProps[] = [
  {
    title: "Free",
    popular: PopularPlan.NO,
    price: 0,
    description:
      "Perfect for individuals looking to get started with basic features. Enjoy limited access to our AI tools and community support.",
    buttonText: "Start Free Trial",
    benefitList: [
      "1 team member",
      "1 GB storage",
      "Up to 2 pages",
      "Community support",
      "AI assistance",
    ],
    href: "/pricing/free",
  },
  {
    title: "Premium",
    popular: PopularPlan.YES,
    price: 45,
    description:
      "Ideal for small teams who need more storage and priority support. Get access to advanced features and tools.",
    buttonText: "Get Started",
    benefitList: [
      "4 team members",
      "8 GB storage",
      "Up to 6 pages",
      "Priority support",
      "AI assistance",
    ],
    href: "/pricing/premium",
  },
  {
    title: "Enterprise",
    popular: PopularPlan.NO,
    price: 120,
    description:
      "Best for large organizations that need extensive support and storage. Enjoy all features with maximum benefits.",
    buttonText: "Contact Us",
    benefitList: [
      "10 team members",
      "20 GB storage",
      "Up to 10 pages",
      "Phone & email support",
      "AI assistance",
    ],
    href: "/pricing/enterprise",
  },
];
