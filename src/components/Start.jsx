import React from "react";
import { Card } from "react-bootstrap";

const Start = (props) => {
  const { onStartQuiz } = props;
  return (
    <div className="card">
      <Card>
        <Card.Body>
          <h1>Bắt đầu câu hỏi</h1>
          <p>Chúc may mắn!</p>
          <button className="btn_submit" onClick={onStartQuiz}>
            Bắt đầu
          </button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Start;
