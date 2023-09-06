import './globals.css';
import type { Metadata } from 'next';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { Box } from '@mui/material';

export const metadata: Metadata = {
  title: 'Saving Lil-Helper',
  description: 'A web app to help you save money',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ThemeRegistry>
          <Box
            component='main'
            sx={{
              flexGrow: 1,
              bgcolor: 'background.default',
              // ml: `${DRAWER_WIDTH}px`,
              // mt: ['48px', '56px', '64px'],
              p: 3,
            }}
          >
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
