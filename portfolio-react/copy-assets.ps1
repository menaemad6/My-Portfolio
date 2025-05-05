# Create public directories
New-Item -ItemType Directory -Force -Path "public/assets/img"
New-Item -ItemType Directory -Force -Path "public/assets/css"
New-Item -ItemType Directory -Force -Path "public/assets/js"
New-Item -ItemType Directory -Force -Path "public/assets/js/vendor"

# Copy image files
Copy-Item -Path "../assets/img/*" -Destination "public/assets/img/" -Recurse -Force

# Copy CSS files
Copy-Item -Path "../assets/css/main.css" -Destination "public/assets/css/" -Force

# Copy JavaScript files
Copy-Item -Path "../assets/js/functions-min.js" -Destination "public/assets/js/" -Force

# Make sure vendor directory exists in source
if (Test-Path "../assets/js/vendor") {
    Copy-Item -Path "../assets/js/vendor/*" -Destination "public/assets/js/vendor/" -Recurse -Force
}

# Copy the favicon
Copy-Item -Path "../assets/img/logo.png" -Destination "public/favicon.ico" -Force

# Create other logo sizes for PWA support
Copy-Item -Path "../assets/img/logo.png" -Destination "public/logo192.png" -Force
Copy-Item -Path "../assets/img/logo.png" -Destination "public/logo512.png" -Force

Write-Host "Assets copied successfully!" -ForegroundColor Green 