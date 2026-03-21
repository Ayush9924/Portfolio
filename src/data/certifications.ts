export interface CertificationRecord {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  url: string;
  color: string;
  watermark: string;
}

export const certifications: CertificationRecord[] = [
  {
    id: "CERT-META",
    title: "META FRONT-END DEVELOPER",
    issuer: "COURSERA / META",
    url: "https://www.coursera.org/account/accomplishments/verify/8KVUKBMR7VTW",
    color: "#0064e0", // Meta Blue
    watermark: "META"
  },
  {
    id: "CERT-IIT",
    title: "IIT BHUBANESHWAR PROGRAM",
    issuer: "IIT BHUBANESHWAR",
    url: "https://drive.google.com/file/d/1iCYxwjEGENAJRnj-u8eunDXabXvHSjDX/view?usp=sharing",
    color: "#ff2b2b", // System Red
    watermark: "IIT"
  },
  {
    id: "CERT-INTERN",
    title: "FIELD INTERNSHIP CLEARANCE",
    issuer: "CORPORATE PARTNERSHIP",
    url: "https://drive.google.com/file/d/1aopgVS1348zLPlhpNQwOZ4MCLiUBiyQ5/view?usp=sharing",
    color: "#f5a623", // Warning Orange
    watermark: "INTERN"
  },
  {
    id: "CERT-UNI",
    title: "UNIVERSITY COURSE CERTIFICATION",
    issuer: "ACADEMIC INSTITUTION",
    url: "https://drive.google.com/file/d/12HCrfFJmRkwlBaOTTiy21oWAGzrOErXw/view?usp=sharing",
    color: "#ffffff", // Standard White
    watermark: "DEGREE"
  }
];
