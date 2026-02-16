// data/education.ts
export interface EducationItem {
  school: string;
  degree: string;
  grade?: string;
  logo?: string; // School logo emoji or URL
  location: string;
  period: string;
  coursework?: string[];
}

export const education: EducationItem[] = [
  {
    school: "Ecole Polytechnique Fédérale de Lausanne (EPFL)",
    degree: "Master in Data Science",
    grade: "5.4/6",
    logo: "🎓",
    location: "Lausanne, Switzerland",
    period: "2023 – 2026",
    coursework: [
      "Natural Language Processing",
      "Foundation Models",
      "Deep Learning",
      "Mathematics",
      "HPC Infrastructure",
    ],
  },
  {
    school: "University of Applied Science",
    degree: "Bachelor in Computer Science and Communication Systems",
    grade: "5.6/6",
    logo: "📚",
    location: "Neuchatel, Switzerland",
    period: "2020 – 2023",
    coursework: [
      "Data Structures",
      "Algorithms",
      "Databases",
      "Computer Systems",
      "Machine Learning",
    ],
  },
];
