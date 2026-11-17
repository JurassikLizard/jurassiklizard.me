param(
    [string] $Passphrase
)

if ([string]::IsNullOrWhiteSpace($Passphrase)) {
    $securePassphrase = Read-Host "Enter the GPG passphrase" -AsSecureString
    $passphrasePointer = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassphrase)
    $Passphrase = [System.Runtime.InteropServices.Marshal]::PtrToStringBSTR($passphrasePointer)
    [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($passphrasePointer)
}

if ([string]::IsNullOrWhiteSpace($Passphrase)) {
    Write-Error "A GPG passphrase is required."
    exit 1
}

$directory = "content/posts"

# Find all .md files in the directory and its subdirectories
Get-ChildItem -Path $directory -Recurse -Filter "*.md" | ForEach-Object {
    # Get the full path of the original .md file
    $file = $_.FullName

    # Define the output file path
    $outputFile = [System.IO.Path]::ChangeExtension($file, ".md.signed")

    # Clearsign the file using Gpg4win's gpg command
    $Passphrase | & gpg --batch --pinentry-mode loopback --passphrase-fd 0 --output $outputFile --yes --clear-sign $file

    # Check if the signing was successful
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Clearsigned: $file -> $outputFile"
    } else {
        Write-Host "Failed to clearsign: $file"
    }
}
