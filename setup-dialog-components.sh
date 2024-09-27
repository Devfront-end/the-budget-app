#!/bin/bash

# Define the paths
UI_DIALOG_DIR="src/components/ui/dialog"
AUTH_MODAL_FILE="src/components/AuthModal.tsx"

# Create the ui/dialog directory if it doesn't exist
if [ ! -d "$UI_DIALOG_DIR" ]; then
  mkdir -p "$UI_DIALOG_DIR"
  echo "Created directory: $UI_DIALOG_DIR"
fi

# Create Dialog component if it doesn't exist
if [ ! -f "$UI_DIALOG_DIR/Dialog.tsx" ]; then
  cat <<EOL > "$UI_DIALOG_DIR/Dialog.tsx"
import React from 'react';

export const Dialog: React.FC<{ onClose: () => void }> = ({ onClose, children }) => (
  <div className="dialog">
    <div className="dialog-overlay" onClick={onClose}></div>
    <div className="dialog-content">{children}</div>
  </div>
);
EOL
  echo "Created file: $UI_DIALOG_DIR/Dialog.tsx"
fi

# Create DialogContent component if it doesn't exist
if [ ! -f "$UI_DIALOG_DIR/DialogContent.tsx" ]; then
  cat <<EOL > "$UI_DIALOG_DIR/DialogContent.tsx"
import React from 'react';

export const DialogContent: React.FC = ({ children }) => (
  <div className="dialog-content">{children}</div>
);
EOL
  echo "Created file: $UI_DIALOG_DIR/DialogContent.tsx"
fi

# Create DialogHeader component if it doesn't exist
if [ ! -f "$UI_DIALOG_DIR/DialogHeader.tsx" ]; then
  cat <<EOL > "$UI_DIALOG_DIR/DialogHeader.tsx"
import React from 'react';

export const DialogHeader: React.FC = ({ children }) => (
  <div className="dialog-header">{children}</div>
);
EOL
  echo "Created file: $UI_DIALOG_DIR/DialogHeader.tsx"
fi

# Create DialogTitle component if it doesn't exist
if [ ! -f "$UI_DIALOG_DIR/DialogTitle.tsx" ]; then
  cat <<EOL > "$UI_DIALOG_DIR/DialogTitle.tsx"
import React from 'react';

export const DialogTitle: React.FC = ({ children }) => (
  <h2 className="dialog-title">{children}</h2>
);
EOL
  echo "Created file: $UI_DIALOG_DIR/DialogTitle.tsx"
fi

# Update the import path in AuthModal.tsx if necessary
if grep -q 'import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";' "$AUTH_MODAL_FILE"; then
  sed -i '' 's|@/components/ui/dialog|../ui/dialog|' "$AUTH_MODAL_FILE"
  echo "Updated import path in: $AUTH_MODAL_FILE"
fi

echo "Script execution completed."