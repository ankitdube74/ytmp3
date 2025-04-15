const downloadButton = document.getElementById('download-button');
const userUrl = document.getElementById('user-url');
const loader = document.getElementById('loader');
const toast = document.getElementById('toast');
const darkModeToggle = document.getElementById('dark-mode-toggle');

const extractVideoId = (url) => {
    const parsedUrl = new URL(url);
    let videoId;
    if (parsedUrl.searchParams.has('v')) {
        videoId = parsedUrl.searchParams.get('v');
    } else {
        const segmentUrl = parsedUrl.pathname.split('/');
        videoId = segmentUrl.find(segment => segment.length == 11);
    }
    return videoId;
}

const downloadAudio = (result) => {
    const reflink = document.createElement("a");
    reflink.href = result.link;
    reflink.download = `${result.title}.mp3`;
    reflink.click();
    showToast();
}

const showToast = () => {
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

const getData = async () => {
    loader.style.display = 'block'; // Show loader
    const videoId = extractVideoId(userUrl.value);
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
        console.error(error);
    } finally {
        loader.style.display = 'none'; // Hide loader
    }
}

downloadButton.addEventListener("click", getData);

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle('dark-mode');
});
