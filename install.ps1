Write-Host "Installing dependencies..." -ForegroundColor Green

# Remove old dependencies
Write-Host "Removing old dependencies..." -ForegroundColor Yellow
npm uninstall react-beautiful-dnd

# Install new dependencies
Write-Host "Installing @dnd-kit dependencies..." -ForegroundColor Yellow
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# Clean cache
Write-Host "Cleaning npm cache..." -ForegroundColor Yellow
npm cache clean --force

Write-Host "Dependencies installed successfully!" -ForegroundColor Green
Write-Host "You can now run: npm run dev" -ForegroundColor Cyan

Read-Host "Press Enter to continue"



