# Track 3 – AI · Task 3: Explain your thinking

**What problem does your feature or prompt actually solve for Jordan?**

Jordan has a communications degree, casual hospitality work, and 40+ applications with almost no responses. He cannot see *why* he is passed over or *what* to do next. Track 3 tackles two linked problems. The Task 1 feature, a Skills Gap and Project Pathway Builder, compares Jordan's DHP against matching job ads, names the exact missing skills, and recommends projects and tests that turn effort into verified evidence. The Task 2 prompt then articulates his messy raw notes into one structured, schema-valid DHP page, so his story, skills, and proof read clearly to employers instead of getting lost.

**What risks or limitations should the team know about before building it?**

Outputs are only as good as the input and job data, so thin or biased ads produce weak or skewed advice. The LLM can hallucinate or overstate skills, so claims need human review and "pending" labelling. VEI/VCI/match scores are currently mock values, not a defensible model. Larger models sometimes need a repair pass for valid JSON, adding cost and latency. Finally, store verification status, not raw documents, and require consent before anything is shown publicly.
