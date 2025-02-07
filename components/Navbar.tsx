'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiHome, BiMapAlt, BiUser } from 'react-icons/bi';
import styled from 'styled-components';

const NavbarBox = styled.nav`
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
  background-color: var(--white);
  z-index: 9998;
`;

const NavbarList = styled.ul`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const NavbarItem = styled.li`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavbarLink = styled(Link)<{ $isActive: boolean }>`
  width: fit-content;
  font-size: 2.5rem;
  cursor: pointer;
  color: ${(props) => (props.$isActive ? `var(--main)` : `var(--sub)`)};
`;

type NavItems = {
  name: string;
  icon: React.ReactElement;
  path: string;
};

const Navbar = () => {
  const pathname = usePathname();
  const navItems: NavItems[] = [
    { name: 'Home', icon: <BiHome />, path: '/user/gifts' },
    { name: 'Map', icon: <BiMapAlt />, path: '/user/shop' },
    { name: 'MyInfo', icon: <BiUser />, path: '/user' },
  ];

  return (
    <NavbarBox>
      <NavbarList>
        {navItems.map((item) => {
          const isActive: boolean = pathname === item.path;

          return (
            <NavbarItem key={item.name}>
              <NavbarLink $isActive={isActive} href={item.path}>
                {item.icon}
              </NavbarLink>
            </NavbarItem>
          );
        })}
      </NavbarList>
    </NavbarBox>
  );
};

export default Navbar;
