import React from "react";
import style from "./style.scss";

import axios from "axios";

class InputText extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            question: "",
            loading: false
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
            loading: false
        });

        loadNewQuestions();
    };

    render() {
        const { question, loading } = this.state;

        return (
            <header className={style.inputText}>
                {loading ? (
                    <div>Enviando...</div>
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
