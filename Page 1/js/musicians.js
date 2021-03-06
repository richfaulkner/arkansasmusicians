<script>
async function search() {

    // Artist Data
    // Get the artist name from the textbox; encode the artist name in case there are special characters
    artistSearchValue = encodeURI(document.getElementById("artist").value);
    // Create the search URL; Note we are using 1 as the apikey
    artistSearchURL = "https://theaudiodb.com/api/v1/json/1/search.php?s=" + artistSearchValue;
    // AJAX call to fetch the data
    artistObject = await fetch(artistSearchURL);
    artistJSONText = await artistObject.text();
    // Parse the JSON string into an object
    artistData = JSON.parse(artistJSONText);
    // Display the biography data - Note we display the first result - 0 index
    document.getElementById("biography").innerHTML = artistData.artists[0].strBiographyEN;
    // Display the artist picture - Note we display the first result - 0 index; use "/preview" for smaller image
    document.getElementById("artistbanner").src = artistData.artists[0].strArtistBanner + "/preview";

    // Album Data - Get the first Album
    // Get the artist ID from the artist data object; encode the artist ID in case there are special characters
    albumSearchValue = encodeURI(artistData.artists[0].idArtist);
    // Create the search URL; Note we are using 1 as the apikey
    albumSearchURL = "https://theaudiodb.com/api/v1/json/1/album.php?i=" + albumSearchValue;
    // AJAX call to fetch the data
    albumObject = await fetch(albumSearchURL);
    albumJSONText = await albumObject.text();
    // Parse the JSON string into an object
    albumData = JSON.parse(albumJSONText);
    // Loop through the albums
    albumList = "";
    for (i = 0; i < albumData.album.length; i++) {
        albumList = albumList + albumData.album[i].strAlbum + " (" + albumData.album[i].intYearReleased + ")" + "<br>";
    }
    // Display the album names
    document.getElementById("albumlist").innerHTML = albumList;

    // Track Data - Get the tracks for the first album
    // Get the album ID from the artist data object; encode the album ID in case there are special characters
    trackSearchValue = encodeURI(albumData.album[0].idAlbum);
    // Create the search URL; Note we are using 1 as the apikey
    trackSearchURL = "https://theaudiodb.com/api/v1/json/1/track.php?m=" + trackSearchValue;
    // AJAX call to fetch the data
    trackObject = await fetch(trackSearchURL);
    trackJSONText = await trackObject.text();
    // Parse the JSON string into an object
    trackData = JSON.parse(trackJSONText);     
    trackList = "";
    for (i = 0; i < trackData.track.length; i++) {
        trackList = trackList + trackData.track[i].strTrack + "<br>";
    }
    // Display the track names for first album
    document.getElementById("tracklist").innerHTML = trackList;
}
            </script>
