# Personal Portfolio

A responsive English portfolio website for Sameh Bamrhool. It includes a profile portrait, independent technical experience, education, languages, selected GitHub projects, technical expertise, LinkedIn, and contact details.

## Preview

Open `index.html` directly, or run a local server:

```powershell
python -m http.server 8080
```

Then visit `http://127.0.0.1:8080`.

## Updating personal information

- Main copy and contact links: `index.html`
- Visual design: `styles.css` and `profile.css`
- GitHub username and live metadata: `script.js`
- Profile image: currently loaded from the GitHub avatar URL in `index.html`

The project section has reliable saved content and also refreshes the public repository count through the GitHub API.
