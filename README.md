# CodeQL alert-dismissal persistence test

This repo exists solely to test whether a **dismissed** CodeQL code scanning
alert stays dismissed after various configuration changes. It contains a tiny,
intentional `js/code-injection` vulnerability (`app.js`) analyzed by an
advanced-setup CodeQL workflow (`.github/workflows/codeql.yml`).

## Flows under test

1. **Delete config, then recreate the alert**
   - Dismiss the alert
   - Remove `javascript` from the workflow's language matrix (deletes the config)
   - Re-add `javascript` to the matrix, re-run
   - Is the recreated alert dismissed or open?

2. **Delete analysis, then recreate the alert**
   - Dismiss the alert
   - Delete the underlying analysis via the code scanning API
   - Re-run the workflow to produce a new analysis for the same category
   - Is the recreated alert dismissed or open?

3. **Rename the category, then recreate the alert**
   - Dismiss the alert
   - Rename the `category:` value in the advanced-setup workflow YAML
   - Re-run the workflow (new category, same rule/location)
   - Is the new alert dismissed or open?

Results are tracked as the experiment progresses.
