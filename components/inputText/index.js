import React from "react";
import style from "./style.scss";

import axios from "axios";

class InputText extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            question: "",
            loading: false,
            sent: false
        };
    }

    sendQuestion = async () => {
        const { question } = this.state;
        const { loadNewQuestions } = this.props;

        if (!question.length) {
            return;
        }

        this.setState({
            question: "",
            loading: true
        });

        const url = `${process.env.URL}/api/send_question`;

        const result = await axios.post(url, {
            question: question
        });

        this.setState({
            sent: true
        });

        loadNewQuestions();
    };

    newQuestion = () => {
        this.setState({
            sent: false,
            loading: false
        });
    };

    render() {
        const { question, loading, sent } = this.state;

        let loadingText = "Enviando...";

        if (sent) {
            loadingText = "La pregunta fue enviada.";

            if (process.env.SHOW_QUESTIONS_WITHOUT_ANSWER) {
                loadingText +=
                    " En cuanto sea respondida va a aparecer de manera pública.";
            }
        }

        return (
            <header className={style.inputText}>
                {loading ? (
                    <div className={style.loading}>
                        <span>{loadingText}</span>
                        <button onClick={this.newQuestion}>
                            Enviar nueva pregunta
                        </button>
                    </div>
                ) : (
                    <>
                        <textarea
                            maxLength="300"
                            placeholder="Preguntá!"
                            value={question}
                            onChange={e => {
                                this.setState({
                                    question: e.target.value
                                });
                            }}
                        ></textarea>
                        <button onClick={this.sendQuestion}>Enviar</button>
                    </>
                )}
            </header>
        );
    }
}

export default InputText;
