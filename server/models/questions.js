const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionsSchema = new Schema(
    {
        question: String,
        answer: String,
        deleted: Boolean
    },
    {
        timestamps: true
    }
);

questionsSchema.index({ deleted: 1, createdAt: -1, answer: 1 });

module.exports = mongoose.model("questions", questionsSchema);
