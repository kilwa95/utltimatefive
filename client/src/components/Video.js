import React from 'react'

const Video = () => {
  return (
    <div className="jumbotron">
      <video
        className="video-background"
        preload="true"
        muted={true}
        autoPlay={true}
        loop={true}
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
