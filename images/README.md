# Product Images Guide

## Folder Structure
The gallery is organized into separate folders for each product category:

```
images/gallery/
├── domestic-ro/          # Domestic RO Systems
├── commercial-ro/         # Commercial RO Systems
├── industrial-ro/         # Industrial RO Plants
├── water-softeners/       # Water Softener Systems
└── water-plants/          # Water Treatment Plants
```

## How to Upload Images

### Option 1: Using GitHub Web Interface (Recommended)
1. Go to your repository: https://github.com/naveenroyal4b3/s7-aqua
2. Navigate to the appropriate folder:
   - For Domestic RO: `images/gallery/domestic-ro/`
   - For Commercial RO: `images/gallery/commercial-ro/`
   - For Industrial RO: `images/gallery/industrial-ro/`
   - For Water Softeners: `images/gallery/water-softeners/`
   - For Water Plants: `images/gallery/water-plants/`
3. Click "Add file" → "Upload files"
4. Drag and drop your product images (any filenames are fine)
5. Click "Commit changes"

### Option 2: Using Your Computer
1. Navigate to the project folder: `/Users/naveenkumar.yaram/Downloads/S7 Aqua`
2. Copy your images to the appropriate subfolder:
   - `images/gallery/domestic-ro/` - for domestic RO systems
   - `images/gallery/commercial-ro/` - for commercial RO systems
   - `images/gallery/industrial-ro/` - for industrial RO plants
   - `images/gallery/water-softeners/` - for water softeners
   - `images/gallery/water-plants/` - for water treatment plants
3. Then run these commands:
   ```bash
   cd "/Users/naveenkumar.yaram/Downloads/S7 Aqua"
   git add images/gallery/
   git commit -m "Add product images"
   git push
   ```

## Image Requirements
- **Format**: JPG, PNG, WebP, or AVIF
- **Recommended Size**: 800x600 pixels (4:3 aspect ratio) or 1200x900 pixels
- **File Size**: Under 500KB per image for fast loading
- **Quality**: High resolution, clear product photos

## Image Naming
- You can use **any filenames** you want
- No need to match specific names
- Just upload to the correct folder
- We'll update the website code to use your exact filenames

## After Uploading
Once you've uploaded images to a category folder:
1. Let us know which category you uploaded
2. We'll update the website to display all images from that folder
3. Refresh your browser to see the new images

## Current Status
- ✅ **Domestic RO**: Images organized in `domestic-ro/` folder
- ⏳ **Commercial RO**: Ready for uploads in `commercial-ro/` folder
- ⏳ **Industrial RO**: Ready for uploads in `industrial-ro/` folder
- ⏳ **Water Softeners**: Ready for uploads in `water-softeners/` folder
- ⏳ **Water Plants**: Ready for uploads in `water-plants/` folder

## Need Help?
If you have questions or need assistance, just let us know!
