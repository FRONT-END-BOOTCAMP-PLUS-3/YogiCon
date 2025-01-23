'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiHome, BiMapAlt, BiUser } from 'react-icons/bi';
import styled from 'styled-components';

const NavbarBox = styled.div`
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0px;
  width: 100%;
  max-width: 768px;
  left: 50%;
  transform: translateX(-50%);
  height: 5.313rem;
  border-top: 1px solid var(--disabled);
`;

const NavbarItem = styled(Link)<NavbarItemProps>`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  cursor: pointer;
  color: ${(props) => (props.$isActive ? `var(--main)` : `var(--sub)`)};
`;

type NavItems = {
  name: string;
  icon: React.ReactElement;
  path: string;
};

type NavbarItemProps = {
  $isActive: boolean;
};

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const navItems: NavItems[] = [
    { name: 'Home', icon: <BiHome />, path: '/' },
    { name: 'Map', icon: <BiMapAlt />, path: '/map' },
    { name: 'MyInfo', icon: <BiUser />, path: '/mypage' },
  ];

  return (
    <NavbarBox>
      {navItems.map((item) => {
        const isActive: boolean =
          item.path === '/' ? pathname === '/' : pathname.startsWith(item.path);

        return (
          <NavbarItem key={item.name} $isActive={isActive} href={item.path}>
            {item.icon}
          </NavbarItem>
        );
      })}
    </NavbarBox>
  );
};

export default Navbar;
