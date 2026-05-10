import { MetadataRoute } from 'next'
import {
    SITE_NAME,
    SITE_SHORT_NAME,
    DESCRIPTION,
    BACKGROUND_COLOR,
    THEME_COLOR,
} from '@/lib/site-config'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: SITE_NAME,
        short_name: SITE_SHORT_NAME,
        description: DESCRIPTION,
        start_url: '/',
        display: 'standalone',
        background_color: BACKGROUND_COLOR,
        theme_color: THEME_COLOR,
        icons: [
            {
                src: '/images/favicon/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/images/favicon/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
