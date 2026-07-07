/**
 * ============================================================
 *  SITE CONTENT — edit this file to update the whole site.
 *  You never need to touch index.html, style.css or script.js
 *  just to change text, add a job, or add a project.
 * ============================================================
 */

const CONFIG = {

  // ---------- Identity ----------
  name: "Shwetabh Suman",
  initials: "SS",
  title: "Software Engineer",
  roles: [                       // cycles in the hero "typed" line
    "Full-Stack Developer",
    "Angular Developer",
    "Spring Boot Developer",
    "API Designer",
    "Problem Solver"
  ],
  location: "Bengaluru, India",
  status: "open to new opportunities",   // shown as a terminal-style status line

  // ---------- Links ----------
  // NOTE: your resume lists "linkedin.com/in/shwetabh-suman" and your LinkedIn
  // export lists "linkedin.com/in/shwetabhsuman" (no hyphen). Pick the correct
  // one and delete this comment.
  email: "shwetabhsuman3@gmail.com",
  phone: "+91 7004802726",        // set to "" to hide the phone number entirely
  linkedin: "https://www.linkedin.com/in/shwetabh-suman",
  github: "https://github.com/shwetabhsuman9",
  githubUsername: "shwetabhsuman9",   // used to auto-pull public repos, see below
  resumeFile: "Shwetabh_suman_resume.pdf", // drop a PDF with this exact name next to index.html

  // ---------- Summary ----------
  summary: `Full-stack software engineer with 4+ years building fintech products
  end-to-end across Angular and Spring Boot. Founding engineer on a sustainability-linked
  lending platform now live with 5 banks — from architecting the first UI workflows to
  hardening production releases. I care about clean APIs, fast test feedback loops, and
  leaving code better than I found it.`,

  // ---------- Spec-sheet stats (About section) ----------
  stats: [
    { value: "4+", label: "years in production fintech" },
    { value: "5",  label: "banks live on the platform" },
    { value: "15+", label: "shared Angular components shipped" },
    { value: "90%", label: "UI test coverage, up from ~30%" },
    { value: "1100+", label: "SonarQube violations resolved" },
    { value: "70+", label: "files migrated Angular v16 → v20" }
  ],

  // ---------- Experience (rendered as a timeline, newest first) ----------
  experience: [
    {
      role: "Software Engineer",
      company: "Finastra",
      location: "Bengaluru, India",
      start: "Jun 2025",
      end: "Present",
      points: [
        "Built 15+ reusable Angular components and utilities across 5 apps, cutting repetitive setup work by ~30%.",
        "Led the Angular v16 → v20 migration across 70+ files, fixing breaking changes and updating third-party dependencies with 0 regressions.",
        "Triaged and fixed 1,100+ SonarQube violations and 15+ production Spring Boot bugs, reducing client-facing escalations.",
        "Took UI test coverage from ~30% to ~90% by setting up Jest from scratch and introducing AI-assisted test generation.",
        "Managed Docker image promotions across dev, QA, and pre-prod as part of quarterly release cycles."
      ]
    },
    {
      role: "Associate Software Engineer",
      company: "Finastra",
      location: "Bengaluru, India",
      start: "Jul 2022",
      end: "Jun 2025",
      points: [
        "Owned feature delivery end-to-end across Angular, Java and Spring Boot, resolving 80+ bugs across every release cycle for three years.",
        "Built 3 internal Angular libraries adopted across squads, removing the need to rewrite shared interceptors, form controls and directives per feature.",
        "Cut initial load time by ~30% using lazy loading and OnPush change detection.",
        "Aligned Angular service contracts with REST API schemas alongside backend engineers, cutting integration bugs in QA by ~15%."
      ]
    },
    {
      role: "Software Engineer Intern",
      company: "Finastra",
      location: "Bengaluru, India",
      start: "Jan 2022",
      end: "Jul 2022",
      points: [
        "Worked hands-on with the legacy Loan IQ desktop application and joined its Angular-based modernization effort.",
        "Shipped production-ready UI components and validations within the first few months, converting to full-time on that work."
      ]
    }
  ],

  // ---------- Skills ----------
  skills: [
    { category: "Frontend",  items: ["Angular (v12–v20)", "TypeScript", "JavaScript", "React", "HTML5", "CSS3", "Jest"] },
    { category: "Backend",   items: ["Java", "Spring Boot", "REST APIs", "Microservices"] },
    { category: "Data",      items: ["MySQL", "SQL"] },
    { category: "Tooling",   items: ["Git", "GitHub", "Docker", "Postman", "JIRA", "VS Code"] },
    { category: "Practice",  items: ["Agile", "Data Structures & Algorithms", "Unit Testing", "CI/CD"] }
  ],

  // ---------- Flagship project (proprietary — no public repo, shown manually) ----------
  flagshipProject: {
    name: "ESG Service — Sustainability-Linked Lending Platform",
    role: "Founding Engineer",
    badge: "Proprietary · Finastra",
    description: "Live with 5 banks. Architected the platform's core UI workflows from MVP onward — pricing logic, approvals, change requests, delayed and revised reporting, and audit history — and delivered every release since.",
    tags: ["Angular", "Spring Boot", "REST API", "Fintech"]
  },

  // ---------- GitHub auto-fetch ----------
  // The projects section pulls your public, non-forked repos live from the
  // GitHub API (github.com/<githubUsername>) sorted by most recently updated.
  // Push a new project to GitHub and it will appear here automatically —
  // nothing to edit. If the API is unreachable or rate-limited, the site
  // silently falls back to the list below.
  githubProjectCount: 6,

  fallbackProjects: [
    {
      name: "your-project-name",
      description: "A short description of the project goes here.",
      url: "https://github.com/shwetabhsuman9",
      tags: ["Java", "Spring Boot"]
    }
  ],

  // ---------- Education ----------
  education: [
    {
      school: "Institute of Technical Education & Research, Bhubaneswar",
      degree: "B.Tech, Computer Science Engineering",
      period: "2018 – 2022",
      detail: "CGPA 8.64 / 10.0"
    },
    {
      school: "DAV Public School, Bistupur",
      degree: "AISSCE (Senior Secondary), Science with Computer Science",
      period: "2016 – 2018"
    },
    {
      school: "Ramakrishna Mission English School",
      degree: "ICSE (Matriculation)",
      period: "up to 2016"
    }
  ],

  // ---------- Certifications & honors ----------
  certifications: [
    "Problem Solving (Basic) — HackerRank",
    "Microservices: The Big Picture",
    "Accounting Foundations",
    "Financial Basics Everyone Should Know",
    "Indian Programming Camp 2020"
  ],
  honors: [
    "Silver Badge in Problem Solving — HackerRank",
    "3★ Coder — HackerRank"
  ]
};
