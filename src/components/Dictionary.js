import React,{Fragment, useEffect,useState} from 'react'
import {useDictionaryConsumer} from './DictionaryContext'

export const Dictionary = () => {

  const {loading,words}=useDictionaryConsumer();
 
  return (
      <Fragment>
        
    </Fragment>
    
  )
}

export default Dictionary;
