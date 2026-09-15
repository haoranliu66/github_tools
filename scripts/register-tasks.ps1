param(
    [string]$DailyAt = '09:00',
    [string]$WeeklyAt = '10:00',
    [ValidateSet('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')]
    [string]$WeeklyDay = 'Monday'
)

$ErrorActionPreference = 'Stop'
$ProjectRoot = Split-Path -Parent $PSScriptRoot
$DailyScript = Join-Path $ProjectRoot 'scripts\daily.ps1'
$WeeklyScript = Join-Path $ProjectRoot 'scripts\weekly.ps1'
$PowerShellPath = (Get-Command powershell.exe -ErrorAction Stop).Source

$DailyAction = New-ScheduledTaskAction `
    -Execute $PowerShellPath `
    -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$DailyScript`""
$WeeklyAction = New-ScheduledTaskAction `
    -Execute $PowerShellPath `
    -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$WeeklyScript`""

$DailyTrigger = New-ScheduledTaskTrigger -Daily -At $DailyAt
$WeeklyTrigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek $WeeklyDay -At $WeeklyAt

Register-ScheduledTask `
    -TaskName 'zimeiti-trend-scout-daily' `
    -Description 'Retry the idempotent weekly zimeiti collection; successful weeks make no network request.' `
    -Action $DailyAction `
    -Trigger $DailyTrigger `
    -Force | Out-Null

Register-ScheduledTask `
    -TaskName 'zimeiti-trend-scout-weekly' `
    -Description 'Compatibility retry for the idempotent weekly zimeiti collection and ranking.' `
    -Action $WeeklyAction `
    -Trigger $WeeklyTrigger `
    -Force | Out-Null

Write-Host "Registered daily retry at $DailyAt and weekly fallback on $WeeklyDay at $WeeklyAt. A successful week will not reconnect to GitHub."
