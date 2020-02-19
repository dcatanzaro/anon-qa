const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionsSchema = new Schema(
    {
        question: String,
        answer: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("questions", questionsSchema);
