export function addFivePercent(value: number): number {
  const updatedPrice = value * 1.05;
  return Math.ceil(updatedPrice / 50) * 50;
}

export async function downloadFileWithURL(url: string, filename: string) {
  const response = await fetch(url);
  const blob = await response.blob();

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}

export async function downloadFileWithPath(path: string, filename: string) {
  downloadFileWithURL(
    process.env.VITE_BASE_API_URL + path + filename,
    filename
  );
}
