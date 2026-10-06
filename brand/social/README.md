# Selfbyt social media kit

Ready-to-upload PNG files and editable SVG sources. Built from the website’s open-circle / filled-circle mark.

## Start here

Use profile-cobalt-400.png as the default avatar and cover-x.png or cover-linkedin-company.png for the corresponding platform. Paper and ink avatars are alternate treatments. Avatars have no rounded corners; the platform supplies its crop. Both circles fit inside a circular crop.

## Files

| File | Size | Use |
| --- | --- | --- |
| profile-paper.png / .svg | 1024 × 1024 | Profile avatar |
| profile-cobalt.png / .svg | 1024 × 1024 | Profile avatar |
| profile-ink.png / .svg | 1024 × 1024 | Profile avatar |
| logo-transparent-cobalt.png / .svg | 1024 × 1024 | Transparent logo; use against a contrasting background |
| logo-transparent-white.png / .svg | 1024 × 1024 | Transparent logo; use against a contrasting background |
| cover-x.png / .svg | 1500 × 500 | Platform cover |
| cover-linkedin-company.png / .svg | 1512 × 256 | Platform cover |
| post-brand.png / .svg | 1080 × 1080 | Ready to share brand graphic |
| post-research-template.png / .svg | 1080 × 1080 | Editable template; replace sample copy before posting |
| post-update-template.png / .svg | 1080 × 1080 | Editable template; replace sample copy before posting |
| post-landscape.png / .svg | 1200 × 630 | Ready to share brand graphic |
| story-template.png / .svg | 1080 × 1920 | Editable template; replace sample copy before posting |

Each profile also has a 400 × 400 PNG. Templates contain sample text, not product announcements. Edit the text elements in the SVG using a vector editor, or update scripts/generate-social-assets.mjs and run npm run assets:social. SVG text uses Arial/Helvetica for portability; inspect line lengths after editing.

## Brand

Cobalt #365CF5 · Paper #F4F2EC · Ink #131820 · Slate #555F6B. Open circle on the left, filled circle on the right. Preserve equal outer diameters and spacing. Use clear language about AI infrastructure, research, and future models. Do not imply an unannounced model or product has shipped. Avoid em dashes in titles and subtitles.

## Cropping

X cover leaves the lower-left area free for the profile photo. LinkedIn company cover keeps text toward the center; platform layouts may crop on different screens. Story template keeps the main content away from the top and bottom interface. Check the upload preview before saving.

Dimensions checked October 2026: [X profile and cover](https://help.x.com/en/managing-your-account/how-to-customize-your-profile), [LinkedIn Page image specifications](https://www.linkedin.com/help/linkedin/answer/a570368). LinkedIn currently recommends 1512 × 256 for company covers and 400 × 400 for logos. Other sizes are general-purpose creative canvases.
