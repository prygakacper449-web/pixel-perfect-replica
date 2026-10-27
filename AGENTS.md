<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep uploaded book artwork in Lovable Assets and reference its JSON pointers so original supplied covers are preserved without repository binaries.
- GitHub Pages builds are opt-in through GITHUB_PAGES and prerender all public pages into dist/client; the workflow publishes only this static directory to gh-pages because GitHub Pages cannot run the server bundle.
- Use Vite's BASE_URL for router and local public asset paths so repository-subpath hosting works while Lovable hosting remains rooted at /.
