export async function onRequest(context) {
  const releasesUrl = "https://api.github.com/repos/ravvdevv/cramio-landing/releases/latest";
  const response = await fetch(releasesUrl, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "Cramio-Download-Redirect"
    },
    cf: { cacheTtl: 60, cacheEverything: true }
  });

  if (!response.ok) {
    return new Response("The latest Android release is temporarily unavailable. Please try again shortly.", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" }
    });
  }

  const release = await response.json();
  const apk = release.assets?.find((asset) =>
    asset.name.toLowerCase().endsWith(".apk")
  );

  if (!apk?.browser_download_url) {
    return new Response("No Android APK is attached to the latest release.", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" }
    });
  }

  return Response.redirect(apk.browser_download_url, 302);
}
