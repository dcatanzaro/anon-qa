import React from "react";

import axios from "axios";

import Header from "../../components/header/index";
import InputText from "../../components/inputText/index";
import Question from "../../components/question/index";

const isDev = process.env.NODE_ENV !== "production";

const fetchQuestions = async query => {
    const arQueries = query || queryConvert();

    const url = `${process.env.URL}/api/questions?password=${arQueries.password}`;

    const questions = await axios.get(url);

    return questions.data;
};

const queryConvert = () => {
    var queryStr = window.location.search,
        queryArr = queryStr.replace("?", "").split("&"),
        queryParams = [];

    for (var q = 0, qArrLength = queryArr.length; q < qArrLength; q++) {
        var qArr = queryArr[q].split("=");
        queryParams[qArr[0]] = qArr[1];
    }

    return queryParams;
};

class Home extends React.Component {
    static async getInitialProps({ query }) {
        const questions = await fetchQuestions(query);

        return { questions };
    }

    constructor(props) {
        super(props);

        this.state = {
            questions: this.props.questions || [],
            isAdmin: false,
            password: ""
        };
    }

    loadNewQuestions = async () => {
        const questions = await fetchQuestions();

        this.setState({ questions });
    };

    componentDidMount() {
        const arQueries = queryConvert();

        this.setState({
            isAdmin: arQueries.isAdmin,
            password: arQueries.password
        });
    }

    render() {
        const { questions, isAdmin, password } = this.state;

        return (
            <>
                <Header />
                <InputText loadNewQuestions={this.loadNewQuestions} />

                {questions.map((question, key) => (
                    <Question
                        isAdmin={isAdmin}
                        password={password}
                        key={key}
                        question={question}
                        loadNewQuestions={this.loadNewQuestions}
                    />
                ))}
            </>
        );
    }
}

export default Home;
