import React, { useState, useRef, useEffect, useLayoutEffect } from "react"
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap"
import "./VideoModal.css";

const videoModal = ({ video, langKeys }) => {
  const [modal, setModal] = useState(false)
  const videoRef = useRef(null)
  if (!video) return <></>;
  const toggle = () => setModal(!modal)
  useEffect(() => {
    if (!modal && videoRef.current && !videoRef.current.paused) {
      videoRef.current.requestPictureInPicture()
    }
  }, [modal]);
  return (
    <>
      <Button className="btn-modal" onClick={toggle}>
        {langKeys["Watch Now"]}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className="video-modal">
        <Button className="btn-cancel" onClick={toggle}>
          {langKeys["Exit"]}
        </Button>
        <div className="video-wrapper">
          <video ref={videoRef} controls controlsList="nodownload">
            <source src={video.video_url.url} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        <ModalFooter className="video-footer">
          <a href={`/question_answering/${video.id}/questions/new`} className="btn btn-secondary">
            <i className="fas fa-lightbulb" style={{ color: "yellow" }}></i>{" "}
            {langKeys["Ask a mentor"]}
          </a>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default videoModal;