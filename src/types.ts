export interface Project {
  id: string;
  title: string;
  category: 'Strategy' | 'Design' | 'Technology';
  image: string;
  description: string;
  longDescription: string;
  client: string;
  duration: string;
  role: string;
  metrics: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'quarter';
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  goals: string[];
  message?: string;
  createdAt: string;
}
