import React from "react"
import { decode } from 'html-entities';
import { v4 as uuidv4 } from 'uuid';
import Intro from "./components/Intro"
import Quiz from "./components/Quiz"
import Answers from "./components/Answers"

export default function App() {
  const [progress, setProgress] = React.useState(0)
  const [questions, setQuestions] = React.useState([])
  const [score, setScore] = React.useState({
    answered: 0,
    correct: 0
  })

  React.useEffect(() => {
    getQuestions()
  }, [])

  React.useEffect(() => {
    let questionsAnswered = 0
    questions.map(question => {
      question.answers.map(answer => {
        if (answer.selected) {
          questionsAnswered++
        }
      })
    })
    setScore((prevScore) => {
      return (
        { ...prevScore, answered: questionsAnswered }
      )
    })
  }, [questions])

  React.useEffect(() => {
    let correctAnswers = 0
    questions.map(question => {
      question.answers.map(answer => {
        if (answer.selected && answer.correct) {
          correctAnswers++
        }
      })
    })
    setScore(prevScore => {
      return (
        {
          ...prevScore,
          correct: correctAnswers
        }
      )
    })
  }, [questions])

  function startQuiz() {
    setProgress(1)
  }

  function checkQuiz() {
    if (score.answered === 5) {
      setProgress(2)
    }
    else {
      alert("Please answer all questions!")
    }
  }

  function restartQuiz() {
    getQuestions()
    setProgress(0)
  }

  async function getQuestions() {
    const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    const data = await res.json()
    const questionsData = data.results.map(question => {
      return {
        id: uuidv4(),
        text: decode(question.question, { level: 'html5' }),
        answers: [...question.incorrect_answers, question.correct_answer]
          .sort((a, b) => 0.5 - Math.random()).map(answer => {
            return {
              id: uuidv4(),
              text: decode(answer, { level: 'html5' }),
              selected: false,
              correct: answer === question.correct_answer ? true : false
            }
          })
      }
    })
    setQuestions(questionsData)
  }

  function handleSelect(selectedQuestion, selectedAnswer) {
    setQuestions(prevQuestions => {
      const newQuestions = []
      const newAnswers = []
      for (let question of prevQuestions) {
        if (question.id === selectedQuestion) {
          for (let answer of question.answers) {
            if (answer.id === selectedAnswer) {
              newAnswers.push({
                ...answer,
                selected: true
              })
            }
            else {
              newAnswers.push({
                ...answer,
                selected: false
              })
            }
          }
          newQuestions.push({
            ...question,
            answers: newAnswers
          })
        }
        else {
          newQuestions.push(question)
        }
      }
      return newQuestions
    })
  }

  switch (progress) {
    case 0:
      return <Intro handleStart={startQuiz} />
    case 1:
      return <Quiz questions={questions} handleSelect={handleSelect} handleSubmit={checkQuiz} />
    case 2:
      return <Answers questions={questions} finalScore={score.correct} handleRestart={restartQuiz} />
  }
}