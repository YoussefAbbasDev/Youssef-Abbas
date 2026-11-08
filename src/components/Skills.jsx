import React from 'react';

const Skills = () => {
  const skillsList = ['React', 'MySQL', 'Node.js', 'Tailwind CSS'];

  return (
    <ul className="mt-6 flex w-full flex-row flex-wrap justify-center gap-3 lg:justify-start" aria-label="Core technologies">
      {skillsList.map((skill) => (
        <li
          key={skill}
          className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm text-slate-700 shadow-sm dark:border-white/20 dark:bg-white/10 dark:text-white"
        >
          {skill}
        </li>
      ))}
    </ul>
  );
};

export default Skills;
