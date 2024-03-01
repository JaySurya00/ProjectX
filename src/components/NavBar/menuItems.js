import { UserOutlined } from '@ant-design/icons';
const menuItems = (AuthState) => {

    const items = [
        {
            label: 'Home',
            key: 'home',
        },
        {
            label: 'Filter',
            key: 'filter'
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