import { styled } from 'styled-components';
import { useAtom } from 'jotai';
import { menuAtom } from 'jotai/atom';
import { useNavigate } from 'react-router-dom';

export const Nav = () => {
  const navigate = useNavigate();
  // 마켓, 커뮤니티 여부 -> 추후 수정
  const isShop = true;

  const [currentMenu, setCurrentMenu] = useAtom(menuAtom);

  const shopMenuArr = ['NEW', 'BEST', 'SALE'];
  const communityMenuArr = ['챌린지', '그린나래지도'];

  const selectMenuHandler = (menu: string) => {
    setCurrentMenu(menu);
    if (isShop && menu === 'NEW') {
      // 상품목록 페이지로 이동
      navigate('/product');
    } else if (isShop && menu === 'BEST') {
      navigate('/like');
    } else if (!isShop && menu === '챌린지') {
      // 커뮤니티-챌린지 페이지로 이동
      // navigate('/챌린지');
    } else if (!isShop && menu === '그린나래지도') {
      // 커뮤니티-지도 페이지로 이동
      // navigate('/지도');
    }
  };

  return (
    <NavWrapper>
      <MenuWrapper>
        {isShop
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
            })}
      </MenuWrapper>
    </NavWrapper>
  );
};

const NavWrapper = styled.nav`
  top: 0;
  position: sticky;
  z-index: 1;

  background-color: var(--white);
  /* border-bottom: 0.1rem solid var(--gray); */
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
