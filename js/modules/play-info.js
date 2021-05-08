import Playlist from './playlist.js'

const PlayInfo = (() => {
  const state = {
    songsLength: 0,
    isPlaying: false,
  };

  //cache the DOM
  const playerCountEl = document.querySelector(".player__count");
  const playerTriggerEl = document.querySelector(".player__trigger");

  const init = () => {
    render();
    listeners();
  };

  const setState = (obj) => {
      state.songsLength = obj.songsLength;
      state.isPlaying = obj.isPlaying;
      render();
  }

  const listeners = () =>{
        playerTriggerEl.addEventListener('click', () => {
            //1. change our own playinfo state
            state.isPlaying = state.isPlaying ? false : true; 
            //2. render it
            render();
            //3. change toggle the playpuase func

            Playlist.flip()
        })
  }

  const render = () => {
    playerCountEl.innerHTML = state.songsLength;
    playerTriggerEl.innerHTML = state.isPlaying ? "Pause" : "Play";
  };

  return {
    init,
    setState,
  };
})();

export default PlayInfo;
