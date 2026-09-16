# Weekly human selection

Create a draft from a weekly base report:

```powershell
pnpm scout:select -- --report output/trend-reports/YYYY-MM-DD.json
```

Review the generated `YYYY-Www.json`, keep exactly 7 or 8 unique `owner/name` entries, then change
`status` from `draft` to `approved`. Batch research refuses draft files.

After reviewing the research-backed final ranking, add only the repositories explicitly approved for
video production to `videoProjects`, then regenerate the final ranking. Video rendering refuses every
repository that is not approved in that final ranking.

Every approved video must define its project-root-relative production storyboard path in
`videoStoryboards`. Every mapping key must already be present in `videoProjects`; unapproved projects
cannot prepare or override a production storyboard. After editing the selection, run `pnpm video:prepare`
before regenerating the final ranking.
