import React from 'react';
import { useQuery } from 'react-query';
import Markdown from 'react-markdown';

export const Exercise = ({children, markdown}) => {
  const { status, data } = useQuery(markdown, () => {
    return fetch(markdown).then(res => res.text())
  });

  return <div className="exercise">
    <div className="description">
      <Markdown>

      {data || '...'}
      </Markdown>
    </div>
    {children}
  </div>
}
