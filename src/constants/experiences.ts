export interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
}

export const professionalExperiences: Experience[] = [
  {
    id: 1,
    title: "Technico-Commercial",
    company: "Murprotec",
    period: "2020 - 2022",
    description: "Responsible for providing technical solutions to moisture-related problems in buildings. Conducted on-site diagnostics and presented tailored solutions to clients."
  },
  {
    id: 2,
    title: "Technico-Commercial",
    company: "CTBG",
    period: "2019 - 2020",
    description: "Specialized in building inspections and diagnostics. Performed thorough examinations of properties and communicated technical findings to clients."
  },
  {
    id: 3,
    title: "Sales Consultant",
    company: "Fnac",
    period: "2018 - 2019",
    description: "Advised customers on technology products and solutions. Developed deep product knowledge to provide personalized recommendations."
  }
];

export const personalProjects: Experience[] = [
  {
    id: 1,
    title: "Founder",
    company: "Wash Center",
    period: "2022 - Present",
    description: "Established and managing a car wash center focused on quality service and customer satisfaction. Implemented automated systems for operational efficiency."
  },
  {
    id: 2,
    title: "Co-owner",
    company: "Restaurant Business",
    period: "2021 - Present",
    description: "Co-founded a restaurant with an innovative concept. Overseeing operations, marketing strategy, and customer experience optimization."
  },
  {
    id: 3,
    title: "Founder",
    company: "Delivery Service",
    period: "2020 - 2022",
    description: "Created a local delivery service to meet the growing demand during pandemic restrictions. Developed logistics systems and customer relationship management."
  }
];