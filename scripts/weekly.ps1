$ErrorActionPreference = 'Stop'
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Push-Location $ProjectRoot
try {
    # Compatibility entrypoint for existing scheduled tasks. The weekly command is idempotent.
    pnpm scout:weekly
}
finally {
    Pop-Location
}
