@echo off
setlocal

where powershell.exe >nul 2>nul
if errorlevel 1 (
  echo DJAI Code installer: Windows PowerShell is required. 1>&2
  exit /b 1
)

set "DJAI_PS_URL=https://djai.academy/djaicode/install.ps1"
if defined DJAI_INSTALL_BASE_URL set "DJAI_PS_URL=%DJAI_INSTALL_BASE_URL%/install.ps1"
set "DJAI_PS_FILE=%TEMP%\djai-code-install-%RANDOM%-%RANDOM%.ps1"

powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -Command "Invoke-WebRequest -UseBasicParsing -Uri '%DJAI_PS_URL%' -OutFile '%DJAI_PS_FILE%'"
if errorlevel 1 exit /b %errorlevel%

powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%DJAI_PS_FILE%"
set "DJAI_EXIT=%errorlevel%"
del /q "%DJAI_PS_FILE%" >nul 2>nul
exit /b %DJAI_EXIT%
