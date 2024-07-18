export function downloadContent(
  content: any,
  fileName?: string,
  preview?: boolean,
  blobOptions?: Blob
) {
  const eleLink = document.createElement("a");
  if (!preview) {
    eleLink.download = fileName || "下载.xlsx";
  } else {
    eleLink.target = "_blank";
  }
  eleLink.style.display = "none";

  const blob = content instanceof Blob ? content : new Blob([content], blobOptions);
  eleLink.href = URL.createObjectURL(blob);

  document.body.appendChild(eleLink);
  eleLink.click();
  document.body.removeChild(eleLink);
}
