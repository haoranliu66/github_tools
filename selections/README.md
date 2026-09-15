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

