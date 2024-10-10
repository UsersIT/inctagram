export async function convertObjectURLsToBlobs(urls: string[]): Promise<Blob[]> {
  const blobs = await Promise.all(
    urls.map(async url => {
      const response = await fetch(url)

      return response.blob()
    })
  )

  return blobs
}
