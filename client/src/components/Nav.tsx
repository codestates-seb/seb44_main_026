import { styled } from 'styled-components';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { menuAtom } from 'jotai/atom';
import { filterAtom } from 'jotai/atom';
import { isShopAtom } from 'jotai/atom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Nav = () => {
  const navigate = useNavigate();
  const [currentMenu, setCurrentMenu] = useAtom(menuAtom);
  const setFilter = useSetAtom(filterAtom);
  const isShop = useAtomValue(isShopAtom);

  const shopMenuArr = ['상품', '관심상품'];
  const communityMenuArr = ['챌린지', '그린나래지도'];

  const selectMenuHandler = (menu: string) => {
    setCurrentMenu(menu);
    if (menu === '상품') {
      // 상품목록 페이지로 이동
      navigate('/product/all');
      setFilter('all');
    } else if (menu === '관심상품') {
      navigate('/product/like');
    } else if (menu === '챌린지') {
      // 커뮤니티-챌린지 페이지로 이동
      navigate('/challenge');
    } else if (menu === '그린나래지도') {
      // 커뮤니티-지도 페이지로 이동
      navigate('/map');
    }
  };

  let menuList;

  if (isShop) {
    menuList = shopMenuArr.map((menu) => (
      <Menu
        key={menu}
        className={currentMenu === menu ? 'focused' : null}
        onClick={() => selectMenuHandler(menu)}
      >
        {menu}
      </Menu>
    ));
  } else {
    menuList = communityMenuArr.map((menu) => (
      <Menu
        key={menu}
        className={currentMenu === menu ? 'focused' : null}
        onClick={() => selectMenuHandler(menu)}
      >
        {menu}
      </Menu>
    ));
  }
  useEffect(() => {
    //
  }, [currentMenu]);

  return (
    <NavWrapper>
      <MenuWrapper>
        {menuList}
        {/* {isShop
          ? shopMenuArr.map((menu) => {
              return (
                <Menu
                  key={menu}
                  className={currentMenu === menu ? 'focused' : null}
                  onClick={() => selectMenuHandler(menu)}
                >
                  {menu}
                </Menu>
              );
            })
          : communityMenuArr.map((menu) => {
              return (
                <Menu
                  key={menu}
                  className={currentMenu === menu ? 'focused' : null}
                  onClick={() => selectMenuHandler(menu)}
                >
                  {menu}
                </Menu>
              );
            })} */}
      </MenuWrapper>
    </NavWrapper>
  );
};

const NavWrapper = styled.nav`
  top: 0;
  position: sticky;
  z-index: 1;

  background-color: var(--white);
  box-shadow: 0 4px 4px -2px var(--gray);
`;

const MenuWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;

  list-style: none;
  padding: 0 2rem;
`;

const Menu = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 10rem;
  height: 3rem;

  &:hover {
    cursor: pointer;
    font-weight: bold;
  }

  &.focused {
    font-weight: bold;
  }
`;
