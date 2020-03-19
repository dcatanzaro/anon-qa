const dotenv = require("dotenv");
const isDev = process.env.NODE_ENV !== "production";

const envFile = isDev ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({ path: envFile });

const next = require("next");
const routes = require("./routes");

const app = next({ dev: isDev });
const handler = routes.getRequestHandler(app);
const bodyParser = require("body-parser");
const axios = require("axios");
const compression = require("compression");

const mongoose = require("mongoose");

let urlMongo = "";

if (process.env.DB_USER) {
    urlMongo = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin&w=1`;
} else {
    urlMongo = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
}

mongoose.set("useCreateIndex", true);

mongoose.connect(urlMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

class Telegram {
    sendTelegramMessage(message) {
        const botId = process.env.TELEGRAM_BOTID;
        const chatId = process.env.TELEGRAM_CHATID;

        if (!botId || !chatId) {
            return;
        }

        const telegramMsg = encodeURIComponent(message);

        const url = `https://api.telegram.org/bot${botId}/sendMessage?chat_id=${chatId}&text=${telegramMsg}`;
        axios.get(url);
    }
}

const telegram = new Telegram();

const QuestionsController = require("./server/controllers/QuestionsController");
const QuestionInstance = new QuestionsController(telegram);

const express = require("express");

app.prepare().then(() => {
    const server = express();

    server.use(compression());

    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());

    server.post("/api/send_question", QuestionInstance.sendQuestion);
    server.post("/api/send_answer", QuestionInstance.sendAnswer);
    server.post("/api/delete_question", QuestionInstance.deleteQuestion);
    server.get("/api/questions", QuestionInstance.getQuestions);

    server.use(handler);

    server.listen(process.env.PORT);

    console.log(
        `Server started on port ${process.env.PORT} | Url: ${process.env.URL}`
    );
});
