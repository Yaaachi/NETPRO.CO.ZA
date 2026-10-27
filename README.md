# NETPRO — all files in the repository root

This version contains no subfolders. The HTML, CSS, JavaScript and all six original images are together in one folder. No build command or installation is required.

## Upload to GitHub Pages

1. Extract the ZIP.
2. Open your GitHub repository and choose **Add file → Upload files**.
3. Select the extracted files together and upload them directly to the repository root. Upload the files themselves, not the ZIP or the folder that your unzip application creates.
4. Commit the upload to `main`.
5. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch → main → /(root) → Save**.
6. Once deployment finishes, open the URL shown in Pages settings. Publication can take up to ten minutes.

If this replaces the earlier package, overwrite the existing `index.html` with the new one. It now loads `./style.css`, `./main.js` and the image filenames directly. Previous copies inside `assets/` are no longer referenced by this version.

## Files at the root

| File | Purpose |
| --- | --- |
| `index.html` | Main website |
| `style.css` | Complete styling |
| `main.js` | Menus, animations, project brief and enquiry form |
| `netpro-logo.png` | Colour logo |
| `netpro-logo-white.png` | White logo |
| `ndumiso-mdamba.jpg` | Managing director portrait |
| `favicon.png` | Browser icon |
| `apple-touch-icon.png` | Mobile home-screen icon |
| `og-image.jpg` | Social sharing image |
| `.nojekyll` | Static publishing marker |
| `CNAME.example` | Optional domain reference |
| `.gitignore`, `.gitattributes` | Repository settings |
| `README.md` | These instructions |

If your file picker hides `.nojekyll`, create it in GitHub using **Add file → Create new file**, enter `.nojekyll` as its exact name and commit it. It can be empty.

## Custom domain

`CNAME.example` contains `ngimzwile.co.za` as an inactive reference. For a new custom-domain setup, enter `ngimzwile.co.za` under **Settings → Pages → Custom domain**, save, and follow GitHub's DNS instructions. If your existing repository already uses that domain, retain its current `CNAME` and domain settings. For a standard GitHub Pages address, leave the Custom domain field empty.

## Contact form and fonts

The enquiry form uses FormSubmit for delivery to `ngimzwilengbiza@gmail.com`. The mailbox owner may need to confirm the activation email after the first submission. GitHub Pages does not send the email itself. If automatic delivery fails, the existing fallback opens the visitor's email app; the visitor must send the email themselves.

The form's return URL follows the current deployment address, including a repository path. With JavaScript disabled, the form uses FormSubmit's own thank-you page. Google Fonts and FormSubmit need an internet connection; the site's CSS, JavaScript and images are all included locally.

## Check after publishing

Refresh the published page. In Developer Tools → Network, `style.css` and `main.js` should return HTTP 200. Check the mobile menu, service accordion and form, then confirm enquiry delivery to the mailbox. Keep the filenames and their letter case unchanged.

Local asset paths, HTML anchors, JavaScript syntax and HTTP responses at both a domain root and a simulated repository path were checked. All six images match the previous package byte-for-byte. Live GitHub deployment, browser rendering and actual email delivery have not been verified.

## Official references

- [GitHub Pages setup](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Publishing source settings](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [FormSubmit](https://formsubmit.co/)
