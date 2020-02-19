import React from "react";
import style from "./style.scss";

import axios from "axios";
import dayjs from "dayjs";

const isDev = process.env.NODE_ENV !== "production";

class Question extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openTextInput: false,
            answer: "",
            isAdmin: false,
            password: ""
        };
    }

    openTextInput = () => {
        const { question } = this.props;

        this.setState({
            openTextInput: true,
            answer: question.answer || ""
        });
    };

    sendAnswer = async idQuestion => {
        const { answer, password } = this.state;
        const { loadNewQuestions } = this.props;

        if (!answer.length) {
            return;
        }

        this.setState({
            answer: "",
            openTextInput: false
        });

        const url = `${process.env.URL}/api/send_answer`;

        const result = await axios.post(url, {
            answer,
            password,
            idQuestion
        });

        loadNewQuestions();
    };

    queryConvert = () => {
        var queryStr = window.location.search,
            queryArr = queryStr.replace("?", "").split("&"),
            queryParams = [];

        for (var q = 0, qArrLength = queryArr.length; q < qArrLength; q++) {
            var qArr = queryArr[q].split("=");
            queryParams[qArr[0]] = qArr[1];
        }

        return queryParams;
    };

    componentDidMount() {
        const arQueries = this.queryConvert();

        this.setState({
            isAdmin: arQueries.isAdmin,
            password: arQueries.password
        });
    }

    render() {
        const { question } = this.props;
        const { openTextInput, answer, isAdmin } = this.state;

        return (
            <section className={style.questionContainer}>
                <div className={style.question}>
                    <div className={style.q}>
                        <div className={style.name}>
                            Anónimo -{" "}
                            <span>
                                {dayjs(question.createdAt).format(
                                    "DD-MM-YYYY HH:mm"
                                )}
                            </span>
                        </div>
                        <span className={style.text}>{question.question}</span>
                    </div>
                    {question.answer && (
                        <div className={style.answer}>{question.answer}</div>
                    )}
                    {isAdmin &&
                        (!openTextInput ? (
                            <button onClick={this.openTextInput}>
                                {!question.answer ? "Responder" : "Editar"}
                            </button>
                        ) : (
                            <>
                                <textarea
                                    placeholder="Respuesta"
                                    value={answer}
                                    onChange={e => {
                                        this.setState({
                                            answer: e.target.value
                                        });
                                    }}
                                ></textarea>
                                <button
                                    onClick={() =>
                                        this.sendAnswer(question._id)
                                    }
                                >
                                    Enviar
                                </button>
                            </>
                        ))}
                </div>
            </section>
        );
    }
}

export default Question;
