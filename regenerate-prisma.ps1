# Script to regenerate Prisma Client
# Stop the dev server first if running, then run this script

Write-Host "Regenerating Prisma Client..." -ForegroundColor Yellow

npx prisma generate

if ($LASTEXITCODE -eq 0) {
    Write-Host "Prisma Client regenerated successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now start the dev server with: npm run dev" -ForegroundColor Cyan
} else {
    Write-Host "Error regenerating Prisma Client. Make sure the dev server is stopped." -ForegroundColor Red
}

