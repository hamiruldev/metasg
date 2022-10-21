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
        pathname: '/',
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
            'https://360xp.co/ismartwebsite/wp-content/uploads/2022/10/1.-Singapore-Food-Festival-2022-by-Singapore-Tourism-Board.mp4',
    },
    {
        name: 'Object003',
        bloom: true,
        textureFlipY: true,
        color: '#ffffff',
        textureRotation: 180,
        videoTexture:
            'https://360xp.co/ismartwebsite/wp-content/uploads/2022/10/2.-Virtual-PhD-Open-House-by-Singapore-Management-University.mp4',
    },
    {
        name: 'Object004',
        bloom: true,
        textureFlipY: false,
        color: '#ffffff',
        textureRotation: 360,
        videoTexture:
            'https://360xp.co/ismartwebsite/wp-content/uploads/2022/10/3.-Iloomination-Virtual-Showroom-by-NEA-Clean-Green-Singapore.mp4',
    },
    {
        name: 'Object005',
        bloom: true,
        textureFlipY: true,
        color: '#ffffff',
        textureRotation: 180,
        videoTexture:
            'https://360xp.co/ismartwebsite/wp-content/uploads/2022/10/4.-BYD-Virtual-Car-Showroom-by-ST-Engineering.mp4',
    },
    {
        name: 'Object006',
        bloom: true,
        textureFlipY: false,
        color: '#ffffff',
        textureRotation: 360,
        videoTexture:
            'https://360xp.co/ismartwebsite/wp-content/uploads/2022/10/5.-Curiography-Virtual-Exhibition-by-Singapore-Association-for-Mental-Health.mp4',
    },
    {
        name: 'Object007',
        bloom: true,
        textureFlipY: true,
        color: '#ffffff',
        textureRotation: 180,
        videoTexture:
            'https://360xp.co/ismartwebsite/wp-content/uploads/2022/10/6.-Environmental-Awareness-Campaign-by-Procter-Gamble.mp4',
    },
    {
        name: 'Object008',
        bloom: true,
        textureFlipY: false,
        color: '#ffffff',
        textureRotation: 360,
        videoTexture:
            'https://360xp.co/ismartwebsite/wp-content/uploads/2022/10/7.-StarProperty-Awards-2022-Virtual-Showcase-by-Star-Media-Group.mp4',
    },
    {
        name: 'Object009',
        bloom: true,
        textureFlipY: true,
        color: '#ffffff',
        textureRotation: 180,
        videoTexture:
            'https://360xp.co/ismartwebsite/wp-content/uploads/2022/10/8.-Sabah-Virtual-Travel-Fair-by-Sabah-Tourism-Board.mp4',
    },
    {
        name: 'Object010',
        bloom: true,
        textureFlipY: false,
        color: '#ffffff',
        textureRotation: 360,
        videoTexture:
            'https://360xp.co/ismartwebsite/wp-content/uploads/2022/10/9.-Virtual-Exhibition-International-Conference-by-University-Science-Malaysia.mp4',
    },
    {
        name: 'Object011',
        bloom: true,
        textureFlipY: true,
        color: '#ffffff',
        textureRotation: 180,
        videoTexture:
            'https://360xp.co/ismartwebsite/wp-content/uploads/2022/10/10.-Virtual-Sales-Lobby-by-dr.-MCT®️-by-Kevolve™.mp4',
    },
    {
        name: 'Object012',
        bloom: true,
        textureFlipY: false,
        color: '#ffffff',
        textureRotation: 360,
        videoTexture:
            'https://360xp.co/ismartwebsite/wp-content/uploads/2022/10/11.-Virtual-Stationery-Store-by-Navneet-Education-Limited.mp4',
    },
    {
        name: 'Object013',
        bloom: true,
        textureFlipY: true,
        color: '#ffffff',
        textureRotation: 180,
        videoTexture:
            'https://360xp.co/ismartwebsite/wp-content/uploads/2022/10/12.-Eden-Virtual-World-Edenlogy-Pte-Ltd.mp4',
    },
    {
        name: 'Object014',
        bloom: true,
        textureFlipY: false,
        color: '#ffffff',
        textureRotation: 360,
        videoTexture:
            'https://360xp.co/ismartwebsite/wp-content/uploads/2022/10/13.-Kuala-Lumpur-Virtual-Photography-Festival-by-PCP-Publications.mp4',
    },
    {
        name: 'Object015',
        bloom: true,
        textureFlipY: true,
        color: '#ffffff',
        textureRotation: 180,
        videoTexture:
            'https://360xp.co/ismartwebsite/wp-content/uploads/2022/10/14.-Virtual-Angelica-Show-Unit-e-Launching-by-Johor-Land.mp4',
    },
    {
        name: 'Object016',
        bloom: true,
        textureFlipY: false,
        color: '#ffffff',
        textureRotation: 360,
        videoTexture:
            'https://360xp.co/ismartwebsite/wp-content/uploads/2022/10/15.-Horizon-Square-Virtual-Showcase-by-TopHills-Realty-M-Sdn.-Bhd..mp4',
    },
    {
        name: 'Object017',
        bloom: true,
        textureFlipY: true,
        color: '#ffffff',
        textureRotation: 180,
        videoTexture:
            'https://360xp.co/ismartwebsite/wp-content/uploads/2022/10/17.-Virtual-Bistro-Bar-by-Meme-Bistro-Bar.mp4',
    },
    {
        name: 'Object018',
        bloom: true,
        textureFlipY: false,
        color: '#ffffff',
        textureRotation: 360,
        videoTexture:
            'https://360xp.co/metagallery/wp-content/uploads/2022/10/ISMART_-PROMO-VIDEO-30s-ISMART-VERSION.mp4',
    },
]

// GAME.JS
const panelFrame = [
    {
        name: 'Box2131639805',
        bloom: true,
        color: '#ffffff',
    },
    {
        name: 'Box2131639774',
        bloom: true,
        color: '#ffffff',
    },
    {
        name: 'Box2131639774',
        bloom: true,
        color: '#ffffff',
    },
]

export { panelObj, panelFrame, lists }
