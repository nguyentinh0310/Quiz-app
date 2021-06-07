import React, { useEffect, useState } from "react";
import { Card, Modal } from "react-bootstrap";

const End = (props) => {
  const { results, data, onReset, time } = props;
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // tính điểm
    let correct = 0;
    results.forEach((result, index) => {
      // nếu selected trùng với answer data -> 1+ (correct)
      if (result.a === data[index].answer) {
        correct++;
      }
      setCorrectAnswers(correct);
    });
        // eslint-disable-next-line
  }, []);

  const formatTime = (time) => {
    if (time < 60) {
      return time < 10 ? `0${time}s` : `${time}s`;
    } else {
      return Math.floor(time / 60) + "m" + (time % 60) + "s";
    }
  };

  return (
    <div className="card">
      <Card>
        <Card.Body>
          <Card.Title>Kết quả</Card.Title>
          <p>
            {correctAnswers} trên {data.length}
          </p>
          <p>
            <strong>{Math.floor((correctAnswers / data.length) * 100)}%</strong>
          </p>
          <p>
            <strong>Thời gain</strong> {formatTime(time)}
          </p>
          <button className="btn btn-info mr-4" onClick={handleShow}>
            Kiểm tra đáp án
          </button>
          <button className="btn btn-primary" onClick={onReset}>
            Thử lại
          </button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <h3 className="text-center">Đáp án của bạn</h3>
            </Modal.Header>
            <Modal.Body>
              <ul className="pl-2">
                {results.map((result, index) => (
                  <li key={index} className="mt-2">
                    {/* câu hỏi */}
                    <p>
                      <strong>{result.q}</strong>
                    </p>
                    {/* check đáp án */}
                    <p
                      className={
                        result.a === data[index].answer
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                    >
                      Đáp án bạn chọn : {result.a}
                    </p>
                    {result.a !== data[index].answer && (
                      <p className="alert alert-info">Đáp án chính xác : {data[index].answer}</p>
                    )}
                  </li>
                ))}
              </ul>
            </Modal.Body>
          </Modal>
        </Card.Body>
      </Card>
    </div>
  );
};

export default End;
