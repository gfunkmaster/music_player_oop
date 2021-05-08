import { songsList } from "../data/songs.js";

const Playlist = (() => {
  // data or state
  let songs = songsList;
  let currentlyPlayingIndex = 0;
  let currentSong = new Audio(songs[currentlyPlayingIndex].url);

  // cache the DOM
  const playlistEl = document.querySelector(".playlist");

  const init = () => {
    render();
    listeners();
  };


  const changeAudioSrc = () => {
      currentSong.src = songs[currentlyPlayingIndex].url;
  }

  const togglePlayPause = () => {
      return currentSong.paused ? currentSong.play() : currentSong.pause();
  }
 
  const mainPlay = (clickedIndex) => {
      if (currentlyPlayingIndex === clickedIndex) {
          //toggle play of paus
            console.log('same');
            togglePlayPause();
            
      } else {
        console.log('new'); 
        currentlyPlayingIndex = clickedIndex;
        changeAudioSrc()
        togglePlayPause();
      }
  }

  const playNext = () => {
      if(songs[currentlyPlayingIndex + 1]) {
        currentlyPlayingIndex++;
          changeAudioSrc();
          togglePlayPause()
          render();
      }
     

  }

  const listeners = () => {
     
        //1. we need to ge index of list item when we click
        //2. change the currentplayingindex to index of the li tag
        //3. play or pause
        //4. if its not the same somg, then 
        //change the src to that new song after chaning the currentplaying index

        playlistEl.addEventListener('click', (event) => {
            if(event.target && event.target.matches(".fa")){
                const listElem = event.target.parentNode.parentNode;
                console.log(listElem.parentElement.children);
                const listElemIndex = [...listElem.parentElement.children].indexOf(listElem);
                console.log(listElemIndex);
                mainPlay(listElemIndex)
                render()
            }
        })

        currentSong.addEventListener('ended', () => {
             //playnext
             playNext()
        })

  }

  const render = () => {
    let markup = "";

    const toggleIcon = itemIndex => {
        if(currentlyPlayingIndex === itemIndex){
            return currentSong.paused ? 'fa-play' : 'fa-pause';
        } else{
            return 'fa-play'
        }
    }

    songs.forEach((songObj, index) => {
      markup += `
              <li class="playlist__song  ${index === currentlyPlayingIndex ? 'playlist__song-active': ''}  ">
                <div class="play-pause">
                  <i class="fa ${toggleIcon(index)} pp-icon"></i>
                </div>
                <div class="playlist__song-details">
                  <span class="playlist__song-name">${songObj.title}</span>
                  <br>
                  <span class="playlist__song-artist">${songObj.artist}</span>
                </div>
                <div class="playlist__song-duration">
                  ${songObj.time}
                </div>
              </li>
            `;
    });

    playlistEl.innerHTML = markup;
  };

  return {
    init,
  };
})();

export default Playlist;
