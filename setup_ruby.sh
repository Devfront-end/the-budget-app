#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Detect the shell and set the appropriate config file
if [[ "$SHELL" == *"zsh"* ]]; then
  SHELL_CONFIG="$HOME/.zshrc"
else
  SHELL_CONFIG="$HOME/.bashrc"
fi

# Check if Homebrew is installed; install if not
if ! command -v brew &> /dev/null; then
  echo "Homebrew not found. Installing Homebrew..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Install rbenv and ruby-build
if ! command -v rbenv &> /dev/null; then
  echo "Installing rbenv and ruby-build..."
  brew install rbenv ruby-build
fi

# Initialize rbenv in the correct shell config file
if ! grep -q 'eval "$(rbenv init -)"' "$SHELL_CONFIG"; then
  echo 'eval "$(rbenv init -)"' >> "$SHELL_CONFIG"
  source "$SHELL_CONFIG"
fi

# Install necessary dependencies
brew install openssl readline zlib libyaml gmp

# Install Ruby using rbenv with the correct configuration options
RUBY_CONFIGURE_OPTS="--with-openssl-dir=$(brew --prefix openssl) --with-readline-dir=$(brew --prefix readline) --with-zlib-dir=$(brew --prefix zlib) --with-libyaml-dir=$(brew --prefix libyaml) --with-gmp-dir=$(brew --prefix gmp)" rbenv install 3.0.0

# Set the global Ruby version
rbenv global 3.0.0

# Rehash rbenv shims
rbenv rehash

# Verify the installation
ruby -v
