# Set the directory to scan
$directory = "content/posts"

# Find all .md files in the directory and its subdirectories
Get-ChildItem -Path $directory -Recurse -Filter "*.md" | ForEach-Object {
    # Get the full path of the original .md file
    $file = $_.FullName

    # Define the output file path
    $outputFile = [System.IO.Path]::ChangeExtension($file, ".md.signed")

    # Clearsign the file using Gpg4win's gpg command
    & gpg --output $outputFile --yes --clear-sign $file

    # Check if the signing was successful
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Clearsigned: $file -> $outputFile"
    } else {
        Write-Host "Failed to clearsign: $file"
    }
}