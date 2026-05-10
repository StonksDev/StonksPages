import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
    return {
        // TODO enable before production
        rules: {
            userAgent: '*',
            disallow: '/',
        },
        sitemap: 'https://stonkscoin.org/sitemap.xml',
    }
}
