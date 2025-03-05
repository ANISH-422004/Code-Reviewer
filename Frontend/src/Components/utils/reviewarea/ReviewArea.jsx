import React from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";

// Ensure JavaScript language support is imported
import "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";

import "prismjs/themes/prism-solarizedlight.css"; // Theme

const ReviewArea = ({ Review = "", setReview }) => {
  return (
    <div className="col-span-5 p-1 rounded-lg bg-gray-800 bg-opacity-30 backdrop-blur-lg border border-white/20 shadow-xl overflow-hidden">
      <div className="max-h-[670px] overflow-auto custom-scrollbar">
        <Editor
          value={Review}
        //   onValueChange={(newReview) => setReview(newReview)}
          highlight={(newReview) =>
            Prism.languages.javascript
              ? Prism.highlight(newReview, Prism.languages.javascript, "javascript")
              : newReview // Fallback if Prism fails
          }
          padding={10}
          className="w-full h-full font-mono text-white bg-transparent outline-none"
        />
      </div>
    </div>
  );
};

export default ReviewArea;
