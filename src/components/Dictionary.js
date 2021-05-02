import React,{Fragment, useEffect,useState} from 'react'
import {useDictionaryConsumer} from './DictionaryContext'

export const Dictionary = () => {

  const {loading,words}=useDictionaryConsumer();
 
  return (
      <Fragment>
        {loading ? 'Loading...' :<div>
        <h3>Dictionary</h3>
        {words}
      </div>}
    </Fragment>
    
  )
}

export default Dictionary;
