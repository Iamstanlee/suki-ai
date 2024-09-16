export type Feed = {
  id: string;
  category: string;
  tags?: string[];
  title: string;
  text_summary: string;
  audio_summary?: string;
  fullstory: string;
  date: string;
  source: string;
  author?: {
    name: string;
  };
  source_url: string;
  type?: string; // is it a newsletter, podcast etc
};
