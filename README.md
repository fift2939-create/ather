<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/10NXsxqOPdu4inj22eDwh-DVPm_-5CCvC

## Deployment to GitHub Pages

To deploy this project to GitHub Pages:

1. **Upload your code** to a GitHub repository.
2. **Add Your API Key**:
   - Go to your Repository Settings > Secrets and variables > Actions.
   - Click "New repository secret".
   - Name: `GEMINI_API_KEY`.
   - Value: (Paste your Gemini API key here).
3. **Enable GitHub Pages**:
   - Go to Settings > Pages.
   - Under "Build and deployment", set Source to "GitHub Actions".
4. **Push to Main**: The included GitHub Action will automatically build and deploy your site.

## Previewing and AI Integration
- The application is designed to maintain full AI integration through the `GEMINI_API_KEY` secret.
- Once deployed, you can access the professional preview link provided by GitHub.
