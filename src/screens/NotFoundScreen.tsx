import React from 'react'
import NotFound from '../components/ui/notfound/NotFound'
import useDocumentTitle from '../hooks/useDocumentTitle';


const NotFoundScreen = () => {
  useDocumentTitle('Not found', false);
  return (
    <NotFound />
  )
}

export default NotFoundScreen