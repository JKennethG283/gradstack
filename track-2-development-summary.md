# Track 2 Development: Task 1, Task 2, and Task 3 Summary

## Overview

My idea is to design the Gradstack Digital Human Profile, or DHP, as more than a normal resume. The DHP should help graduates like Jordan become visible, trusted, and connected to relevant opportunities.

Jordan is a graduate who has applied for many jobs but has received very little response. Because of this, the product should not only help him build a profile, but also help him understand what he is ready for, what information he still needs to provide, and what is happening after he applies.

## Task 1: Data Model

For Task 1, I would design a data model that stores both the human side of Jordan's profile and the verification information that employers may need.

The DHP should store normal profile information such as skills, projects, education, work experience, career goals, and personal story. However, it should also support evidence and verification, such as working rights, licences, degree verification, police checks, and identity checks.

I would separate the data into clear categories:

| Data Category | Purpose | Example Fields |
|---|---|---|
| Account and Contact Data | Stores basic user and login information | name, email, phone number, location, login method |
| DHP Profile Data | Stores the human side of the user beyond a resume | story, goals, values, work style, career interests |
| Education and Experience Data | Stores traditional resume-style information | degree, university, previous roles, achievements |
| Skills and Projects Data | Shows what the user can do and what they have built | skills, projects, tools used, project outcomes |
| Evidence Data | Supports claims made in the profile | resume, portfolio links, certificates, project files |
| Verification and Compliance Data | Helps employers trust important information | ID status, working rights status, licence status, police check status, degree verification |
| Consent and Visibility Data | Gives the user control over what employers can see | public profile fields, private fields, employer access permissions |
| Opportunity Requirements Data | Stores what employers require for each opportunity | required skills, required licences, working rights, verification needs |
| Application Tracking Data | Stores the jobs or opportunities the user has applied for | application status, date applied, employer viewed status, result |

Sensitive information should be handled carefully. For example, instead of permanently storing and showing a passport or ID document, the system should store a verification result such as `ID verified`, `working rights verified`, the verification provider, expiry date, and user consent status.

This makes the DHP different from a normal resume because it combines skills, story, evidence, trust, verification, and user-controlled visibility.

## Task 2: Prototype

For Task 2, I would build a focused prototype of Jordan's first experience in Gradstack. The prototype would be a DHP onboarding and readiness dashboard.

The first part would welcome Jordan and guide him through a simple setup flow. Jordan could enter basic details such as name, contact information, career interests, skills, projects, and goals. There could also be a mock resume upload or LinkedIn import feature that auto-fills sample information from his existing profile.

After onboarding, Jordan would see a readiness dashboard that helps him understand where he stands.

| Dashboard Section | Purpose |
|---|---|
| DHP Completeness | Shows how complete Jordan's profile is |
| Ready Opportunities | Shows jobs or opportunities Jordan can apply for now |
| Needs More Information | Shows opportunities that require extra information such as working rights, licences, or ID verification |
| Growth Opportunities | Shows opportunities Jordan is close to being qualified for, but may need more skills or experience |
| Recommended Next Action | Suggests what Jordan should do next to improve his profile |
| My Applications | Shows every opportunity Jordan has already applied for and its current status |

The key interaction would be that if Jordan clicks on an opportunity he is not fully ready for, the app shows exactly what is missing. For example, it might say that he needs to add working rights, upload a licence, or provide project evidence before applying.

I would also include an Application Tracker because Jordan's original problem is that he has applied for many jobs and received very little feedback. This tracker would help him see what is happening after he applies.

Possible application statuses:

| Status | Meaning |
|---|---|
| Submitted | Jordan has applied for the opportunity |
| Viewed | The employer has opened or viewed the application |
| More Information Needed | The employer or system needs extra details |
| Shortlisted | Jordan is being considered |
| Rejected | The application was unsuccessful |
| Accepted or Interview | Jordan has moved forward in the process |

This feature helps Jordan feel less invisible because he can see progress instead of sending applications and hearing nothing back.

## Task 3: Thinking

My thinking started with the main goal of Gradstack: helping graduates like Jordan become visible, trusted, and connected. Jordan does not only need another job board. He needs a platform that helps employers understand his full potential and gives him clearer feedback during the application process.

I considered three main groups: users, employers, and developers.

| Group | Need |
|---|---|
| Users | A fast, simple, and safe way to build a profile, understand opportunities, and track applications |
| Employers | Reliable information about skills, evidence, working rights, licences, and verification |
| Developers | A structured data model that is reusable, ethical, easy to extend, and clear for future features |

The main trade-off is between collecting enough information to make the DHP useful and trustworthy, while not overwhelming the user or collecting unnecessary sensitive data. To solve this, I would separate normal profile information from sensitive verification data and give users control over what employers can see.

With more time, I would explore privacy rules, third-party verification providers, stronger consent controls, employer access requests, and how application status updates should work fairly for both users and employers.

## Final Improved Concept

The improved idea is to build a DHP system that helps Jordan:

- Create a profile that shows more than a resume
- Add evidence for skills, projects, and education
- Verify important information such as working rights or licences when needed
- Control what information employers can see
- Understand which opportunities he is ready for
- See what information is missing for other opportunities
- Track applications after applying
- Feel less invisible in the hiring process

This keeps the development task focused while still showing strong product thinking, data modelling, privacy awareness, and relevance to Gradstack's real challenge.

