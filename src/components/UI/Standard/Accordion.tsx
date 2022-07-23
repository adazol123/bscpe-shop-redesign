import React from "react";
import style from "./Button.module.css";
const Accordion = () => {
  return (
    <div className="max-w-sm w-full p-0 py-1">
      <details className="open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-sm p-4 rounded-lg transition-all transform-gpu duration-500">
        <summary className="text-sm leading-6 text-neutral-600 dark:text-white font-semibold select-none transition-all transform-gpu duration-500">
          Why do they call it Ovaltine?
        </summary>
        <div className="mt-3 text-sm leading-6 text-neutral-400 dark:text-slate-400 transition-all transform-gpu duration-500 px-4">
          <p>
            The mug is round. The jar is round. They should call it Roundtine.
          </p>
        </div>
      </details>
    </div>
  );
};

export default Accordion;
