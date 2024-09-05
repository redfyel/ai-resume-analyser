import { PineconeClient } from "pinecone-client";

const pinecone = new PineconeClient(process.env.PINECONE_API_KEY);

export const indexResume = async (resumeText, analysis) => {
  await pinecone.upsert("resumes", [
    {
      id: "resume_id",
      values: { text: resumeText, analysis },
    },
  ]);
};

export const searchJobs = async (analysis) => {
  const results = await pinecone.query("jobs", {
    text: analysis,
    topK: 5,
  });
  return results.matches;
};
