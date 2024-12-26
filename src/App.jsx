import './App.css'
import {useState} from "react";

const API_KEY = "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"
const linksArray = [
  "https://rozetka.com.ua/lenovo-82xq00l1ra/p454478936/",
  "https://rozetka.com.ua/samsung-sm-s721bzkgeuc/p450350984/",
  "https://bt.rozetka.com.ua/327597679/p327597679/",
  "https://rozetka.com.ua/tefal-b5790602/p424494753/",
  "https://rozetka.com.ua/bosch_professional_06019h5004/p254009326/",
  "https://rozetka.com.ua/anex_mt_12q/p382767696/",
  "https://rozetka.com.ua/nike_196604438674/p397649340/",
  "https://rozetka.com.ua/275199118/p275199118/",
  "https://rozetka.com.ua/tramp-tlt-00606-olive/p382062666/",
  "https://rozetka.com.ua/yamaha_f310/p268036/"
]

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([])
  const [value, setValue] = useState("")

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const aiRequest = async (requestText) => {

    const API_BODY = {
      "model": "llama3-8b-8192",
      "messages": [{
        "role": "user",
        "content": "Среди предложенных ссылок на товары" + linksArray + "найди те которые больше всего подходят под этот запрос: " +
          requestText + "в ответ дай только ссылки на подходящие товары"
      }]
    }

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        contentType: "application/json",
        Authorization: "Bearer " + API_KEY
      },
      body: JSON.stringify(API_BODY)
    })

    return await res.json()
  }

  const onSubmit = () => {
    setIsLoading(true)
    aiRequest(value).then((response) => {
      setResults(response.choices[0].message.content)
      setIsLoading(false)
    })
  }

return (
  <div className="container nes-container with-title">
    <h1 className="title">AI helper</h1>

    <input onChange={handleChange} className="input nes-input" placeholder="Type in what you are looking for"/>
    <button disabled={isLoading} onClick={onSubmit} className="btn nes-btn is-primary">Find</button>

    {!!results.length && <div>
      <h2>You are probably looking for this:</h2>
      <div>{results}</div>
    </div>}

    {isLoading && <div className="loader">
      <i className="nes-octocat animate"></i>
    </div>}
  </div>
)
}

export default App
