# East Coast ⚡ Bike Calendar

A modern, lightweight website for displaying East Coast bicycle events.

## Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

To deploy manually:

1. Build the site:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

## Adding Events

Edit `src/data/events.ts` to add or modify events. Each event follows this format:

```typescript
{
  id: '1',
  title: 'Event Name',
  date: '2024-04-07',
  time: '10:00 AM',
  location: 'Meeting Point',
  description: 'Details...',
  link: 'https://...',
  frequency: 'annual' | 'monthly' | 'weekly',
  recurringPattern?: {
    dayOfWeek: 0-6,  // Sunday-Saturday
    weekOfMonth?: 'first' | 'second' | 'third' | 'fourth' | 'last'
  }
}
```
```

After setting this up:

1. Create a new GitHub repository
2. Push your code to the repository
3. In your repository settings, enable GitHub Pages and set the source to the `gh-pages` branch
4. Your site will be available at `https://[username].github.io/east-coast-bike-calendar`

Remember to:
- Replace `east-coast-bike-calendar` in the config files with your actual repository name
- Update the `basePath` and `assetPrefix` in `next.config.js` to match your repository name
- Make sure your repository is public if you want to use GitHub Pages
- Wait a few minutes after the first deployment for GitHub Pages to become active

The site will now automatically deploy whenever you push changes to the main branch, and it will be accessible through GitHub Pages. 