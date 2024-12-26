import './App.css'
import {useState} from "react";

const API_KEY = "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"
const linksArray = [
  "https://rozetka.com.ua/lenovo-ideapad-3-15ada6/p123456/",
  "https://rozetka.com.ua/lenovo-ideapad-3-15ada6/p123456/",
  "https://rozetka.com.ua/lg-ga-b509secl/p789012/",
  "https://rozetka.com.ua/tefal-expertise-28cm/p345678/",
  "https://rozetka.com.ua/bosch-gsr-120-li/p234567/",
  "https://rozetka.com.ua/anex-m-type/p456789/",
  "https://rozetka.com.ua/nike-air-zoom-pegasus-38/p567890/",
  "https://rozetka.com.ua/royal-canin-indoor-27/p678901/",
  "https://rozetka.com.ua/tramp-lite-tlt-006/p789123/",
  "https://rozetka.com.ua/yamaha-f310/p890123/"
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
