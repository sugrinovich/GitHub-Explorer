const LANGUAGE_COLORS: Record<string, string> = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
    "C#": "#178600",
    PHP: "#4F5D95",
    Ruby: "#701516",
    Go: "#00ADD8",
    Rust: "#dea584",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
    Dart: "#00B4AB",
    HTML: "#e34c26",
    CSS: "#563d7c",
    SCSS: "#c6538c",
    Shell: "#89e051",
    PowerShell: "#012456",
    Vue: "#41b883",
    Scala: "#c22d40",
    Haskell: "#5e5086",
    Lua: "#000080",
    R: "#198CE7",
    Perl: "#0298c3",
    "Objective-C": "#438eff",
    MATLAB: "#e16737",
    Elixir: "#6e4a7e",
    Erlang: "#B83998",
    Clojure: "#db5855",
    Julia: "#a270ba",
    Assembly: "#6E4C13",
    Dockerfile: "#384d54",
    "Jupyter Notebook": "#DA5B0B",
    TeX: "#3D6117",
    Groovy: "#4298b8",
    CoffeeScript: "#244776",
    "F#": "#b845fc",
    OCaml: "#3be133",
    Zig: "#ec915c",
    Solidity: "#AA6746",

    "Developer tools": "#8250df",
    "Ai agents": "#56da09",
    "React": "#da093d"
};

const DEFAULT_LANGUAGE_COLOR = "#8b949e";

export function getLanguageColor(language: string | null): string {
    if (!language) return DEFAULT_LANGUAGE_COLOR;
    return LANGUAGE_COLORS[language] ?? DEFAULT_LANGUAGE_COLOR;
}