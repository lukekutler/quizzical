import React from "react"

export default function Intro({ handleStart }) {
    return (
        <main className="intro-container">
            <h1 className="intro-header">Quizzical</h1>
            <p className="intro-description">Try your luck at today's trivia!</p>
            <button className="intro-btn" onClick={handleStart}>Start Quiz</button>
        </main>
    )
}