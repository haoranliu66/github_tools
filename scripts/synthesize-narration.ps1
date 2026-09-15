param(
  [Parameter(Mandatory=$true)][string]$JobPath,
  [string]$Voice = 'Microsoft Huihui Desktop',
  [int]$Rate = 1
)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Speech
$narrator = New-Object System.Speech.Synthesis.SpeechSynthesizer
try {
  $narrator.SelectVoice($Voice)
  $narrator.Rate = $Rate
  $narrator.Volume = 100
  $audioJobs = Get-Content -LiteralPath $JobPath -Raw -Encoding UTF8 | ConvertFrom-Json
  foreach ($audioJob in $audioJobs) {
    $narrator.SetOutputToWaveFile($audioJob.path)
    $narrator.Speak([string]$audioJob.text)
    $narrator.SetOutputToNull()
  }
  Write-Output "Synthesized $($audioJobs.Count) clips with $Voice."
} finally {
  $narrator.Dispose()
}
