import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: "1dkn960a",
  dataset: "production",
  apiVersion: "2022-03-07",
  useCdn: false,
});

