function formatFileSize(fileSizeInBytes?: number) {
  if (fileSizeInBytes === undefined) return "N/A";
  if (fileSizeInBytes === 0) return "0 Bytes";

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(fileSizeInBytes) / Math.log(1024));

  return `${parseFloat((fileSizeInBytes / Math.pow(1024, i)).toFixed(2))} ${
    sizes[i]
  }`;
}

export default formatFileSize;
