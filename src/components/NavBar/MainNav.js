'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react';
import { Menu, message } from 'antd';
import LoginForm from '../Forms/loginForm';
import PostForm from '../Forms/postForm';
import RegistrationForm from '../Forms/registrationForm';
import { useAuth } from '@/app/auth-context';
import menuItems from './menuItems';


const MainNav = () => {
  const [current, setCurrent] = useState('home');
  const { AuthState, login, logout } = useAuth();
  const [isLoginFormOpen, setLoginFormOpen] = useState(false);
  const [isRegistrationFormOpen, setRegistrationFormOpen] = useState(false);
  const [isPostFormOpen, setPostFormOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const onClick = (e) => {
    console.log('key is', e);
    if (!AuthState.isLoggedIn) {
      if (['addpost', 'mypost', 'bookmarks'].includes(e.key)) {
        messageApi.info('Please Login');
        return;
      }
    }
    setCurrent(e.key);
    if (e.keyPath.includes('genre')) {
      if (e.keyPath.includes('movie')) {
        router.push(`/category/movies/${e.key}`);
        return;
      }
      router.push(`/category/animes/${e.key}`);
      return;
    }
    switch (e.key) {
      case 'user':
        setLoginFormOpen(true);
        break;
      case 'logout':
        logout();
        break;
      case 'home':
        router.push('/');
        break;
      case 'mostlikes':
        router.push('/most-likes');
        break;
      case 'addpost':
        setPostFormOpen(true);
        break;
      case 'mypost':
        router.push('/myposts');
        break;
      case 'bookmarks':
        router.push('/bookmarks');
        break;
      default:
        break;
    }
  };
  return (
    <>
      {contextHolder}
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" style={{ marginBottom: '20px', border: '1px solid #e8e8e8' }} items={menuItems(AuthState)} />
      {!AuthState.isLoggedIn && <LoginForm isLoginFormOpen={isLoginFormOpen} setLoginFormOpen={setLoginFormOpen} setRegistrationFormOpen={setRegistrationFormOpen} />}
      {!AuthState.isLoggedIn && <RegistrationForm isRegistrationFormOpen={isRegistrationFormOpen} setRegistrationFormOpen={setRegistrationFormOpen} />}
      {AuthState.isLoggedIn && <PostForm isPostFormOpen={isPostFormOpen} setPostFormOpen={setPostFormOpen} />}
    </>
  );
};

export default MainNav;
