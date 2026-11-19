#!/usr/bin/env bash
# `npm test` entry point. Humans and CI get the plain `vitest run` output. Under a coding agent (CLAUDECODE,
# AI_AGENT, Codex) the full output goes to .test-logs/ and the console shows only the failing tests (their
# console output, error, stack) and the totals, then the exit code and the log path.
set -uo pipefail
is_agent() { case "${AI_AGENT:-}" in 0|false|no|off) return 1;; "") ;; *) return 0;; esac
  [ -n "${CLAUDECODE:-}${CODEX_THREAD_ID:-}${CODEX_SANDBOX:-}${GEMINI_CLI:-}${CURSOR_AGENT:-}${OPENCODE:-}" ]; }
is_agent || exec vitest run "$@"

export NO_COLOR=1 FORCE_COLOR=0
mkdir -p .test-logs; log=".test-logs/vitest-$(date +%Y%m%d-%H%M%S)-$$.log"
vitest run "$@" >"$log" 2>&1; rc=$?
# Pass 1: names of the failing tests, where the failure report starts, where the totals start.
# Pass 2: the console output of each failing test (12 lines each), then the failure report and totals.
awk '
NR == FNR {
  if (!start && $0 ~ /⎯ (Failed Suites|Failed Tests|Unhandled Error)/) start = FNR
  if ($0 ~ /^ FAIL  /) { id = $0; sub(/^ FAIL  /, "", id); failed[id] = 1 }
  if (!totals && $0 ~ /^ +Test Files /) totals = FNR
  last = FNR; next
}
{ gsub(/\033\[[0-9;]*m/, "") }
FNR == 1 { from = start ? start : (totals ? totals : last - 60) }
FNR >= from { print; next }
inblk {
  if ($0 == "") { if (n > 12) print "    ... (" n - 12 " more lines in the log)"; print ""; inblk = 0 }
  else if (++n <= 12) print
  next
}
/^(stdout|stderr) \| / { id = $0; sub(/^(stdout|stderr) \| /, "", id); if (id in failed) { print; inblk = 1; n = 0 } }
' "$log" "$log"
echo "exit=$rc full log: $log"
exit "$rc"
