# Issue tracker: GitHub

Issues and specs live in this repository's GitHub Issues. Use the
`gh` CLI; infer the repository from the Git remote.

## Operations

- Publish a spec or ticket by creating a GitHub issue.
- Read the relevant ticket with `gh issue view <number> --comments`.
- Search existing issues before creating a potentially duplicate ticket.
- Use `gh issue edit` to update bodies, labels, and assignees.
- Use `gh issue comment` for discussion and `gh issue close` for resolution.
- Resolve triage labels through `docs/agents/triage-labels.md`.

For long issue bodies, write a temporary Markdown file and pass it
through `--body-file`.

## Pull requests as a triage surface

PRs as a request surface: no.
