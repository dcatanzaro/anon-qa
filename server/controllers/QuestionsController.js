const Questions = require("../models/questions");

class QuestionsController {
    constructor(telegram) {
        this.telegram = telegram;
    }

    sendAnswer = async (req, res) => {
        const { answer, idQuestion, password } = req.body;

        if (password != process.env.PASSWORD_EDITOR) {
            return res.json({});
        }

        const result = await Questions.updateOne(
            { _id: idQuestion },
            { $set: { answer: answer } }
        );

        return res.json(result);
    };

    sendQuestion = async (req, res) => {
        const { question } = req.body;

        if (question.length > 300) {
            return res.json({
                err: "Invalid length"
            });
        }

        this.telegram.sendTelegramMessage(
            `AnonQ&A | ✉️ New message | ${question}`
        );

        const newQuestion = new Questions();
        newQuestion.question = question;
        const result = await newQuestion.save();

        return res.json(result);
    };

    getQuestions = async (req, res) => {
        const questions = await Questions.find().sort({ createdAt: -1 });

        return res.json(questions);
    };
}

module.exports = QuestionsController;
