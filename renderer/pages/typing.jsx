import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useTranslation, LanguageSwitcher } from 'next-export-i18n';
import CustomModal from '../components/modal';




export default  function Typing  () {
    // const paragraphs = [
    //     "Far from the truth, an ajar reminder without catamarans is truly a foundation of smarmy semicircles. An alike board without harps is truly a satin of fated pans. A hubcap sees a parent as a painful beautician. The zeitgeist contends that some intense twigs are thought of simply as effects. A cross is a poppied tune. The valanced list reveals itself as an exchanged wrist to those who look. Recent controversy aside.",
    //     "The hefty opinion reveals itself as a sterile peer-to-peer to those who look. This could be, or perhaps the watch of a diamond becomes a bosom baboon. In recent years, some posit the unstuffed road to be less than altern. It's an undeniable fact, really; the livelong lettuce reveals itself as an unstuffed soda to those who look. In ancient times a bit is a balance's season. The popcorn of a morning becomes a moonless beauty.",
    //     "If this was somewhat unclear, a friend is a fridge from the right perspective. An upset carriage is a stitch of the mind. To be more specific, a temper is a pair from the right perspective. Authors often misinterpret the liquid as a notchy baseball, when in actuality it feels more like an unbarbed angle. Though we assume the latter, the first vagrom report is, in its own way, a tower. We know that the octopus of a cd becomes an unrent dahlia.",
    //     "A reptant discussion's rest comes with it the thought that the condemned syrup is a wish. The drake of a wallaby becomes a sonant harp. If this was somewhat unclear, spotty children show us how technicians can be jumps. Their honey was, in this moment, an intime direction. A ship is the lion of a hate. They were lost without the croupous jeep that composed their lily. In modern times a butcher of the birth is assumed to be a spiral bean.",
    //     "Those cowbells are nothing more than elements. This could be, or perhaps before stockings, thoughts were only opinions. A coil of the exclamation is assumed to be a hurtless toy. A board is the cast of a religion. In ancient times the first stinko sailboat is, in its own way, an exchange. Few can name a tutti channel that isn't a footless operation. Extending this logic, an oatmeal is the rooster of a shake. Those step-sons are nothing more than matches."
    // ];
    
    const { t } = useTranslation("common");
    
    const [mistakeTag, setMistakeTag] = useState();
    const [timeTag, setTimeTag] = useState();
    const [wpmTag, setWpmTag] = useState();
    const [cpmTag, setCpmTag] = useState();
    const [inpField, setInpField] = useState();
    const [characters, setCharacters] = useState([]);
    const [typingText, setTypingText] = useState('');
    const [spanTag, setSpanTag] = useState();
    
    
    const [paragraphs, setParagraphs] = useState(t("photographs"));

    // const [paragraphs, setParagraphs] = useState(t("photographs"));
    const router =  useRouter();
    
    
    

    useEffect(() => {
        setMistakeTag(document.querySelector(".mistake span"));
    },[])
    useEffect(() => {
        setTimeTag(document.querySelector(".time span b"));
    },[])
    useEffect(() => {
        setWpmTag(document.querySelector(".wpm span"));
    },[])
    useEffect(() => {
        setCpmTag(document.querySelector(".cpm span"));
    },[])
    useEffect(() => {
        setInpField(document.querySelector(".input-field"));
    },[])
    useEffect(() => {
        setSpanTag(document.querySelector(".typing-text p"));
    },[])
    useEffect(()=> {
        setCharacters(document.querySelectorAll('.typing-text span'));
    },[typingText])



    let timer, 
        charIndex  = 0,
        mistakes = 0,
        isTyping =0,
        maxTime = 3600,
        timeLeft = maxTime;
    
   
    const inputRef = useRef(null);

    function loadParagraph() {
        const ranIndex = Math.floor(Math.random() * paragraphs.split(',,').length);
       
        //the text is the value of typingText
        let text = ""; 
        paragraphs.split(',,')[ranIndex].split("").forEach(char => {
            let span = `<span>${char}</span>`;
            text += span;
        });
        setTypingText(text);
    }

    //the function that addclass 'active' to the first letter of typing text
    
    useEffect(() => {
        (typingText != '') && document.querySelectorAll(".typing-text p span")[0].classList.add("active");
        
        // document.addEventListener("keydown", () => inpField.focus());
        document.querySelector(".typing-text p").addEventListener("click", () => handleKeyDown());
    },[typingText]);

    function handleKeyDown() {
        inputRef.current.focus();
    }

    function initTyping(event) {
        // let characters = document.querySelectorAll(".typing-text span");
        let typedChar = event.target.value.split('')[charIndex];
        if(charIndex < characters.length -1 && timeLeft > 0) {
            if(!isTyping) {
                timer = setInterval(initTimer, 1000);
                isTyping = true;
            }
            if(typedChar == null) {
                if(charIndex > 0) {
                    charIndex--;
                    if(characters[charIndex].classList.contains("incorrect")) {
                        mistakes--;
                    }
                    characters[charIndex].classList.remove("correct", "incorrect");
                }
            } else {
                if(characters[charIndex].innerText == typedChar) {
                    characters[charIndex].classList.add("correct");
                } else {
                    mistakes++;
                    characters[charIndex].classList.add("incorrect");
                }
                charIndex++;
            }
            characters.forEach(span => span.classList.remove("active"));
            characters[charIndex].classList.add("active");

            let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
            wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
            
            wpmTag.innerText = wpm;
            mistakeTag.innerText = mistakes;
            cpmTag.innerText = charIndex - mistakes;
        } else {
            clearInterval(timer);
            event.target.value = "";
        }
    }

    function initTimer() {
        if(timeLeft > 0) {
            timeLeft--;
            timeTag.innerText = parseInt(timeLeft/60)+'min '+(timeLeft%60)+'s';
            let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
            wpmTag.innerText = wpm;
        } else {
            clearInterval(timer);
        }
    }
    function resetGame() {
        loadParagraph();
        clearInterval(timer);
        timeLeft = maxTime;
        charIndex = mistakes = isTyping = 0;
        inpField.value = "";
        timeTag.innerText = timeLeft;
        wpmTag.innerText = 0;
        mistakeTag.innerText = 0;
        cpmTag.innerText = 0;
    }
    
    
    useEffect(() => {
        loadParagraph();
    }, []);


    useEffect(()=> {
        setParagraphs(t("photographs"));
    },[t("photographs")]);
    useEffect(()=> {
        loadParagraph();
    }, [paragraphs]);

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
      }

      function saveText(value) {
        
        setIsOpen(false);
        if (typeof(value) == 'string') {
            setParagraphs(value);
        }
        
      }

      function changeFont(event) {
        event.preventDefault();
       let value =  event.target.value;
        spanTag.style.fontFamily = value;
      }
    


    return (
    <div className="wrapper">

        <LanguageSwitcher lang={'en'} className="lang_button">English</LanguageSwitcher>
        <LanguageSwitcher lang={'hi'} className="lang_button">हिंदी</LanguageSwitcher>
        {/* <button onClick={openModal} className="edit-button">Edit Text</button> */}
        <select name="font-setting" id="fontSetting" onChange={changeFont}>
            <option value="remington">Reminton</option>
            <option value="krutidev">Kurtidev</option>
            <option value="mangal">Mangal</option>
        </select>
        <CustomModal paragraphs={paragraphs}  modalIsOpen={modalIsOpen} closeModal={saveText}></CustomModal>
      <div className="content-box">
        <div className="typing-text" >
          <p dangerouslySetInnerHTML={{ __html: typingText }}></p>
        </div>
        <div className="content">
          <ul className="result-details">
            <li className="time">
              <p>Time Left:</p>
              <span><b>60min</b></span>
            </li>
            <li className="mistake">
              <p>Mistakes:</p>
              <span>0</span>
            </li>
            <li className="wpm">
              <p>WPM:</p>
              <span>0</span>
            </li>
            <li className="cpm">
              <p>CPM:</p>
              <span>0</span>
            </li>
          </ul>
          <button onClick={resetGame}>Try Again</button>
        </div>
      </div>
      <input type="text" ref={inputRef} onInput={initTyping} className="input-field" onKeyDown={handleKeyDown} />
    </div>
    )
}

