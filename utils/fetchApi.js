// Endpoints
const USERTOPTRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks?time_range=short_term';
const USERTOPARTISTS_ENDPOINT = 'https://api.spotify.com/v1/me/top/artists?time_range=short_term';
const USERRECENTTRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played';

// User's recent tracks
export const getUsersRecentTracks = async (access_token) => {
	return fetch(USERRECENTTRACKS_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});
};

// User's top tracks
export const getUsersTopTracks = async (access_token) => {
	return fetch(USERTOPTRACKS_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		}
	});
};

// User's top artists
export const getUsersTopArtists = async (access_token) => {
	return fetch(USERTOPARTISTS_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		}
	});
};