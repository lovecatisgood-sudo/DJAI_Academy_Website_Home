#!/bin/sh
set -eu

BASE_URL="${DJAI_INSTALL_BASE_URL:-https://djai.academy/djaicode}"
PACKAGE_URL="${DJAI_PACKAGE_URL:-${BASE_URL}/releases/latest/djai-code.tgz}"
CHECKSUM_URL="${DJAI_CHECKSUM_URL:-${PACKAGE_URL}.sha256}"
MIN_NODE_MAJOR=22

say() { printf '%s\n' "$*"; }
fail() { printf 'DJAI Code installer: %s\n' "$*" >&2; exit 1; }

command -v curl >/dev/null 2>&1 || fail "curl is required."
command -v node >/dev/null 2>&1 || fail "Node.js ${MIN_NODE_MAJOR}+ is required: https://nodejs.org"
command -v npm >/dev/null 2>&1 || fail "npm is required and normally ships with Node.js."

node_major="$(node -p "Number(process.versions.node.split('.')[0])")"
case "$node_major" in
  ''|*[!0-9]*) fail "Could not determine the installed Node.js version." ;;
esac
[ "$node_major" -ge "$MIN_NODE_MAJOR" ] || fail "Node.js ${MIN_NODE_MAJOR}+ is required; found $(node --version)."

tmp_dir="$(mktemp -d 2>/dev/null || mktemp -d -t djai-code)"
trap 'rm -rf "$tmp_dir"' EXIT HUP INT TERM
archive="$tmp_dir/djai-code.tgz"
checksum_file="$tmp_dir/djai-code.tgz.sha256"

say "Downloading DJAI Code..."
curl -fsSL "$PACKAGE_URL" -o "$archive"
curl -fsSL "$CHECKSUM_URL" -o "$checksum_file"

expected="$(awk '{print $1}' "$checksum_file")"
[ -n "$expected" ] || fail "The release checksum is empty."
if command -v sha256sum >/dev/null 2>&1; then
  actual="$(sha256sum "$archive" | awk '{print $1}')"
elif command -v shasum >/dev/null 2>&1; then
  actual="$(shasum -a 256 "$archive" | awk '{print $1}')"
else
  fail "A SHA-256 utility (sha256sum or shasum) is required."
fi
[ "$actual" = "$expected" ] || fail "Checksum verification failed."

if [ -n "${DJAI_NPM_PREFIX:-}" ]; then
  install_prefix="$DJAI_NPM_PREFIX"
elif global_prefix="$(npm prefix --global 2>/dev/null)" && [ -w "$global_prefix" ]; then
  install_prefix=""
else
  install_prefix="${HOME}/.local"
fi

say "Installing DJAI Code..."
if [ -n "$install_prefix" ]; then
  mkdir -p "$install_prefix"
  npm install --global --prefix "$install_prefix" "$archive"
  bin_dir="$install_prefix/bin"
else
  npm install --global "$archive"
  bin_dir="$(dirname "$(command -v djai 2>/dev/null || printf '/dev/null')")"
fi

if command -v djai >/dev/null 2>&1; then
  installed_command="djai"
elif [ -x "$bin_dir/djai" ]; then
  installed_command="$bin_dir/djai"
else
  fail "Installation completed, but the djai executable was not found."
fi

say "Installed $($installed_command --version)"
if ! command -v djai >/dev/null 2>&1; then
  say "Add this directory to PATH, then open a new terminal:"
  say "  $bin_dir"
fi
say "Start DJAI Code with: djai"
