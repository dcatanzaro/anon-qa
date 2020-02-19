import React from "react";

import axios from "axios";

import Header from "../../components/header/index";
import InputText from "../../components/inputText/index";
import Question from "../../components/question/index";

const isDev = process.env.NODE_ENV !== "production";

const fetchQuestions = async () => {
    const url = `${process.env.URL}/api/questions`;

    const questions = await axios.get(url);

    return questions.data;
};

class Home extends React.Component {
    static async getInitialProps() {
        const questions = await fetchQuestions();

        return { questions };
    }

    constructor(props) {
        super(props);

        this.state = {
            questions: this.props.questions || []
        };
    }

    loadNewQuestions = async () => {
        const questions = await fetchQuestions();

        this.setState({ questions });
    };

    render() {
        const { questions } = this.state;

        return (
            <>
                <Header />
                <InputText loadNewQuestions={this.loadNewQuestions} />

                {questions.map((question, key) => (
                    <Question
                        key={key}
                        question={question}
                        loadNewQuestions={this.loadNewQuestions}
                    />
                ))}

                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=UA-28173560-27"
                ></script>

                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());

                                gtag('config', 'UA-28173560-27');`
                    }}
                ></script>
            </>
        );
    }
}

export default Home;
