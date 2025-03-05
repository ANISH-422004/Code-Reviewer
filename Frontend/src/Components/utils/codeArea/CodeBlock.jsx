import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-solarizedlight.css"; // Theme

const CodeBlock = () => {
  const [code, setCode] = useState("// Start typing your code here...");

  return (
    <div className="col-span-6 p-1 rounded-lg bg-gray-800 bg-opacity-30 backdrop-blur-lg border border-white/20 shadow-xl overflow-hidden">
      <div className="max-h-[670px] overflow-auto custom-scrollbar">
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => Prism.highlight(code, Prism.languages.javascript, "javascript")}
          padding={10}
          className="w-full h-full font-mono text-white bg-transparent outline-none"
        />
      </div>
    </div>
  );
};

export default CodeBlock;
