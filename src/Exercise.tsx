import React from "react";
import { useQuery } from "react-query";
import Markdown from "react-markdown";
import { Link } from "react-router-dom";

export const Exercise: React.FC<{
  markdown: string;
  backLink?: React.ReactElement | null;
}> = ({ children, markdown, backLink = <Link to="/">← Home</Link> }) => {
  const { data } = useQuery(markdown, () => {
    return fetch(markdown).then((res) => res.text());
  });

  return (
    <div className="exercise">
      <div className="exerciseDescription">
        {backLink}
        <Markdown>{data || "..."}</Markdown>
      </div>
      {children}
    </div>
  );
};
