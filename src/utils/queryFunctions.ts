export const setSearchParams = (pathname: string, searchParams?: string, savePastHash: boolean = true) => {
  if (typeof window !== 'undefined') {
    let url = `${process.env.NEXT_PUBLIC_FRONT_URL}${pathname}`
    console.log(pathname ,searchParams)
    if (searchParams) url += `?${searchParams}`
    if (savePastHash && !window.location.hash.length) url += window.location.hash

    window.history.pushState(null, "", url)
  }
}