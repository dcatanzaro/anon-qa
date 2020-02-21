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
            answer: ""
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
        const { answer } = this.state;
        const { loadNewQuestions, password } = this.props;

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

    deleteMessage = async idQuestion => {
        const { loadNewQuestions, password } = this.props;

        const confirmDelete = confirm(
            `¿Estás seguro que querés borrar el mensaje?`
        );

        if (confirmDelete) {
            const url = `${process.env.URL}/api/delete_question`;

            const result = await axios.post(url, {
                password,
                idQuestion
            });

            loadNewQuestions();
        }
    };

    render() {
        const { question, isAdmin } = this.props;
        const { openTextInput, answer } = this.state;

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
                            <div className={style.buttons}>
                                <button onClick={this.openTextInput}>
                                    {!question.answer ? "Responder" : "Editar"}
                                </button>
                                <button
                                    className={style.dangerButton}
                                    onClick={() =>
                                        this.deleteMessage(question._id)
                                    }
                                >
                                    Borrar
                                </button>
                            </div>
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
