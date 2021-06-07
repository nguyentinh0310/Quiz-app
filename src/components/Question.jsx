import React, { useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";

const Question = (props) => {
  const {
    data,
    onAnswerUpdate,
    numberOfQuestions,
    activeQuestion,
    onSetActiveQuestion,
    onSetStep,
  } = props;

  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const radioWrapper = useRef();

  const handleOnChange = (e) => {
    setSelected(e.target.value);
    if (error) {
      setError("");
    }
  };
  useEffect(() => {
    const findCheckedInput =
      radioWrapper.current.querySelector("input:checked");
    if (findCheckedInput) {
      findCheckedInput.checked = false;
    }
  }, [data]);

  const handleNextClick = () => {
    if (selected === "") {
      return setError("Xin mời chọn đáp án");
    }

    // cập nhật đáp án sau khi chọn
    onAnswerUpdate((prevState) => [
      ...prevState,
      { q: data.question, a: selected },
    ]);
    setSelected("");
    // nếu đáp án chọn < tổng sô đáp án -1 -> thực hiện các đáp án
    if (activeQuestion < numberOfQuestions - 1) {
      onSetActiveQuestion(activeQuestion +1);
    } else {
      // thực hiện hết sang bước 3
      onSetStep(3);
    }
  };
  return (
    <div className="card">
      <Card>
        <Card.Body>
          <h3>{data.question}</h3>
          <div className="control" ref={radioWrapper}>
            {data.choices.map((choice, i) => (
              <label htmlFor="quiz" className="radio" key={i}>
                <input
                  type="radio"
                  name="answer"
                  value={choice}
                  onChange={handleOnChange}
                />
                {choice}
              </label>
            ))}
          </div>
          {error && <div className="has-text-danger mb-2">{error}</div>}
          <button className="btn_submit" onClick={handleNextClick}>
            Tiếp tục
          </button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Question;
