export interface Skill {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export const skills: Skill[] = [
  {
    id: 1,
    title: "Web Development",
    description: "Creation of modern, responsive websites and web applications using the latest technologies.",
    icon: "code",
    color: "#00DCD9"
  },
  {
    id: 2,
    title: "E-commerce",
    description: "Building and optimizing online stores with focus on user experience and conversion rates.",
    icon: "shopping-cart",
    color: "#FF7D00"
  },
  {
    id: 3,
    title: "AI Integration",
    description: "Implementation of AI solutions to automate processes and enhance business operations.",
    icon: "brain",
    color: "#7C3AED"
  },
  {
    id: 4,
    title: "Business Strategy",
    description: "Development of effective business strategies to drive growth and maximize profitability.",
    icon: "line-chart",
    color: "#10B981"
  },
  {
    id: 5,
    title: "Tech Consulting",
    description: "Providing expert advice on technology implementation and digital transformation.",
    icon: "lightbulb",
    color: "#F59E0B"
  },
  {
    id: 6,
    title: "Automation",
    description: "Creating automated systems to increase efficiency and reduce manual workload.",
    icon: "settings",
    color: "#3B82F6"
  }
];