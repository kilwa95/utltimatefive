import React from 'react'

const Video = () => {
  return (
    <div class="jumbotron">
      <video
        class="video-background"
        preload="true"
        muted="true"
        autoplay="true"
        loop="true"
      >
        <source
          src="https://content.fivezone.fr/website/homepage-background.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  )
}

export default Video
