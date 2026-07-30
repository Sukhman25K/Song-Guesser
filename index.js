import express, { response } from "express";
import axios from "axios";
const app = express();

var charts;
var previewLinks;

function getPreview(chartsResponse){
    return chartsResponse.tracks.data.map(element => element.preview);
}

axios.get("https://api.deezer.com/chart").then(response => {
    charts = response.data;
    previewLinks = getPreview(charts);
    app.listen(3000, () => {console.log('Server is running on http://localhost:3000')});
}).catch(error => {
    charts = ("Error fetching data", error);
});

app.get('/', (req,res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Song Guesser</title>
            <style>
                body { font-family: Arial; padding: 20px; background: #f0f0f0; }
                .player { background: white; padding: 20px; border-radius: 8px; width: 400px; }
                audio { width: 100%; }
                .info { margin-top: 10px; }
            </style>
        </head>
        <body>
            <div class="player">
                <h1>🎵 Song Guesser</h1>
                <audio id="player" controls autoplay style="width: 100%;"></audio>
                <div class="info">
                    <p>Now playing: <span id="songNum">1</span> / ${previewLinks.length}</p>
                </div>
            </div>

            <script>
                const player = document.getElementById('player');
                const songNum = document.getElementById('songNum');
                const songs = ${JSON.stringify(previewLinks)};
                let currentIndex = 0;

                function playSong(index) {
                    if (index < songs.length) {
                        player.src = songs[index];
                        songNum.textContent = index + 1;
                        currentIndex = index;
                    }
                }

                player.addEventListener('ended', () => {
                    playSong(currentIndex + 1);
                });

                playSong(0); // Start with first song
            </script>
        </body>
        </html>
    `);
});