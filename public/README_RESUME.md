# How to Add Your Resume

1. Place your resume PDF file in this `/public` folder
2. Name it `resume.pdf` (or update the path in FooterText.js)
3. The resume will be downloadable from the lower-left corner button

## File Location:

/public/resume.pdf

## Download Name:

When users click the button, the file will download as "Your_Name_Resume.pdf" (customize in FooterText.js)

You can customize the download name by editing:
/src/components/footer/FooterText.js
Line: download="Your_Name_Resume.pdf"
