import { UserOutlined } from '@ant-design/icons';
const menuItems = (AuthState) => {

    const items = [
        {
            label: 'Home',
            key: 'home',
        },
        {
            label: 'Genre',
            key: 'genre',
            children: [
                {
                    label: 'Movie',
                    key: 'movie',
                    children: [
                        {
                            label: 'Action',
                            key: 'action'
                        },
                        {
                            label: 'Comedy',
                            key: 'comedy'
                        },
                        {
                            label: 'Adventure',
                            key: 'adventure'
                        },
                        {
                            label: 'Drama',
                            key: 'drama'
                        },
                        {
                            label: 'Fantasy',
                            key: 'fantasy'
                        },
                        {
                            label: 'Horror',
                            key: 'horror'
                        },
                        {
                            label: 'Sci-fi',
                            key: 'scifi'
                        },
                        {
                            label: 'Thriller',
                            key: 'thriller'
                        }
                    ]
                },
                {
                    label: 'Anime',
                    key: 'anime',
                    children: [
                        {
                            label: 'Shonen',
                            key: 'shonen',
                        },
                        {
                            label: 'Kodomomuke',
                            key: 'kodomomuke',
                        },
                        {
                            label: 'Seinen',
                            key: 'seinen'
                        },
                        {
                            label: 'Josei',
                            key: 'josei'
                        }

                    ]
                }
            ]
        },
        {
            label: 'Add Post',
            key: 'addpost',
        },
        {
            label: 'My Post',
            key: 'mypost',
        },
        {
            label: 'My Bookmarks',
            key: 'bookmarks',
        },
        {
            label: AuthState.user ? AuthState.user.name : 'User',
            key: 'user',
            icon: <UserOutlined />,
            children: AuthState.isLoggedIn ? [
                {
                    label: 'Profile',
                    key: 'profile',
                },
                {
                    label: 'Logout',
                    key: 'logout',
                },
            ] : null,
        },
    ];

    return items;
}

export default menuItems;