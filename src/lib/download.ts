/**
 * Force download a file by creating a temporary link element
 * This ensures the file is downloaded rather than opened in the browser
 */
export const forceDownload = (url: string, filename: string): void => {
  // Create a temporary anchor element
  const link = document.createElement('a');
  
  // Set the href and download attributes
  link.href = url;
  link.download = filename;
  
  // Prevent the link from being visible
  link.style.display = 'none';
  
  // Add additional attributes to force download
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  
  // Append to body (required for Firefox)
  document.body.appendChild(link);
  
  // Trigger the download
  link.click();
  
  // Clean up - remove the link after a short delay
  setTimeout(() => {
    if (document.body.contains(link)) {
      document.body.removeChild(link);
    }
  }, 100);
};