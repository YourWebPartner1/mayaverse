Add-Type -AssemblyName System.Drawing

$inputPath = "c:\Users\K\OneDrive\Documents\Work\MayaVerse\assets\logo.png"
$outputPath = "c:\Users\K\OneDrive\Documents\Work\MayaVerse\assets\logo_transparent.png"

if (!(Test-Path $inputPath)) {
    Write-Host "Input logo file not found!"
    exit
}

Write-Host "Loading image..."
$srcBmp = New-Object System.Drawing.Bitmap($inputPath)
$width = $srcBmp.Width
$height = $srcBmp.Height
Write-Host "Image loaded: $width x $height"

# Create a new bitmap with the same dimensions but 32-bit ARGB (transparent)
$dstBmp = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $height; $y++) {
    for ($x = 0; $x -lt $width; $x++) {
        $pixel = $srcBmp.GetPixel($x, $y)
        
        # Calculate brightness or max channel
        # Since it is a white background, the background pixels are very bright
        # Let's check if the pixel is near white.
        # We also want to handle anti-aliasing by adjusting the alpha channel.
        # If R, G, B are all very high, it is background.
        
        $r = $pixel.R
        $g = $pixel.G
        $b = $pixel.B
        
        # Simple threshold for background (very light pixels)
        # If all channels are above 225, make it fully transparent
        if ($r -gt 225 -and $g -gt 225 -and $b -gt 225) {
            $dstBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        }
        # If it is semi-light (anti-aliased edges), blend it!
        # We can calculate an alpha value based on how dark the pixel is compared to white.
        # The darker it is, the more solid it is.
        elseif ($r -gt 180 -and $g -gt 180 -and $b -gt 180) {
            # Estimate alpha based on the darkest channel relative to 255
            # Since white is 255, a lower value means more foreground content.
            # We also scale the color to maintain its original hue but blacken the white component
            $minVal = [Math]::Min($r, [Math]::Min($g, $b))
            $alpha = [int](255 * (255 - $minVal) / (255 - 180))
            if ($alpha -gt 255) { $alpha = 255 }
            if ($alpha -lt 0) { $alpha = 0 }
            
            # Since the website background is black, we can blend the pixel color
            # to prevent it from looking like a white fringe on black.
            # Convert the white-blend back to original color
            $newR = [int]($r * $alpha / 255)
            $newG = [int]($g * $alpha / 255)
            $newB = [int]($b * $alpha / 255)
            
            $dstBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $newR, $newG, $newB))
        }
        else {
            # Solid foreground pixel, keep it as is
            $dstBmp.SetPixel($x, $y, $pixel)
        }
    }
}

Write-Host "Saving transparent PNG..."
$dstBmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$srcBmp.Dispose()
$dstBmp.Dispose()
Write-Host "Success! Saved to $outputPath"
