export default async (path: string): Promise<string> => {
  const res = await fetch(path);
  const text = await res.text();
  return text;
};
