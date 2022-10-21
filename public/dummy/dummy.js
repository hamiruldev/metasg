import { StarBorder, Drafts, Send, MoveToInbox } from '@mui/icons-material'

// import MoveToInboxIcon from '@mui/icons-material/MoveToInbox'

// DRAWER.JS

const menu = [
    '1 HOME',
    '1.1 INDEX',
    '2 SERVICES',
    '2.1 SOFTWARE DEVELOPMENT',
    '2.2 ECOMMERCE',
    '2.3 WEBSITE DESIGN',
    '2.4 WEB GAME',
    '2.5 VIRTUAL EVENT',
    '2.6 ONLINE SHOWROOW',
    '2.7 3D VISUALIZATION',
    '2.8 METAVERSE',
    '3 ABOUT',
    '3.1 INTRO',
    '3.2 HOW WE DO THIS',
    '3.3 EXPERTISE AREAS',
    '3.4 OUR TEAMS',
    '3.5 CLIENTS',
    '4 CONTACT',
]

const lists = [
    {
        key: '1 HOME',
        label: '1 HOME',
        icon: MoveToInbox,
        pathname: "/",
        items: [
            {
                key: '1.1 INDEX',
                label: '1.1 INDEX',
                icon: StarBorder,
                pathname: '/',
            },
        ],
    },
    {
        key: '2 SERVICES',
        label: '2 SERVICES',
        icon: Drafts,
        pathname: '/services',
        items: [
            {
                key: '2.1   SOFTWARE DEVELOPMENT',
                label: '2.1   SOFTWARE DEVELOPMENT',
                icon: Send,
                pathname: '/services',
            },
            {
                key: '2.2 ECOMMERCE',
                label: '2.2 ECOMMERCE',
                icon: Send,
                pathname: '/services',
            },
        ],
    },
]

// GAME.JS
const panelObj = [
    {
        name: 'Object002',
        bloom: true,
        textureFlipY: false,
        color: '#ffffff',
        textureRotation: 360,
        videoTexture:
            'https://360xp.co/metagallery/wp-content/uploads/2022/10/ISMART_-PROMO-VIDEO-30s-ISMART-VERSION.mp4',
    },
    {
        name: 'Object004',
        bloom: true,
        textureFlipY: false,
        color: '#ffffff',
        textureRotation: 360,
        videoTexture:
            'https://360xp.co/metagallery/wp-content/uploads/2022/10/ISMART_-PROMO-VIDEO-30s-ISMART-VERSION.mp4',
    },
    {
        name: 'Object003',
        bloom: true,
        textureFlipY: false,
        color: '#ffffff',
        textureRotation: 360,
        videoTexture:
            'https://360xp.co/metagallery/wp-content/uploads/2022/10/ISMART_-PROMO-VIDEO-30s-ISMART-VERSION.mp4',
    },
]

export { panelObj, lists }
