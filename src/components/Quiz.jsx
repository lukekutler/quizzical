import React from "react"

export default function Quiz({ questions, handleSelect, handleSubmit, answered }) {
    const questionElements = questions.map(question => {
        return (
            <div className="quiz-question" key={question.id}>
                <h3 className="quiz-question-prompt">{question.text}</h3>
                <div className="quiz-answers">
                    {question.answers.map(answer => {
                        const styleConfig = {
                            backgroundColor: answer.selected ? "#D6DBF5" : "white",
                            border: answer.selected ? "none" : "0.794px solid #293264"
                        }
                        return <button className="quiz-question-answer" onClick={() => handleSelect(question.id, answer.id)} key={answer.id} style={styleConfig}>{answer.text}</button>
                    })}
                </div>
            </div>
        )
    })

    return (
        <main className="quiz-container">
            {questionElements}
            <button disabled={answered !== 5 ? "true" : ""} className="quiz-control" onClick={handleSubmit}>Submit</button>
        </main>
    )
}