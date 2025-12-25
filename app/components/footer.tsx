function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="mt-16 text-xs uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-500">
      <ul className="flex flex-wrap gap-4">
        <li>
          <a
            className="flex items-center gap-2 transition hover:text-neutral-900 dark:hover:text-neutral-50"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/acharyaPawan"
          >
            <ArrowIcon />
            github
          </a>
        </li>
      </ul>
    </footer>
  )
}
