import { appWithTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';






function Home() {
    
    return (
        <div className='welcome-page text-center'>
            <div>
                <h1 className='welcome-title'>Welcome!</h1>
                <input type="text" className='exam-name-input' placeholder='Enter your Typing Exam name!' />
            </div>
                <a href="/typing.html" className='read_more' >Start </a>
            <div className="copyright text-white">
                <p >
                    <a href="https://jasonwatmore.com" target="_top">Amanpreetsing802.com</a>
                </p>
            </div>
        </div>
    );
}
export default Home;

