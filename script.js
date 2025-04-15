const downloadButton = document.getElementById('download-button');
const userUrl = document.getElementById('user-url');
const qualityList = document.getElementById('quality-list'); // Optional, if you want multiple quality options

const extractVideoId = (url) => {
    try {
        const parsedUrl = new URL(url);

        let videoId;
        if (parsedUrl.searchParams.has('v')) {
            videoId = parsedUrl.searchParams.get('v');
        } else {
            const segments = parsedUrl.pathname.split('/');
            videoId = segments.find(segment => segment.length === 11);
        }
        return videoId;
    } catch (err) {
        alert("Invalid YouTube URL");
        return null;
    }
};

const downloadAudio = (result) => {
    if (result && result.link) {
        const reflink = document.createElement("a");
        reflink.href = result.link;
        reflink.download = `${result.title || 'audio'}.mp3`;
        document.body.appendChild(reflink);
        reflink.click();
        document.body.removeChild(reflink);
    } else {
        alert("Failed to retrieve the download link.");
    }
};

const getData = async () => {
    const videoId = extractVideoId(userUrl.value);
    if (!videoId) return;

    const url = `https://youtube-mp3-2025.p.rapidapi.com/v1/social/youtube/audio?id=${videoId}&quality=128kbps`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'a94ac112c2msh63ce871423caa05p1078f4jsne4c48d287a5c',
            'x-rapidapi-host': 'youtube-mp3-2025.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        downloadAudio(result);
    } catch (error) {
        console.error("Error downloading audio:", error);
        alert("Something went wrong while fetching the MP3. Please try again later.");
    }
};

downloadButton.addEventListener("click", getData);
