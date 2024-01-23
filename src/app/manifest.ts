import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        "name": "Relfor Licensing Dashboard",
        "short_name": "Relfor Dashboard",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#fea1c2",
        "theme_color": "#fea1c2",
        "orientation": "portrait",
        "description": "ReIgnite your business",
        "icons": [
            {
                "src": "android-chrome-192x192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "android-chrome-512x512.png",
                "sizes": "512x512",
                "type": "image/png"
            }
        ]
    }
}
