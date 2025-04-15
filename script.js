const downloadButton = document.getElementById('download-button');
const userUrl = document.getElementById('user-url');
const qualityList = document.getElementById('quality-list');

const extractVideoId = (url) => {
    const parsedUrl=new URL(url);

    let videoId;
    if(parsedUrl.searchParams.has('v')){
        videoId=parsedUrl.searchParams.get('v')
    }
    else {
        const segmentUrl=parsedUrl.pathname.split('/')
        videoId=segmentUrl.find(segment=>segment.length==11)
    }
    return videoId;
}
const downloadAudio = (result) => {
    const reflink = document.createElement("a");
    reflink.href = result.link;
    reflink.download = `${result.title}.mp3`;
    reflink.click();
}

const getData = async () => {
    const videoId=extractVideoId(userUrl.value)
    const url = `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'e4090088damshcb08340bb1f1a44p1ace42jsncdacbbef480e',
            'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        downloadAudio(result)
    } catch (error) {
        console.error(error);
    }
}

downloadButton.addEventListener("click", getData);