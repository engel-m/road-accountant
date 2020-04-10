import React from 'react'

export const LoadingScreen = () => {

  return (
    <>
    <div className="animated fadeIn h-screen mx-auto flex content-center justify-center">
      <span className="text-indigo-600 opacity-75 mx-auto block self-center -mt-24">
        <i className="fas fa-circle-notch fa-spin fa-5x"></i>
      </span>
    </div>
    </>
  )
}