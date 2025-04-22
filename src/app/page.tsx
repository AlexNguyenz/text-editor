import TiptapEditor from "@/components/tiptap-editor";
import React from "react";

const sampleMarkdown = `
# [Your Full Name]
## Contact Information
- **Email:** your.email@example.com
- **Phone:** +1234567890
- **LinkedIn:** linkedin.com/in/yourprofile
- **GitHub:** github.com/yourusername
- **Portfolio:** yourportfolio.com
- **Location:** [City, Country]
## Professional Summary
[Write a concise 2-4 sentence paragraph about your background, technical expertise, and career goals as a developer]
## Technical Skills
- **Programming Languages:** [e.g., JavaScript, Python, Java, C#, TypeScript]
- **Frontend:** [e.g., React, Vue.js, Angular, HTML5, CSS3, SASS]
- **Backend:** [e.g., Node.js, Django, Flask, Spring Boot, Express.js]
- **Databases:** [e.g., MongoDB, PostgreSQL, MySQL, Firebase]
- **Cloud Services:** [e.g., AWS, Google Cloud, Azure, Heroku]
- **DevOps:** [e.g., Docker, Kubernetes, CI/CD, Jenkins]
- **Testing:** [e.g., Jest, Mocha, Selenium, JUnit]
- **Other Tools:** [e.g., Git, Jira, Figma, Webpack]
## Work Experience
### [Company Name] - [Position Title]
*[Start Date] - [End Date or "Present"]*
- Developed and maintained [specific features or applications] using [technologies]
- Improved [performance/security/user experience] by [specific action], resulting in [measurable outcome]
- Collaborated with cross-functional teams to deliver [project] within [timeframe]
- [Other significant achievements or responsibilities]
### [Company Name] - [Position Title]
*[Start Date] - [End Date]*
- Built [specific features or applications] using [technologies]
- Implemented [specific technical solution] that [solved what problem]
- Participated in code reviews and mentored junior developers
- [Other significant achievements or responsibilities]
## Projects
### [Project Name]
- **Description:** [Brief description of the project and your role]
- **Technologies:** [List of technologies used]
- **Link:** [GitHub repo or live demo]
- **Key Features:**
  - [Feature 1]
  - [Feature 2]
  - [Feature 3]
### [Project Name]
- **Description:** [Brief description of the project and your role]
- **Technologies:** [List of technologies used]
- **Link:** [GitHub repo or live demo]
- **Key Features:**
  - [Feature 1]
  - [Feature 2]
  - [Feature 3]
## Education
### [University/College Name]
- **Degree:** [Bachelor's/Master's/PhD] in [Field of Study]
- **Duration:** [Start Year] - [End Year]
- **Relevant Coursework:** [List relevant courses]
- **GPA:** [Your GPA] (if noteworthy)
## Certifications
- **[Certification Name]** - [Issuing Organization] - [Year]
- **[Certification Name]** - [Issuing Organization] - [Year]
## Additional Experience
- **Open Source Contributions:** [List significant contributions]
- **Hackathons:** [List notable hackathons and achievements]
- **Tech Community:** [Meetups, conferences, or communities you're active in]
- **Technical Writing:** [Any blog posts, tutorials, or documentation you've written]
## Languages
- **English:** [Proficiency level]
- **[Other Language]:** [Proficiency level]
`;

const Home: React.FC = () => {
  return (
    <main style={{ maxWidth: 700, margin: "0 auto", padding: 40 }}>
      <h2>Tiptap Editor Demo</h2>
      <TiptapEditor markdown={sampleMarkdown} />
    </main>
  );
};

export default Home;
