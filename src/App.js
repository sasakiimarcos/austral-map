import './App.css';
import { Header } from './components/Header'
import { DisplayContent } from './components/DisplayContent'
import { Options } from './components/Options'
import {useState} from "react";

function App() {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [selectedOption, setSelectedOption] = useState('ing-inf-23');

    const handleFormSubmit = (option) => {
        setSelectedOption(option);
        setFormSubmitted(true);
    };

    const handleReturnToOriginalPage = () => {
        setFormSubmitted(false);
        // You can perform additional actions if needed
    };

    const plan = require('./data/plan.json'); //with path


  return (
    <div className="App">
        <Header />
        {formSubmitted ? (
            <DisplayContent
                selectedOption={selectedOption}
                onReturn={handleReturnToOriginalPage}
                courses={plan}
            />
        ) : (
            <Options onSubmit={handleFormSubmit} />
        )}
    </div>
  );
}

export default App;
