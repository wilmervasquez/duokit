export async function fetchJSON(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    return { data: null, error: true };
  }
  const data = await response.json();
  return { data: data, error: false };
}
