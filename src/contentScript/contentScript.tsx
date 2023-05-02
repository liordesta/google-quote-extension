import React, { useState, useEffect } from 'react';
import { formatName } from './helpers';
import Loader from '../loader/loader';
import '../styles/tailwind.css';
import './contentScript.css';

interface Quote {
  quote: string;
  author: string;
}

function ContentScript() {
  const [isLoading, setIsLoading] = useState(true);
  const [quote, setQuote] = useState<Quote | null>(null);

  const loadQuote = () => {
    const url = 'https://api.api-ninjas.com/v1/quotes?category=success';
    const options = {
      method: 'GET',
      headers: { 'X-Api-Key': 'scKufuWwLLirKCO/OcZsIA==ojCs7mm0zJaDvDQp' },
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data: Quote[]) => {
        setQuote(data[0]);
        setIsLoading(false);
        chrome.runtime.sendMessage({ type: 'quoteLoaded', url });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const img = document.getElementById(
      'gwloading-spinner'
    ) as HTMLImageElement;
    img.src = chrome.runtime.getURL('src/assets/loader.svg');

    loadQuote();
  }, []);

  return (
    <>
      <div className='flex justify-center items-center border border-solid rounded p-5 mx-auto mt-20 text-center customColors'>
        {isLoading && <Loader />}
        {!isLoading && Object.keys(quote).length > 0 && (
          <h6 className='m-0 text-xl'>
            {quote.quote}
            <span> ~{formatName(quote.author)}</span>
          </h6>
        )}
      </div>
    </>
  );
}

export default ContentScript;
