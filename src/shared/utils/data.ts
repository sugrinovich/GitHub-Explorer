const mockGithubResponse = {
  total_count: 10,
  incomplete_results: false,
  items: [
    {
      id: 1001,
      name: "ui",
      full_name: "shadcn-ui/ui",
      description:
        "Beautifully designed components built with Radix UI and Tailwind CSS.",
      language: "TypeScript",
      stargazers_count: 75200,
      forks_count: 5300,
      open_issues_count: 620,
      updated_at: "2026-09-24T12:30:00Z",
      html_url: "https://github.com/shadcn-ui/ui",
      owner: {
        login: "shadcn-ui",
        avatar_url: "https://avatars.githubusercontent.com/u/139895814"
      }
    },
    {
      id: 1002,
      name: "react",
      full_name: "facebook/react",
      description: "The library for web and native user interfaces.",
      language: "JavaScript",
      stargazers_count: 231000,
      forks_count: 47000,
      open_issues_count: 850,
      updated_at: "2026-09-23T09:15:00Z",
      html_url: "https://github.com/facebook/react",
      owner: {
        login: "facebook",
        avatar_url: "https://avatars.githubusercontent.com/u/69631"
      }
    },
    {
      id: 1003,
      name: "next.js",
      full_name: "vercel/next.js",
      description: "The React framework for the web.",
      language: "JavaScript",
      stargazers_count: 132000,
      forks_count: 28500,
      open_issues_count: 1900,
      updated_at: "2026-09-20T18:40:00Z",
      html_url: "https://github.com/vercel/next.js",
      owner: {
        login: "vercel",
        avatar_url: "https://avatars.githubusercontent.com/u/14985020"
      }
    },
    {
      id: 1004,
      name: "tailwindcss",
      full_name: "tailwindlabs/tailwindcss",
      description:
        "A utility-first CSS framework for rapidly building custom designs.",
      language: "TypeScript",
      stargazers_count: 86000,
      forks_count: 4400,
      open_issues_count: 780,
      updated_at: "2026-09-22T15:10:00Z",
      html_url: "https://github.com/tailwindlabs/tailwindcss",
      owner: {
        login: "tailwindlabs",
        avatar_url: "https://avatars.githubusercontent.com/u/67109815"
      }
    },
    {
      id: 1005,
      name: "typescript",
      full_name: "microsoft/TypeScript",
      description:
        "TypeScript is a superset of JavaScript that compiles to clean JavaScript output.",
      language: "TypeScript",
      stargazers_count: 105000,
      forks_count: 13500,
      open_issues_count: 6200,
      updated_at: "2026-09-21T11:45:00Z",
      html_url: "https://github.com/microsoft/TypeScript",
      owner: {
        login: "microsoft",
        avatar_url: "https://avatars.githubusercontent.com/u/6154722"
      }
    },
    {
      id: 1006,
      name: "vite",
      full_name: "vitejs/vite",
      description:
        "Next generation frontend tooling. It's fast, simple, and lean.",
      language: "TypeScript",
      stargazers_count: 72000,
      forks_count: 6500,
      open_issues_count: 430,
      updated_at: "2026-09-19T08:20:00Z",
      html_url: "https://github.com/vitejs/vite",
      owner: {
        login: "vitejs",
        avatar_url: "https://avatars.githubusercontent.com/u/65625646"
      }
    },
    {
      id: 1007,
      name: "zustand",
      full_name: "pmndrs/zustand",
      description:
        "A small, fast, and scalable bearbones state-management solution.",
      language: "TypeScript",
      stargazers_count: 48000,
      forks_count: 2200,
      open_issues_count: 180,
      updated_at: "2026-09-18T17:05:00Z",
      html_url: "https://github.com/pmndrs/zustand",
      owner: {
        login: "pmndrs",
        avatar_url: "https://avatars.githubusercontent.com/u/45790596"
      }
    },
    {
      id: 1008,
      name: "express",
      full_name: "expressjs/express",
      description:
        "Fast, unopinionated, minimalist web framework for Node.js.",
      language: "JavaScript",
      stargazers_count: 67000,
      forks_count: 12500,
      open_issues_count: 320,
      updated_at: "2026-09-17T14:25:00Z",
      html_url: "https://github.com/expressjs/express",
      owner: {
        login: "expressjs",
        avatar_url: "https://avatars.githubusercontent.com/u/5658226"
      }
    },
    {
      id: 1009,
      name: "storybook",
      full_name: "storybookjs/storybook",
      description:
        "Build component-driven UIs faster with isolated development.",
      language: "TypeScript",
      stargazers_count: 85000,
      forks_count: 9200,
      open_issues_count: 760,
      updated_at: "2026-09-16T10:50:00Z",
      html_url: "https://github.com/storybookjs/storybook",
      owner: {
        login: "storybookjs",
        avatar_url: "https://avatars.githubusercontent.com/u/22632080"
      }
    },
    {
      id: 1010,
      name: "awesome-python",
      full_name: "vinta/awesome-python",
      description: null,
      language: null,
      stargazers_count: 245000,
      forks_count: 25500,
      open_issues_count: 95,
      updated_at: "2026-09-15T07:35:00Z",
      html_url: "https://github.com/vinta/awesome-python",
      owner: {
        login: "vinta",
        avatar_url: "https://avatars.githubusercontent.com/u/ uit"
      }
    }
  ]
};

export default mockGithubResponse;