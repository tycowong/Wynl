const spotifyApiUrl = "https://accounts.spotify.com/api/token";
const spotifyAlbumUrl = "https://api.spotify.com/v1/albums";

export async function getAccessToken() {
  const request = await fetch(spotifyApiUrl, {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: import.meta.env.SPOTIFY_ID,
      client_secret: import.meta.env.CLIENT_SECRET,
    }),
  });

  const data = await request.json();

  return data["access_token"];
}

export async function getAlbumDetails(id) {
  const access_token = await getAccessToken();

  const request = await fetch(`${spotifyAlbumUrl}/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const data = await request.json();

  return data;
}
