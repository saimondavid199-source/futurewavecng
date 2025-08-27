/**
 * Force download a file by creating a temporary link element
 * This ensures the file is downloaded rather than opened in the browser
 */
export const forceDownload = async (url: string, filename: string): Promise<void> => {
  try {
    // Fetch the PDF file
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.status}`);
    }
    
    // Create blob with explicit PDF mime type
    const blob = await response.blob();
    const pdfBlob = new Blob([blob], { type: 'application/pdf' });
    
    // Create object URL from blob
    const blobUrl = URL.createObjectURL(pdfBlob);
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    
    // Set the href and download attributes
    link.href = blobUrl;
    link.download = filename;
    
    // Prevent the link from being visible
    link.style.display = 'none';
    
    // Append to body (required for Firefox)
    document.body.appendChild(link);
    
    // Trigger the download
    link.click();
    
    // Clean up - remove the link and revoke object URL
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
      URL.revokeObjectURL(blobUrl);
    }, 100);
    
  } catch (error) {
    console.error('Download failed:', error);
    // Fallback: Direct download with proper headers
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 100);
  }
};