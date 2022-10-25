import * as React from 'react'
import PropTypes from 'prop-types'

import { useLocation, useNavigate } from 'react-router-dom'
import {
    Chip,
    Box,
    Collapse,
    AppBar,
    Stack,
    ListSubheader,
    Typography,
    Toolbar,
    ListItemText,
    ListItemButton,
    IconButton,
    ListItem,
    List,
    Divider,
    CssBaseline,
    Drawer,
} from '@mui/material'
import {
    StarBorder,
    ExpandMore,
    ExpandLess,
    Menu as MenuIcon,
} from '@mui/icons-material'
// import MenuIcon from '@mui/icons-material/Menu'

import { lists } from '../../public/dummy/dummy'

let dateNew = new Date()
let date1 = dateNew.toLocaleTimeString()

const drawerWidth = 248

const submenu = ['SOUND ON / OFF', `SINGAPORE SGT ${date1}`]

const SubDrawer = () => {
    const [open, setOpen] = React.useState(true)
    const [menu, setMenu] = React.useState('1 HOME')

    const route = useLocation()
    const navigate = useNavigate()

    const handleClick = (key) => {
        setMenu(key)
        open ? setOpen(!open) : setOpen(true)
    }

    return (
        <>
            <Toolbar className="d-flex justify-content-center">
                <Box>
                    <img
                        src={`https://360xp.co/metagallery/wp-content/uploads/2022/10/ISMART-Logo-White-01.png`}
                        style={{ width: 110 }}
                    />
                </Box>
            </Toolbar>

            {/* <Divider /> */}

            <List>
                <ListItem className="belowLogo">
                    SOFTWARE DEVELOPMENT <br />
                    DIGITAL EXPERIENTIAL MARKETING
                </ListItem>
            </List>
            {/* <List>

                {lists?.map(({ key, label, icon: Icon, items, pathname }) => {

                    return (
                        <>

                            <ListItem button key={key} disablePadding onClick={(() => {
                                handleClick(key)
                            })}>

                                <Chip
                                    key={key}
                                    id={`id${key}`}
                                    label={<>{label}</>}
                                    variant="outlined"
                                    className={open && route?.pathname == pathname && menu == key ? "active" : "inActive"}
                                >

                                </Chip>

                            </ListItem>

                            <Collapse in={open && menu == key} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>

                                    {items?.map(
                                        ({
                                            key: childKey,
                                            label: childLabel,
                                            icon: ChildIcon,
                                            pathname: ChildPathname
                                        }) => (
                                            <ListItem
                                                button
                                                key={childKey}
                                                href={ChildPathname}
                                                onClick={(() => {
                                                    navigate(ChildPathname)
                                                })}
                                            >

                                                <ListItemText sx={{ color: 'white', pl: 0 }} inset primary={<>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                    >
                                                        {childLabel}
                                                    </Typography>
                                                </>} />
                                            </ListItem>
                                        )
                                    )}


                                </List>
                            </Collapse>
                        </>

                    )
                }

                )}

            </List> */}

            <List
                sx={{
                    width: '100%',
                    maxWidth: 350,
                    bgcolor: 'transparent',
                    color: 'white',
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItemButton
                    onClick={() => {
                        navigate(`../`)
                    }}
                >
                    <ListItemText primary="HOME" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            onClick={() => {
                                navigate(`../everything`)
                            }}
                            sx={{ pl: 4 }}
                        >
                            <ListItemText primary="INDEX" />
                        </ListItemButton>
                    </List>
                </Collapse>

                <ListItemButton
                    onClick={() => {
                        navigate(`../services`)
                    }}
                >
                    <ListItemText primary="SERVICES" />
                </ListItemButton>

                <ListItemButton
                    onClick={() => {
                        navigate(`../about-us`)
                    }}
                >
                    <ListItemText primary="ABOUT US" />
                </ListItemButton>

                <ListItemButton
                    onClick={() => {
                        navigate(`../contact-us`)
                    }}
                >
                    <ListItemText primary="CONTACT US" />
                </ListItemButton>

                <ListItemButton
                // href={`/ services`}
                >
                    <ListItemText primary="SOUND ON / OFF" />
                </ListItemButton>

                <ListItemButton>
                    <ListItemText primary={`SINGAPORE SGT ${date1}`} />
                </ListItemButton>
            </List>

            <Divider />

            {/* <List
            >
                {submenu?.map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemText sx={{ color: 'white', pl: 0 }} inset primary={<>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                >
                                    {text}
                                </Typography>
                            </>} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List> */}
        </>
    )
}

/**
 * Responsive Drawer function for both Mobile and Desktop
 */
function ResponsiveDrawer(props) {
    const { window } = props
    const [mobileOpen, setMobileOpen] = React.useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const container =
        window !== undefined ? () => window().document.body : undefined

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100 % - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    bgcolor: 'text.primary',
                    display: { xs: 'block', md: 'none', lg: 'none' }, // Hidden on desktop
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        iSmart Support
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            pt: 8,
                        },
                    }}
                >
                    <SubDrawer />
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    <SubDrawer />
                </Drawer>
            </Box>
            {/* <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100 % - ${ drawerWidth }px)` } }}
            >
                <Toolbar />
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                    enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                    imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                    Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                    Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                    nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                    leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                    feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                    consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                    sapien faucibus et molestie ac.
                </Typography>
                <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                    eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                    neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                    tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                    sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                    tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                    gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                    et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                    tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                    eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                    posuere sollicitudin aliquam ultrices sagittis orci a.
                </Typography>
            </Box> */}
        </Box>
    )
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
}

export default ResponsiveDrawer
