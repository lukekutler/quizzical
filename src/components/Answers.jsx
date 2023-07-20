import React from "react"

export default function Answers({ questions, handleRestart, finalScore }) {
    const questionElements = questions.map(question => {
        return (
            <div className="quiz-question" key={question.id}>
                <h3 className="quiz-question-prompt">{question.text}</h3>
                <div className="quiz-answers">
                    {question.answers.map(answer => {
                        let color = "none"
                        let opacity = 1
                        let border = "0.794px solid #293264"
                        if (answer.correct) {
                            color = "#94D7A2",
                                border = "none"
                        }
                        else if (answer.selected && !answer.correct) {
                            color = "#F8BCBC",
                                border = "none"
                            opacity = .5
                        }
                        else {
                            color = "none"
                            opacity = .5
                        }
                        const styleConfig = {
                            backgroundColor: color,
                            border: border,
                            opacity: opacity
                        }
                        return <button className="quiz-question-answer" key={answer.id} style={styleConfig}>{answer.text}</button>
                    })}
                </div>
            </div>
        )
    })
    return (
        <main className="quiz-container">
            {questionElements}
            <h4 className="quiz-score">You scored {finalScore}/5 correct answers!</h4>
            <button className="quiz-control" onClick={handleRestart}>Play again</button>
        </main>
    )
}