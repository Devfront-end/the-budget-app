#!/bin/bash

# File path to the React component that needs updating
COMPONENT_FILE="path/to/BudgetApp.tsx"

# Step 1: Replace "Budget Owl" with the emoji version "💰 Budget Owl"
sed -i '' 's/Budget Owl/<span className="text-2xl shaking-money-bag">💰<\/span> Budget Owl/g' $COMPONENT_FILE

# Step 2: Replace any dollar sign '$' with euro symbol '€'
sed -i '' 's/\$/€/g' $COMPONENT_FILE

# Step 3: Append the CSS animation class for the shaking effect in your CSS file
CSS_FILE="path/to/your/styles.css"

# Check if the CSS file already contains the shake animation to avoid duplicates
if ! grep -q "@keyframes shake" "$CSS_FILE"; then
    echo "Adding CSS animation for shaking effect"
    cat <<EOT >> $CSS_FILE

/* Animation for the shaking money bag emoji */
@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}

.shaking-money-bag {
  display: inline-block;
  animation: shake 0.5s;
  animation-iteration-count: infinite;
}
EOT
else
    echo "CSS animation already exists, skipping CSS update"
fi

echo "Update complete. Please check your files for changes."
