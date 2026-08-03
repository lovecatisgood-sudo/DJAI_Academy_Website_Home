$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$BaseUrl = if ($env:DJAI_INSTALL_BASE_URL) { $env:DJAI_INSTALL_BASE_URL.TrimEnd('/') } else { 'https://djai.academy/djaicode' }
$PackageUrl = if ($env:DJAI_PACKAGE_URL) { $env:DJAI_PACKAGE_URL } else { "$BaseUrl/releases/latest/djai-code.tgz" }
$ChecksumUrl = if ($env:DJAI_CHECKSUM_URL) { $env:DJAI_CHECKSUM_URL } else { "$PackageUrl.sha256" }
$MinimumNodeMajor = 22

function Stop-Install([string]$Message) {
  throw "DJAI Code installer: $Message"
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Stop-Install "Node.js $MinimumNodeMajor+ is required: https://nodejs.org"
}
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  Stop-Install 'npm is required and normally ships with Node.js.'
}

$NodeMajor = [int](& node -p "Number(process.versions.node.split('.')[0])")
if ($NodeMajor -lt $MinimumNodeMajor) {
  Stop-Install "Node.js $MinimumNodeMajor+ is required; found $(& node --version)."
}

$TempDirectory = Join-Path ([IO.Path]::GetTempPath()) ("djai-code-" + [Guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $TempDirectory | Out-Null
try {
  $Archive = Join-Path $TempDirectory 'djai-code.tgz'
  $ChecksumFile = Join-Path $TempDirectory 'djai-code.tgz.sha256'

  Write-Host 'Downloading DJAI Code...'
  Invoke-WebRequest -UseBasicParsing -Uri $PackageUrl -OutFile $Archive
  Invoke-WebRequest -UseBasicParsing -Uri $ChecksumUrl -OutFile $ChecksumFile

  $Expected = ((Get-Content -Raw $ChecksumFile).Trim() -split '\s+')[0].ToLowerInvariant()
  $Actual = (Get-FileHash -Algorithm SHA256 -Path $Archive).Hash.ToLowerInvariant()
  if (-not $Expected -or $Actual -ne $Expected) {
    Stop-Install 'Checksum verification failed.'
  }

  Write-Host 'Installing DJAI Code...'
  if ($env:DJAI_NPM_PREFIX) {
    & npm install --global --prefix $env:DJAI_NPM_PREFIX $Archive
  } else {
    & npm install --global $Archive
  }
  if ($LASTEXITCODE -ne 0) {
    Stop-Install "npm exited with status $LASTEXITCODE."
  }

  $Djai = Get-Command djai -ErrorAction SilentlyContinue
  if (-not $Djai) {
    Stop-Install 'Installation completed, but djai is not on PATH. Open a new terminal and try again.'
  }
  Write-Host "Installed $(& djai --version)"
  Write-Host 'Start DJAI Code with: djai'
}
finally {
  Remove-Item -LiteralPath $TempDirectory -Recurse -Force -ErrorAction SilentlyContinue
}
